// Shared default Open Graph image, used by app/layout.tsx's site-wide
// default AND re-declared on every page's own `openGraph`/`twitter` block.
// Next.js metadata merging does not deep-merge nested objects like
// `openGraph` between a layout and a page - if a page declares its own
// `openGraph` at all (even just to set a page-specific title), the whole
// object replaces the layout's, silently dropping `images` unless the page
// includes it too. One shared constant instead of a copy-pasted URL string
// in 37 files.
export const DEFAULT_OG_IMAGE = {
  url: "/legacy-assets/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/10/Group-175-scaled.webp",
  width: 2560,
  height: 1435,
  alt: "Secure House - bespoke security doors and windows",
};

// SEO title/description overrides for Sanity-driven inspiration posts,
// keyed by slug. Sanity's `title` is also the on-page H1 and `excerpt` the
// listing-card teaser, so the search-result wording is set here instead of
// editing those fields. Anything not listed falls back to the Sanity values.
export const INSPIRATION_SEO: Record<
  string,
  { title?: string; description?: string }
> = {
  "curved-glass": {
    title: "Bespoke Curved Glass Security Doors | Secure House",
  },
  "residential-projects-building-regulation-compliance-secure-house": {
    title: "Residential Projects + Building Regulation Compliance",
  },
  "high-tech-protection-with-traditional-design": {
    description:
      "Combine traditional architecture with high-tech security. Custom period-style front doors with advanced multi-point locking. Explore options.",
  },
  "industrial-steel-doors-with-glass": {
    description:
      "Explore fire-rated industrial steel doors with glass. W20 slimline black frames bring maximum light & modern style to interiors. Contact us now.",
  },
};
