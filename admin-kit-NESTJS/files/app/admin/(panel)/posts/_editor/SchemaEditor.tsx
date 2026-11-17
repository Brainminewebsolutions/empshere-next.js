"use client";

import {
  buildAllSchemas,
  MAX_CUSTOM_SCHEMAS,
  SCHEMA_TYPES,
  schemaTemplate,
  validateSchemaJson,
  type CustomSchema,
  type SchemaSource,
} from "@/lib/schema";
import type { PostInput } from "../../../_actions/posts";
import styles from "../../../admin.module.css";

type Props = {
  post: PostInput;
  set: <K extends keyof PostInput>(key: K, value: PostInput[K]) => void;
  // Live URL of the saved, published post (enables the Google test links).
  liveUrl?: string;
};

// Structured data (JSON-LD) for the post: the automatic Article + FAQ
// schemas, plus any number of custom blocks. The preview uses the same
// builder as the public page (lib/schema.ts), so what you see here is
// exactly what Google gets.
export default function SchemaEditor({ post, set, liveUrl }: Props) {
  const source: SchemaSource = {
    post_type: post.post_type,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    meta_description: post.meta_description,
    meta_keywords: post.meta_keywords,
    canonical_url: post.canonical_url,
    author_name: post.author_name,
    featured_image_url: post.featured_image_url || null,
    published_at: post.published_at || null,
    faqs: post.faqs,
  };

  // Cheap to build (a few small objects), so no memoisation needed.
  const output = buildAllSchemas(source, post.custom_schemas);

  const blocks = post.custom_schemas;
  const setBlocks = (next: CustomSchema[]) => set("custom_schemas", next);
  const updateBlock = (i: number, patch: Partial<CustomSchema>) =>
    setBlocks(blocks.map((b, j) => (j === i ? { ...b, ...patch } : b)));

  return (
    <div className={styles.card} style={{ marginBottom: 16 }}>
      <div className={styles.row} style={{ justifyContent: "space-between", marginBottom: 12 }}>
        <h2>
          Schema{" "}
          <span className={`${styles.muted} ${styles.small}`} style={{ fontWeight: 400 }}>
            (structured data · {output.length} on this page)
          </span>
        </h2>
        <span className={styles.hint}>JSON-LD that Google reads for rich results</span>
      </div>

      <p className={`${styles.muted} ${styles.small}`} style={{ marginBottom: 12 }}>
        Article schema is added automatically, plus FAQ schema when the post has FAQs. A custom Article or FAQPage
        block below replaces the automatic one.
      </p>

      {/* Custom blocks */}
      <p className={styles.checkGroupTitle}>Custom schema</p>
      {blocks.length === 0 && (
        <p className={`${styles.muted} ${styles.small}`} style={{ marginBottom: 12 }}>
          Optional. Add HowTo, Product, LocalBusiness, Breadcrumb, Video, or your own Article/FAQ schema.
        </p>
      )}

      {blocks.map((block, i) => {
        const check = validateSchemaJson(block.json);
        return (
          <div key={i} className={styles.faqItem}>
            <div className={styles.row} style={{ justifyContent: "space-between", marginBottom: 8 }}>
              <div className={styles.row} style={{ gap: 8 }}>
                <strong className={styles.small}>Schema {i + 1}</strong>
                <select
                  aria-label={`Schema ${i + 1} type`}
                  className={styles.select}
                  style={{ width: "auto", minHeight: 30 }}
                  value={block.type}
                  onChange={(e) => {
                    const type = e.target.value;
                    // Fill a template straight away if the block is still empty.
                    updateBlock(
                      i,
                      block.json.trim() ? { type } : { type, json: JSON.stringify(schemaTemplate(type, source), null, 2) },
                    );
                  }}
                >
                  {SCHEMA_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.row} style={{ gap: 2 }}>
                <button
                  type="button"
                  className={styles.buttonLink}
                  onClick={() => {
                    if (block.json.trim() && !window.confirm("Replace this block's JSON with a fresh template?")) return;
                    updateBlock(i, { json: JSON.stringify(schemaTemplate(block.type, source), null, 2) });
                  }}
                >
                  Fill template
                </button>
                <button
                  type="button"
                  className={styles.buttonLink}
                  disabled={!check.ok}
                  onClick={() => check.ok && updateBlock(i, { json: JSON.stringify(check.value, null, 2) })}
                >
                  Format
                </button>
                <button
                  type="button"
                  className={`${styles.buttonLink} ${styles.buttonLinkDanger}`}
                  onClick={() => {
                    if (block.json.trim() && !window.confirm("Remove this schema block?")) return;
                    setBlocks(blocks.filter((_, j) => j !== i));
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
            <textarea
              aria-label={`Schema ${i + 1} JSON`}
              className={`${styles.textarea} ${styles.codeArea}`}
              rows={12}
              spellCheck={false}
              value={block.json}
              onChange={(e) => updateBlock(i, { json: e.target.value })}
              placeholder='{ "@context": "https://schema.org", "@type": "Article", ... }'
            />
            <p className={styles.small} style={{ marginTop: 6, color: check.ok ? "#00701c" : "#d63638" }}>
              {check.ok ? "✓ Valid JSON-LD" : `✗ ${check.error}`}
            </p>
          </div>
        );
      })}

      <div className={styles.row} style={{ justifyContent: "space-between" }}>
        <button
          type="button"
          className={styles.button}
          disabled={blocks.length >= MAX_CUSTOM_SCHEMAS}
          onClick={() =>
            setBlocks([...blocks, { type: "HowTo", json: JSON.stringify(schemaTemplate("HowTo", source), null, 2) }])
          }
        >
          + Add schema
        </button>
        {liveUrl && (
          <div className={styles.row} style={{ gap: 4 }}>
            <a
              className={styles.buttonLink}
              href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(liveUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Test in Google ↗
            </a>
            <a
              className={styles.buttonLink}
              href={`https://validator.schema.org/#url=${encodeURIComponent(liveUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Schema.org validator ↗
            </a>
          </div>
        )}
      </div>

      {/* Exactly what the page outputs */}
      <details style={{ marginTop: 14 }}>
        <summary className={styles.small} style={{ cursor: "pointer", fontWeight: 600 }}>
          Preview the JSON-LD this page will output ({output.length})
        </summary>
        <pre className={styles.codePreview}>
          {output.length
            ? output.map((o) => JSON.stringify(o, null, 2)).join("\n\n")
            : "No schema will be output for this post."}
        </pre>
      </details>
      {!liveUrl && (
        <p className={`${styles.muted} ${styles.small}`} style={{ marginTop: 8 }}>
          Publish the post to get &quot;Test in Google&quot; links.
        </p>
      )}
    </div>
  );
}
