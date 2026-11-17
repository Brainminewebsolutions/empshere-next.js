import Link from "next/link";
import type { Post } from "@/lib/posts";
import { buildAllSchemas, serializeJsonLd } from "@/lib/schema";
import { sanitizePostHtml } from "@/lib/sanitize";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

// One blog post, in the site's own design. Used by the public page
// (/blogs/[slug]) and by the admin preview, so what you preview is what
// visitors get.
export default function BlogArticle({ post }: { post: Post }) {
  const date = post.published_at ?? post.updated_at;
  const faqs = (post.faqs ?? []).filter((f) => f.question && f.answer);
  // Structured data (BlogPosting + FAQPage + any custom blocks from the admin Schema box).
  const schemas = buildAllSchemas({ ...post, faqs }, post.custom_schemas ?? []);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      ))}
      <section className="page-hero page-hero--post">
        <div className="wrap">
          <p className="crumbs"><Link href="/">Home</Link> / <Link href="/blogs">Blogs</Link></p>
          <h1>{post.title}</h1>
          <p className="page-hero__sub">
            <time dateTime={date}>{fmt(date)}</time>
            {post.author_name ? <> &middot; {post.author_name}</> : null}
          </p>
        </div>
      </section>
      <article className="post wrap">
        {post.featured_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="post__img" src={post.featured_image_url} alt={post.featured_image_alt || post.title} />
        )}
        {/* Sanitised on save and again here (allow-list in lib/sanitize.ts), so even a row edited directly in the database can't inject script. */}
        <div className="prose" dangerouslySetInnerHTML={{ __html: sanitizePostHtml(post.content_html) }} />
        {faqs.length > 0 && (
          <section className="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Frequently Asked Questions</h2>
            {faqs.map((faq, i) => (
              <details key={i} className="faq__item" open={i === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </section>
        )}
        <div className="post__nav">
          <Link href="/blogs" className="btn btn--outline">← All blogs</Link>
          <Link href="/contact-us" className="btn btn--purple">Book a Free Site Visit</Link>
        </div>
      </article>
    </>
  );
}
