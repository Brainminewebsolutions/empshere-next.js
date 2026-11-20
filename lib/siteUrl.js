/* Single source of truth for the site's public URL and environment.

   NEXT_PUBLIC_SITE_URL  production value: https://www.emsphere.com
   NEXT_PUBLIC_SITE_ENV  set to "staging" ONLY on a staging/preview host.
                         Anything else (including unset) means production, so
                         production can never accidentally ship as noindex. */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.emsphere.com").replace(/\/+$/, "");

export const IS_STAGING = process.env.NEXT_PUBLIC_SITE_ENV === "staging";
export const IS_PRODUCTION = !IS_STAGING;

/** Absolute URL for a site path, e.g. absoluteUrl("/about-us/"). */
export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
