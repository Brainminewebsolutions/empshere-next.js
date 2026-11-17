import type { Post } from '@/lib/posts';
import { buildAllSchemas, serializeJsonLd } from '@/lib/schema';
import { sanitizePostHtml } from '@/lib/sanitize';
import styles from './BlogPostTemplate.module.css';

export default function BlogPostTemplate({ post }: { post: Post }) {
  const date = post.published_at ?? post.updated_at;
  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const faqs = (post.faqs ?? []).filter((f) => f.question && f.answer);

  // Structured data: automatic Article (BlogPosting) + FAQPage schemas,
  // plus any custom JSON-LD blocks from the Schema box in /admin (a custom
  // block of the same kind replaces the automatic one). Built by
  // lib/schema.ts - the same code the editor's live preview uses.
  const schemas = buildAllSchemas({ ...post, faqs }, post.custom_schemas ?? []);

  return (
    <article className={styles.wrapper}>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}
      {/* Every ported page loads its own page-specific Avada CSS bundle,
          which (among hundreds of unrelated rules) carries the critical
          `body{overflow-x:hidden}` reset that keeps the shared Header/
          Footer's intentional 104%-width full-bleed rows from spilling
          text off the left edge. Blog/inspiration posts never had a
          scraped Avada page to port from, so they never got one - without
          it, that overflow escapes unclipped and the footer (and header,
          once "stuck") render with their first ~50px of text cut off.
          Reusing an existing, already-verified-safe bundle (not writing a
          new one) - confirmed via direct browser testing 2026-09-18 that
          this specific fix (and no smaller one) resolves it. */}
      <link rel="stylesheet" href="/legacy-assets/uploads/fusion-styles/3978f22170001630860f0711fbc80184.min.css" />
      <p className={styles.dateAuthor}>
        {formattedDate} — {post.author_name}
      </p>
      <h1 className={styles.title}>{post.title}</h1>
      {post.featured_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.featured_image_url}
          alt={post.featured_image_alt || post.title}
          className={styles.featuredImage}
        />
      )}
      {/* Sanitised on save and again here (allow-list in lib/sanitize.ts),
          so even a row edited directly in the database can't inject script. */}
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: sanitizePostHtml(post.content_html) }}
      />
      {faqs.length > 0 && (
        <section className={styles.faq} aria-labelledby="faq-heading">
          <h2 id="faq-heading" className={styles.faqHeading}>Frequently Asked Questions</h2>
          {/* Native <details> accordion: works without JS, and the answers
              stay in the HTML for Google even while collapsed. Plain text,
              escaped by React - line breaks kept via white-space: pre-line. */}
          {faqs.map((faq, i) => (
            <details key={i} className={styles.faqItem} open={i === 0}>
              <summary className={styles.faqQuestion}>{faq.question}</summary>
              <p className={styles.faqAnswer}>{faq.answer}</p>
            </details>
          ))}
        </section>
      )}
    </article>
  );
}
