// JSON-LD structured data for posts. Pure functions (no server-only
// imports) so the admin editor's live preview and the public page build
// exactly the same output.

export type Faq = { question: string; answer: string };

export type CustomSchema = {
  type: string; // label chosen in the editor, e.g. "Article", "HowTo", "Other"
  json: string; // the JSON-LD text as entered (validated on save)
};

export type SchemaSource = {
  post_type: "blog" | "inspiration";
  slug: string;
  title: string;
  excerpt: string;
  meta_description: string;
  meta_keywords: string;
  canonical_url: string;
  author_name: string;
  featured_image_url: string | null;
  published_at: string | null;
  updated_at?: string | null;
  faqs: Faq[];
};

export const SITE_URL = "https://www.winsquare.in";

// Uploaded images are stored as relative /media/<id> paths; schema.org needs absolute URLs.
const abs = (u: string | null | undefined) => (u ? (u.startsWith("/") ? `${SITE_URL}${u}` : u) : undefined);
const PUBLISHER = {
  "@type": "Organization",
  name: "Winsquare",
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
};

export const MAX_CUSTOM_SCHEMAS = 10;
export const MAX_SCHEMA_CHARS = 20_000;

export const SCHEMA_TYPES = [
  "Article",
  "BlogPosting",
  "FAQPage",
  "HowTo",
  "Product",
  "LocalBusiness",
  "BreadcrumbList",
  "VideoObject",
  "Other",
] as const;

function pageUrl(s: SchemaSource) {
  return s.canonical_url || `${SITE_URL}/blogs/${s.slug}`;
}

function clean<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== "")) as T;
}

export function buildArticleSchema(s: SchemaSource) {
  return clean({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: s.title,
    description: s.meta_description || s.excerpt,
    image: s.featured_image_url ? [abs(s.featured_image_url)] : undefined,
    datePublished: s.published_at ?? undefined,
    dateModified: s.updated_at ?? s.published_at ?? undefined,
    author: { "@type": "Organization", name: s.author_name || "Winsquare", url: SITE_URL },
    publisher: PUBLISHER,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl(s) },
    keywords: s.meta_keywords || undefined,
  });
}

export function buildFaqSchema(faqs: Faq[]) {
  const valid = faqs.filter((f) => f.question.trim() && f.answer.trim());
  if (valid.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: valid.map((f) => ({
      "@type": "Question",
      name: f.question.trim(),
      acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
    })),
  };
}

// Starter JSON for a custom block, pre-filled from the post where possible.
export function schemaTemplate(type: string, s: SchemaSource): object {
  const url = pageUrl(s);
  switch (type) {
    case "Article":
    case "BlogPosting":
      return { ...buildArticleSchema(s), "@type": type };
    case "FAQPage":
      return (
        buildFaqSchema(s.faqs) ?? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Your question?", acceptedAnswer: { "@type": "Answer", text: "Your answer." } },
          ],
        }
      );
    case "HowTo":
      return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: s.title,
        description: s.meta_description || s.excerpt,
        image: abs(s.featured_image_url),
        step: [
          { "@type": "HowToStep", name: "Step 1", text: "Describe the first step." },
          { "@type": "HowToStep", name: "Step 2", text: "Describe the second step." },
        ],
      };
    case "Product":
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Product name",
        description: "Product description.",
        image: abs(s.featured_image_url),
        brand: { "@type": "Brand", name: "Winsquare" },
      };
    case "LocalBusiness":
      return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Winsquare",
        url: SITE_URL,
        telephone: "+91 91458 59658",
        email: "dhiraj@winsquare.in",
        address: {
          "@type": "PostalAddress",
          streetAddress: "321/5 Deep, 1st Floor, Shanti Nagar Society, Timber Market Road",
          addressLocality: "Pune",
          postalCode: "411042",
          addressCountry: "IN",
        },
      };
    case "BreadcrumbList":
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blogs", item: `${SITE_URL}/blogs` },
          { "@type": "ListItem", position: 3, name: s.title, item: url },
        ],
      };
    case "VideoObject":
      return {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: "Video title",
        description: "Video description.",
        thumbnailUrl: abs(s.featured_image_url) ?? "https://example.com/thumbnail.jpg",
        uploadDate: s.published_at ?? new Date().toISOString(),
        embedUrl: "https://www.youtube.com/embed/VIDEO_ID",
      };
    default:
      return { "@context": "https://schema.org", "@type": "Thing", name: s.title };
  }
}

export type SchemaCheck = { ok: true; value: object } | { ok: false; error: string };

// A block must be valid JSON describing schema.org data: an object (or an
// array of objects) with "@type", or an "@graph" container.
export function validateSchemaJson(text: string): SchemaCheck {
  const trimmed = text.trim();
  if (!trimmed) return { ok: false, error: "Empty - paste JSON-LD or click 'Fill template'." };
  if (trimmed.length > MAX_SCHEMA_CHARS) return { ok: false, error: `Too long (max ${MAX_SCHEMA_CHARS} characters).` };
  if (/^<script/i.test(trimmed)) return { ok: false, error: "Paste only the JSON, without the <script> tags." };

  let value: unknown;
  try {
    value = JSON.parse(trimmed);
  } catch (err) {
    return { ok: false, error: `Invalid JSON: ${(err as Error).message}` };
  }

  const items = Array.isArray(value) ? value : [value];
  if (items.length === 0) return { ok: false, error: "Empty array." };
  for (const item of items) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      return { ok: false, error: "Each schema must be a JSON object { ... }." };
    }
    const obj = item as Record<string, unknown>;
    if (!obj["@type"] && !obj["@graph"]) return { ok: false, error: 'Missing "@type" (e.g. "Article").' };
  }
  const first = items[0] as Record<string, unknown>;
  if (!Array.isArray(value) && typeof first["@context"] === "string" && !/schema\.org/i.test(first["@context"])) {
    return { ok: false, error: '"@context" should be "https://schema.org".' };
  }
  return { ok: true, value: value as object };
}

// Safe to drop inside <script type="application/ld+json">: "<" is escaped
// so no value can ever close the script tag early.
export function serializeJsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

// Every post gets an Article (BlogPosting) schema and, when it has FAQs, a
// FAQPage schema - automatically. A custom block of the same kind replaces
// the automatic one, so Google never sees the same schema twice.
const ARTICLE_TYPES = new Set(["Article", "BlogPosting", "NewsArticle"]);

function customTypes(custom: CustomSchema[]) {
  const types = new Set<string>();
  for (const block of custom) {
    const check = validateSchemaJson(block.json);
    if (!check.ok) continue;
    for (const item of Array.isArray(check.value) ? check.value : [check.value]) {
      const t = (item as Record<string, unknown>)["@type"];
      for (const one of Array.isArray(t) ? t : [t]) if (typeof one === "string") types.add(one);
    }
  }
  return types;
}

export function buildAllSchemas(s: SchemaSource, custom: CustomSchema[]): object[] {
  const out: object[] = [];
  const types = customTypes(custom);
  if (![...types].some((t) => ARTICLE_TYPES.has(t))) out.push(buildArticleSchema(s));
  if (!types.has("FAQPage")) {
    const faq = buildFaqSchema(s.faqs);
    if (faq) out.push(faq);
  }
  for (const block of custom) {
    const check = validateSchemaJson(block.json);
    if (check.ok) out.push(check.value);
  }
  return out;
}
