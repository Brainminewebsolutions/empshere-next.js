/* --------------------------------------------------------------------
   GET /lp-turnstile.js — Cloudflare Turnstile for the static landing
   pages (public/<slug>/). Same widget and keys as the website forms; it
   is a route so the site key comes from NEXT_PUBLIC_TURNSTILE_SITE_KEY.

   Renders into every <div class="lp-turnstile"> once it is visible (popup
   forms are hidden at first). The widget adds a "cf-turnstile-response"
   field to its form. Page scripts call window.lpCaptcha:
     passed(form)  true when the form has a token (or no key is configured)
     reset(form)   fresh token after a failed submit; a token works once
   -------------------------------------------------------------------- */

export const dynamic = "force-static";

function client(siteKey) {
  var widgets = new Map();

  window.lpCaptcha = {
    passed: function (form) {
      if (!siteKey) return true;
      var field = form.querySelector('[name="cf-turnstile-response"]');
      return Boolean(field && field.value);
    },
    reset: function (form) {
      var box = form.querySelector(".lp-turnstile");
      if (window.turnstile && widgets.has(box)) window.turnstile.reset(widgets.get(box));
    },
  };
  if (!siteKey) return;

  function render(box) {
    if (widgets.has(box)) return;
    widgets.set(
      box,
      window.turnstile.render(box, {
        sitekey: siteKey,
        theme: "light",
        // "flexible" needs 300px; narrower phones get the compact widget.
        size: box.clientWidth < 300 ? "compact" : "flexible",
      }),
    );
  }

  window.lpTurnstileLoaded = function () {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.target.clientWidth) {
          observer.unobserve(entry.target);
          render(entry.target);
        }
      });
    });
    document.querySelectorAll(".lp-turnstile").forEach(function (box) {
      // Some pages centre this box in a flex row, where it would be 0px wide.
      box.style.width = "100%";
      observer.observe(box);
    });
  };

  var script = document.createElement("script");
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=lpTurnstileLoaded";
  script.async = true;
  document.head.appendChild(script);
}

export function GET() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
  return new Response(`(${client.toString()})(${JSON.stringify(siteKey)});`, {
    headers: { "Content-Type": "text/javascript; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}
