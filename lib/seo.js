// Shared social-card values. Next.js merges metadata shallowly, so any page that
// sets its own `openGraph` or `twitter` object must include these itself.

export const TWITTER_SITE = "@emspheretech";

// 1200x630 card used by pages that have no page-specific image.
export const DEFAULT_OG_IMAGE = {
  url: "/universal-images/og/emsphere-workforce-management-og.jpg",
  width: 1200,
  height: 630,
  alt: "Emsphere Technologies - Workforce and Labor Management System",
};
