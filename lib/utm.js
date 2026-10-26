/* --------------------------------------------------------------------
   Campaign tracking for the lead form.

   captureUtm() runs on every page (components/DemoModal is mounted in the
   root layout). When the URL carries UTM tags or ad click IDs, they are
   saved together with the landing page and referrer, so a visitor who
   lands on /?utm_source=google… and fills the form three pages later is
   still attributed. A new set of tags replaces the old one (last touch);
   saved tags expire after 30 days.

   getUtm() returns the saved values; LeadForm sends them with the lead
   and app/api/lead/route.js puts them in the team email.
   -------------------------------------------------------------------- */

export const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "fbclid",
  "msclkid",
  "li_fat_id",
];

const STORAGE_KEY = "emsphere_utm";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

function read() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && Date.now() - saved.savedAt < MAX_AGE_MS) return saved;
  } catch {}
  return null;
}

function write(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

/* Referrer from another site only; internal page-to-page hops say nothing. */
function externalReferrer() {
  try {
    const ref = document.referrer;
    return ref && new URL(ref).host !== window.location.host ? ref : "";
  } catch {
    return "";
  }
}

export function captureUtm() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const tags = {};
  for (const key of UTM_FIELDS) {
    const value = params.get(key);
    if (value) tags[key] = value.slice(0, 200);
  }

  const saved = read();
  if (Object.keys(tags).length) {
    write({ ...tags, landing_page: window.location.href, referrer: externalReferrer(), savedAt: Date.now() });
  } else if (!saved) {
    // No campaign: still remember where the visit started (organic / direct).
    write({ landing_page: window.location.href, referrer: externalReferrer(), savedAt: Date.now() });
  }
}

export function getUtm() {
  if (typeof window === "undefined") return {};
  captureUtm();
  const { savedAt, ...values } = read() || {};
  return values;
}
