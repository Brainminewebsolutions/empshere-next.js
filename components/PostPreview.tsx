import type { Post } from "@/lib/posts";
import { buildAllSchemas, serializeJsonLd } from "@/lib/post-schema";
import { sanitizePostHtml } from "@/lib/sanitize";

// Self-contained post preview used by /admin/preview/[id]. It uses inline
// styles only, so it works in any host project without needing that site's CSS.
// Your public blog page can render the same post with its own design (see
// reference/ in the kit).
const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function PostPreview({ post }: { post: Post }) {
  const date = post.published_at ?? post.updated_at;
  const faqs = (post.faqs ?? []).filter((f) => f.question && f.answer);
  const schemas = buildAllSchemas({ ...post, faqs }, post.custom_schemas ?? []);

  return (
    <article style={{ maxWidth: 820, margin: "0 auto", padding: "32px 20px 64px", color: "#1d2327", lineHeight: 1.7 }}>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      ))}
      <h1 style={{ fontSize: 36, lineHeight: 1.2, margin: "0 0 8px" }}>{post.title}</h1>
      <p style={{ color: "#646970", margin: "0 0 24px" }}>
        <time dateTime={date}>{fmt(date)}</time>
        {post.author_name ? <> &middot; {post.author_name}</> : null}
      </p>
      {post.featured_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.featured_image_url}
          alt={post.featured_image_alt || post.title}
          style={{ width: "100%", height: "auto", borderRadius: 8, margin: "0 0 24px" }}
        />
      )}
      {/* Sanitised on save and again here (allow-list in lib/sanitize.ts). */}
      <div dangerouslySetInnerHTML={{ __html: sanitizePostHtml(post.content_html) }} />
      {faqs.length > 0 && (
        <section style={{ marginTop: 40 }}>
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <details key={i} open={i === 0} style={{ margin: "8px 0" }}>
              <summary style={{ cursor: "pointer", fontWeight: 600 }}>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </section>
      )}
    </article>
  );
}
