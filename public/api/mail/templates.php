<?php
/* ==============================================================================
   HTML emails sent by ../lead.php — the PHP twin of lib/email/templates.js
   (used by the Node.js route). Keep the two in step when changing a design.

     lead_email($lead)      → the team inbox: the lead + UTM tracking as tables
     thank_you_email($lead) → the person who filled in the form

   Nested tables with inline styles (email clients ignore most CSS); the
   <style> block only adds the mobile tweaks. Colours match the website.
   ============================================================================== */

const EM_SITE_URL = 'https://www.emsphere.com';
const EM_GOLD = '#EFB000';
const EM_GOLD_DARK = '#b07d00';
const EM_CREAM = '#fffcf0';
const EM_LIGHT_YELLOW = '#fff5d9';
const EM_BORDER = '#f3e3b0';
const EM_INK = '#1f1f1f';
const EM_MUTED = '#6b6b6b';
const EM_FONT = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const EM_LOGO_CID = 'emsphere-logo';

const EM_TRACKING_ROWS = [
    'utm_source'   => 'UTM Source',
    'utm_medium'   => 'UTM Medium',
    'utm_campaign' => 'UTM Campaign',
    'utm_term'     => 'UTM Term',
    'utm_content'  => 'UTM Content',
    'utm_id'       => 'UTM ID',
    'gclid'        => 'Google Ads (gclid)',
    'fbclid'       => 'Meta Ads (fbclid)',
    'msclkid'      => 'Microsoft Ads (msclkid)',
    'li_fat_id'    => 'LinkedIn Ads (li_fat_id)',
    'landing_page' => 'Landing Page',
    'referrer'     => 'Referrer',
];

function em_e($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function em_nl2br($value)
{
    return preg_replace('/\r?\n/', '<br>', em_e($value));
}

function em_india_time($timestamp)
{
    $date = new DateTime('@' . $timestamp);
    $date->setTimezone(new DateTimeZone('Asia/Kolkata'));
    return $date->format('j M Y, g:i a') . ' IST';
}

function em_first_name($name)
{
    $parts = preg_split('/\s+/', trim($name));
    return $parts[0] ?? $name;
}

function em_layout($preheader, $body)
{
    $gold = EM_GOLD; $goldDark = EM_GOLD_DARK; $cream = EM_CREAM; $light = EM_LIGHT_YELLOW;
    $border = EM_BORDER; $ink = EM_INK; $font = EM_FONT; $site = EM_SITE_URL; $cid = EM_LOGO_CID;
    $pre = em_e($preheader);
    return <<<HTML
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>Emsphere</title>
<style>
  body { margin:0; padding:0; -webkit-text-size-adjust:100%; }
  a { color:{$goldDark}; }
  @media only screen and (max-width:620px) {
    .wrap { padding:12px 8px !important; }
    .pad { padding-left:20px !important; padding-right:20px !important; }
    .h1 { font-size:22px !important; line-height:30px !important; }
    .stack, .stack td { display:block !important; width:100% !important; box-sizing:border-box; }
    .label { padding:12px 16px 2px !important; border-bottom:0 !important; background:{$cream} !important; }
    .value { padding:0 16px 12px !important; background:{$cream} !important; }
    .btn { display:block !important; width:100% !important; box-sizing:border-box; text-align:center !important; }
    .btn-gap { display:block !important; height:10px !important; width:100% !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:{$light};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:{$light};">{$pre}&#8203;&#8199;&#8203;&#8199;&#8203;&#8199;&#8203;&#8199;</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:{$light};">
  <tr>
    <td class="wrap" align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid {$border};">
        <tr><td style="height:6px;line-height:6px;font-size:0;background:{$gold};">&nbsp;</td></tr>
        <tr>
          <td class="pad" align="center" style="padding:28px 32px 20px;background:#ffffff;">
            <a href="{$site}" target="_blank" style="text-decoration:none;">
              <img src="cid:{$cid}" width="180" alt="emsphere — Seamless Connect" style="display:block;width:180px;max-width:60%;height:auto;border:0;outline:none;">
            </a>
          </td>
        </tr>
        {$body}
        <tr>
          <td class="pad" align="center" style="padding:22px 32px;background:{$ink};font-family:{$font};font-size:12px;line-height:19px;color:#bdbdbd;">
            <strong style="color:#ffffff;">Emsphere Technologies Pvt. Ltd.</strong><br>
            <a href="mailto:sales@emsphere.com" style="color:{$gold};text-decoration:none;">sales@emsphere.com</a>
            &nbsp;·&nbsp;
            <a href="tel:+917798981117" style="color:{$gold};text-decoration:none;">+91 77989 81117</a><br>
            <a href="{$site}" style="color:#bdbdbd;text-decoration:underline;">www.emsphere.com</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
HTML;
}

/* One row of the details table. $html is already escaped. */
function em_row($label, $html, $last = false)
{
    $border = $last ? '' : 'border-bottom:1px solid ' . EM_BORDER . ';';
    return '<tr class="stack">'
        . '<td class="label" width="34%" valign="top" style="padding:13px 16px;' . $border . 'background:' . EM_LIGHT_YELLOW . ';font-family:' . EM_FONT . ';font-size:13px;line-height:20px;font-weight:600;color:' . EM_GOLD_DARK . ';white-space:nowrap;">' . $label . '</td>'
        . '<td class="value" valign="top" style="padding:13px 16px;' . $border . 'background:#ffffff;font-family:' . EM_FONT . ';font-size:15px;line-height:22px;color:' . EM_INK . ';word-break:break-word;">' . $html . '</td>'
        . '</tr>';
}

function em_table(array $rows)
{
    return '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid ' . EM_BORDER . ';border-radius:12px;border-collapse:separate;overflow:hidden;">'
        . implode('', $rows) . '</table>';
}

function em_button($href, $label, $outline = false)
{
    $style = $outline
        ? 'background:#ffffff;color:' . EM_INK . ';border:1.5px solid ' . EM_GOLD . ';'
        : 'background:' . EM_GOLD . ';color:#ffffff;border:1.5px solid ' . EM_GOLD . ';';
    return '<a class="btn" href="' . $href . '" target="_blank" style="' . $style . 'display:inline-block;padding:12px 22px;border-radius:9px;font-family:' . EM_FONT . ';font-size:14px;font-weight:700;letter-spacing:0.02em;text-decoration:none;">' . $label . '</a>';
}

function em_link($url, $small = false)
{
    $size = $small ? 'font-size:13px;' : '';
    return '<a href="' . em_e($url) . '" style="color:' . EM_GOLD_DARK . ';' . $size . '">' . em_e($url) . '</a>';
}

function em_eyebrow($text)
{
    return '<p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:' . EM_GOLD_DARK . ';">' . $text . '</p>';
}

/* One-line answer to "where did this lead come from?". */
function em_lead_source(array $t)
{
    if (!empty($t['utm_source'])) return implode(' / ', array_filter([$t['utm_source'], $t['utm_medium'] ?? '']));
    if (!empty($t['gclid'])) return 'Google Ads';
    if (!empty($t['fbclid'])) return 'Meta (Facebook / Instagram)';
    if (!empty($t['msclkid'])) return 'Microsoft Ads';
    if (!empty($t['li_fat_id'])) return 'LinkedIn Ads';
    $ref = preg_replace('/^www\./', '', (string) parse_url($t['referrer'] ?? '', PHP_URL_HOST));
    if ($ref !== '' && preg_match('/(^|\.)google\.|bing\.com|duckduckgo\.com|yahoo\.com/', $ref)) return "Organic search ($ref)";
    if ($ref !== '') return "Referral ($ref)";
    return 'Direct';
}

/* ---- Lead notification (to the team) ------------------------------------- */

function lead_email(array $lead)
{
    $submitted = em_india_time($lead['submitted_at']);
    $tracking = $lead['tracking'];
    $source = em_lead_source($tracking);
    $mobileDigits = preg_replace('/\D/', '', $lead['mobile']);
    $product = $lead['product'] !== '' ? $lead['product'] : 'Emsphere';
    $linkStyle = 'color:' . EM_GOLD_DARK . ';text-decoration:none;font-weight:600;';

    $rows = [
        em_row('Name', em_e($lead['name'])),
        em_row('Work Email', '<a href="mailto:' . em_e($lead['email']) . '" style="' . $linkStyle . '">' . em_e($lead['email']) . '</a>'),
        em_row('Mobile', '<a href="tel:+91' . $mobileDigits . '" style="' . $linkStyle . '">+91 ' . em_e($lead['mobile']) . '</a>'),
        em_row('Company', em_e($lead['company'])),
        em_row('Product', '<span style="display:inline-block;padding:3px 10px;border-radius:999px;background:' . EM_LIGHT_YELLOW . ';border:1px solid ' . EM_BORDER . ';font-size:13px;font-weight:600;color:' . EM_INK . ';">' . em_e($lead['product'] ?: '—') . '</span>'),
        em_row('Message', em_nl2br($lead['message'])),
        em_row('Page', $lead['page'] !== '' ? em_link($lead['page'], true) : '—'),
        em_row('Submitted', em_e($submitted), true),
    ];

    $trackingRows = [em_row('Lead Source', '<strong>' . em_e($source) . '</strong>')];
    $keys = array_keys(EM_TRACKING_ROWS);
    foreach (EM_TRACKING_ROWS as $key => $label) {
        $value = $tracking[$key] ?? '';
        if ($value === '') $html = '<span style="color:#b5b5b5;">—</span>';
        elseif ($key === 'landing_page' || $key === 'referrer') $html = em_link($value, true);
        else $html = em_e($value);
        $trackingRows[] = em_row($label, $html, $key === end($keys));
    }

    $font = EM_FONT; $ink = EM_INK; $muted = EM_MUTED; $goldDark = EM_GOLD_DARK;
    $replyHref = 'mailto:' . em_e($lead['email']) . '?subject=' . rawurlencode('Re: Your enquiry about ' . $product);
    $buttons = em_button($replyHref, 'Reply to ' . em_e(em_first_name($lead['name'])))
        . '<span class="btn-gap" style="display:inline-block;width:10px;"></span>'
        . em_button('tel:+91' . $mobileDigits, 'Call now', true);

    $body = '
        <tr>
          <td class="pad" style="padding:4px 32px 8px;font-family:' . $font . ';">
            <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:' . $goldDark . ';">New website lead</p>
            <h1 class="h1" style="margin:0;font-size:24px;line-height:32px;font-weight:700;color:' . $ink . ';">' . em_e($lead['name']) . ' from ' . em_e($lead['company']) . '</h1>
            <p style="margin:8px 0 0;font-size:14px;line-height:21px;color:' . $muted . ';">Enquiry about <strong style="color:' . $ink . ';">' . em_e($product) . '</strong> · Source: <strong style="color:' . $ink . ';">' . em_e($source) . '</strong> · ' . em_e($submitted) . '</p>
          </td>
        </tr>
        <tr><td class="pad" style="padding:20px 32px 8px;">' . em_table($rows) . '</td></tr>
        <tr>
          <td class="pad" style="padding:20px 32px 8px;font-family:' . $font . ';">
            ' . em_eyebrow('Lead source &amp; UTM tracking') . em_table($trackingRows) . '
          </td>
        </tr>
        <tr><td class="pad" style="padding:20px 32px 30px;">' . $buttons . '</td></tr>';

    $text = "New website lead — emsphere.com\n\n"
        . "Name:      {$lead['name']}\n"
        . "Email:     {$lead['email']}\n"
        . "Mobile:    +91 {$lead['mobile']}\n"
        . "Company:   {$lead['company']}\n"
        . "Product:   {$lead['product']}\n"
        . 'Page:      ' . ($lead['page'] ?: '-') . "\n"
        . "Submitted: $submitted\n\n"
        . "Message:\n{$lead['message']}\n\n"
        . "Lead source & UTM tracking\n"
        . "Lead Source: $source\n";
    foreach (EM_TRACKING_ROWS as $key => $label) $text .= $label . ': ' . (($tracking[$key] ?? '') ?: '-') . "\n";

    return [
        'subject' => 'New lead: ' . ($lead['product'] ?: 'Website') . ' — ' . $lead['company'] . ' (' . $lead['name'] . ')',
        'html'    => em_layout("{$lead['name']} from {$lead['company']} enquired about {$product}.", $body),
        'text'    => $text,
    ];
}

/* ---- Thank-you (to the visitor) ------------------------------------------ */

function thank_you_email(array $lead)
{
    $firstName = em_first_name($lead['name']);
    $product = $lead['product'] !== '' ? $lead['product'] : 'emSphere';
    $font = EM_FONT; $ink = EM_INK; $muted = EM_MUTED; $goldDark = EM_GOLD_DARK;

    $steps = [
        ['1', 'We review your requirement', 'A product specialist reads your message and matches it to the right solution.'],
        ['2', 'We get in touch', 'Expect a call or email from our team within one business day.'],
        ['3', 'Personalised demo', 'A walkthrough of ' . em_e($product) . ', set up around how your organisation works.'],
    ];
    $stepRows = '';
    foreach ($steps as $i => [$n, $title, $copy]) {
        $top = $i ? '14px' : '0';
        $stepRows .= '<tr>
          <td width="40" valign="top" style="padding:' . $top . ' 0 0;">
            <div style="width:30px;height:30px;line-height:30px;border-radius:50%;background:' . EM_GOLD . ';color:#ffffff;text-align:center;font-family:' . $font . ';font-size:14px;font-weight:700;">' . $n . '</div>
          </td>
          <td valign="top" style="padding:' . $top . ' 0 0 6px;font-family:' . $font . ';">
            <p style="margin:0;font-size:15px;line-height:22px;font-weight:700;color:' . $ink . ';">' . $title . '</p>
            <p style="margin:2px 0 0;font-size:14px;line-height:21px;color:' . $muted . ';">' . $copy . '</p>
          </td>
        </tr>';
    }

    $rows = [
        em_row('Product', em_e($lead['product'] ?: '—')),
        em_row('Company', em_e($lead['company'])),
        em_row('Mobile', '+91 ' . em_e($lead['mobile'])),
        em_row('Message', em_nl2br($lead['message']), true),
    ];

    $body = '
        <tr>
          <td class="pad" style="padding:4px 32px 0;font-family:' . $font . ';">
            <h1 class="h1" style="margin:0;font-size:26px;line-height:34px;font-weight:700;color:' . $ink . ';">Thank you, ' . em_e($firstName) . '!</h1>
            <p style="margin:12px 0 0;font-size:15px;line-height:24px;color:#3d3d3d;">We have received your enquiry about <strong style="color:' . $ink . ';">' . em_e($product) . '</strong>. Our team will get in touch with you shortly to understand your needs and schedule a demo.</p>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:24px 32px 0;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:' . EM_CREAM . ';border:1px solid ' . EM_BORDER . ';border-radius:12px;">
              <tr>
                <td style="padding:20px 20px 18px;font-family:' . $font . ';">
                  <p style="margin:0 0 14px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:' . $goldDark . ';">What happens next</p>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">' . $stepRows . '</table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:24px 32px 0;font-family:' . $font . ';">
            ' . em_eyebrow('Your submission') . em_table($rows) . '
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:24px 32px 30px;font-family:' . $font . ';">
            ' . em_button(EM_SITE_URL, 'Explore emSphere &rarr;') . '
            <p style="margin:18px 0 0;font-size:13px;line-height:20px;color:' . $muted . ';">Need something sooner? Reply to this email or call us on <a href="tel:+917798981117" style="color:' . $goldDark . ';font-weight:600;text-decoration:none;">+91 77989 81117</a>.</p>
          </td>
        </tr>';

    $text = "Thank you, $firstName!\n\n"
        . "We have received your enquiry about $product. Our team will get in touch with you shortly to understand your needs and schedule a demo.\n\n"
        . "Your submission\n"
        . "Product: {$lead['product']}\n"
        . "Company: {$lead['company']}\n"
        . "Mobile:  +91 {$lead['mobile']}\n"
        . "Message: {$lead['message']}\n\n"
        . "Need something sooner? Reply to this email or call +91 77989 81117.\n\n"
        . "Emsphere Technologies Pvt. Ltd. — https://www.emsphere.com\n";

    return [
        'subject' => "Thank you for contacting Emsphere, $firstName",
        'html'    => em_layout("We received your enquiry about $product — our team will be in touch shortly.", $body),
        'text'    => $text,
    ];
}
