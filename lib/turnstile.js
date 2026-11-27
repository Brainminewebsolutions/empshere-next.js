/* Server-side Cloudflare Turnstile check, shared by the website lead form and
   the landing page forms. Without TURNSTILE_SECRET_KEY the token is not
   checked. */
export async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
      signal: AbortSignal.timeout(10_000),
    });
    const data = await res.json();
    if (!data.success) {
      // e.g. invalid-input-secret (wrong/missing secret for this widget),
      // timeout-or-duplicate (token reused or expired), bad-request.
      console.error("[turnstile] token rejected:", data["error-codes"]?.join(", ") || "unknown", "hostname:", data.hostname || "-");
    }
    return Boolean(data.success);
  } catch (error) {
    console.error("[turnstile] verification request failed:", error?.message || error);
    return false;
  }
}
