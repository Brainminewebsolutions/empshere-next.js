<?php
/* ==============================================================================
   Lead form handler for the static (Hostinger web hosting) build — receives
   the JSON POST from components/LeadForm.jsx, verifies the Cloudflare
   Turnstile token and sends two emails through Gmail SMTP with PHPMailer:

     1. the lead (+ UTM tracking) to the team inbox      mail/templates.php
     2. a thank-you to the person who filled in the form

   The Node.js build does the same in app/api/lead/route.js (Nodemailer).

   Deployed with the static export as  public_html/api/lead.php.

   Secrets live OUTSIDE public_html, in a file next to it:

     /home/<user>/domains/<domain>/emsphere-form-config.php

     <?php
     return [
       'smtp_host'        => 'smtp.gmail.com',
       'smtp_port'        => 465,
       'smtp_user'        => 'info@brainminetech.com',
       'smtp_pass'        => 'xxxx xxxx xxxx xxxx',   // Google App Password
       'smtp_from_name'   => 'Emsphere Technologies',
       'lead_to'          => 'teams@brainminetech.com',
       'turnstile_secret' => '0x4AAAA...your-secret-key',
     ];

   Environment variables with the same names in upper case (SMTP_USER,
   LEAD_TO, TURNSTILE_SECRET, …) override the file. Without a Turnstile secret
   the captcha token is not checked.
   ============================================================================== */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailerException;

require __DIR__ . '/mail/PHPMailer/Exception.php';
require __DIR__ . '/mail/PHPMailer/PHPMailer.php';
require __DIR__ . '/mail/PHPMailer/SMTP.php';
require __DIR__ . '/mail/templates.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond($status, $data)
{
    http_response_code($status);
    echo json_encode($data);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

/* ---- Config ----------------------------------------------------------------- */
$config = [];
// Next to public_html: found from this file's own folder (public_html/api)
// first, then from the document root, in case they differ.
$configPaths = array_unique([
    dirname(__DIR__, 2) . '/emsphere-form-config.php',
    dirname($_SERVER['DOCUMENT_ROOT']) . '/emsphere-form-config.php',
]);
foreach ($configPaths as $configFile) {
    if (!is_readable($configFile)) continue;
    $loaded = include $configFile;
    if (is_array($loaded)) $config = $loaded;
    break;
}
$setting = function ($key, $default = '') use ($config) {
    $env = getenv(strtoupper($key));
    if ($env !== false && $env !== '') return $env;
    return isset($config[$key]) && $config[$key] !== '' ? $config[$key] : $default;
};

$smtpUser = $setting('smtp_user');
$smtpPass = preg_replace('/\s+/', '', (string) $setting('smtp_pass'));
$leadTo   = $setting('lead_to', $smtpUser);
$secret   = $setting('turnstile_secret');

if ($smtpUser === '' || $smtpPass === '') respond(500, ['ok' => false, 'error' => 'not_configured']);

/* ---- Same-site requests only ------------------------------------------------ */
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
if ($origin !== '' && strtolower((string) parse_url($origin, PHP_URL_HOST)) !== $host) {
    respond(403, ['ok' => false, 'error' => 'forbidden']);
}

/* ---- Input ------------------------------------------------------------------ */
$raw = file_get_contents('php://input', false, null, 0, 30000);
$input = json_decode($raw ?: '', true);
if (!is_array($input)) respond(400, ['ok' => false, 'error' => 'bad_request']);

// Honeypot: real people never fill it.
if (!empty($input['website'])) respond(200, ['ok' => true]);

$clean = function ($key, $max) use ($input) {
    $value = isset($input[$key]) && is_string($input[$key]) ? trim($input[$key]) : '';
    return function_exists('mb_substr') ? mb_substr($value, 0, $max) : substr($value, 0, $max);
};
$httpOnly = function ($url) { return preg_match('~^https?://~i', $url) ? $url : ''; };

$lead = [
    'name'         => $clean('name', 120),
    'email'        => $clean('email', 160),
    'mobile'       => preg_replace('/\D/', '', $clean('mobile', 20)),
    'company'      => $clean('company', 160),
    'product'      => $clean('product', 120),
    'message'      => $clean('message', 5000),
    'page'         => $httpOnly($clean('page', 500)),
    'submitted_at' => time(),
    'tracking'     => [],
];
// UTM tags, ad click IDs, landing page and referrer (lib/utm.js).
foreach (array_keys(EM_TRACKING_ROWS) as $key) {
    $max = ($key === 'landing_page' || $key === 'referrer') ? 500 : 200;
    $lead['tracking'][$key] = $clean($key, $max);
}
$lead['tracking']['landing_page'] = $httpOnly($lead['tracking']['landing_page']);
$lead['tracking']['referrer'] = $httpOnly($lead['tracking']['referrer']);

$errors = [];
if ($lead['name'] === '') $errors[] = 'name';
if (!filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if (strlen($lead['mobile']) !== 10) $errors[] = 'mobile';
if ($lead['company'] === '') $errors[] = 'company';
if ($lead['message'] === '') $errors[] = 'message';
if ($errors) respond(422, ['ok' => false, 'error' => 'invalid', 'fields' => $errors]);

/* ---- Turnstile -------------------------------------------------------------- */
if ($secret !== '') {
    $token = $clean('cf-turnstile-response', 2048);
    if ($token === '') respond(403, ['ok' => false, 'error' => 'captcha_failed']);

    $verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    $verifyBody = http_build_query([
        'secret'   => $secret,
        'response' => $token,
        'remoteip' => $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '',
    ]);
    if (function_exists('curl_init')) {
        $verify = curl_init($verifyUrl);
        curl_setopt_array($verify, [
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $verifyBody,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 10,
        ]);
        $response = curl_exec($verify);
        curl_close($verify);
    } else {
        $response = @file_get_contents($verifyUrl, false, stream_context_create(['http' => [
            'method'  => 'POST',
            'header'  => 'Content-Type: application/x-www-form-urlencoded',
            'content' => $verifyBody,
            'timeout' => 10,
        ]]));
    }
    $result = json_decode($response ?: '', true);
    if (empty($result['success'])) respond(403, ['ok' => false, 'error' => 'captcha_failed']);
}

/* ---- Email ------------------------------------------------------------------ */
$send = function ($toAddress, $toName, $replyAddress, $replyName, array $mail) use ($setting, $smtpUser, $smtpPass) {
    $mailer = new PHPMailer(true);
    $port = (int) $setting('smtp_port', 465);
    $mailer->isSMTP();
    $mailer->Host       = $setting('smtp_host', 'smtp.gmail.com');
    $mailer->Port       = $port;
    $mailer->SMTPAuth   = true;
    $mailer->SMTPSecure = $port === 465 ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mailer->Username   = $smtpUser;
    $mailer->Password   = $smtpPass;
    $mailer->Timeout    = 20;
    $mailer->CharSet    = PHPMailer::CHARSET_UTF8;

    $mailer->setFrom($smtpUser, $setting('smtp_from_name', 'Emsphere Technologies'));
    $mailer->addAddress($toAddress, $toName);
    if ($replyAddress) $mailer->addReplyTo($replyAddress, $replyName);
    $mailer->isHTML(true);
    $mailer->Subject = $mail['subject'];
    $mailer->Body    = $mail['html'];
    $mailer->AltBody = $mail['text'];
    $mailer->addEmbeddedImage(__DIR__ . '/mail/emsphere-logo.png', EM_LOGO_CID, 'emsphere-logo.png', PHPMailer::ENCODING_BASE64, 'image/png');
    $mailer->send();
};

try {
    $send($leadTo, '', $lead['email'], $lead['name'], lead_email($lead));
} catch (MailerException $error) {
    error_log('[api/lead.php] lead email failed: ' . $error->getMessage());
    respond(500, ['ok' => false, 'error' => 'mail_failed']);
}

try {
    $send($lead['email'], $lead['name'], $leadTo, 'Emsphere Technologies', thank_you_email($lead));
} catch (MailerException $error) {
    // The lead is already delivered; don't fail the request over the thank-you.
    error_log('[api/lead.php] thank-you email failed: ' . $error->getMessage());
}

respond(200, ['ok' => true]);
