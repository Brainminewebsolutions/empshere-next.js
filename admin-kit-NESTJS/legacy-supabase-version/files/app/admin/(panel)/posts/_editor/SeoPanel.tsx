"use client";

import { useDeferredValue, useMemo, useState, useSyncExternalStore } from "react";
import {
  analyzeReadability,
  analyzeSeo,
  overallScore,
  META_DESC_MAX,
  META_DESC_MIN,
  SEO_TITLE_MAX,
  SEO_TITLE_MIN,
  type Check,
  type CheckStatus,
  type ParsedContent,
} from "@/lib/seo-analysis";
import { slugify } from "@/lib/slug";
import type { PostInput } from "../../../_actions/posts";
import ImageField from "./ImageField";
import styles from "../../../admin.module.css";

type Props = {
  post: PostInput;
  set: <K extends keyof PostInput>(key: K, value: PostInput[K]) => void;
  onSlugEdited: () => void;
};

const SITE = "https://secure-house.co.uk";

function parseHtml(html: string): ParsedContent {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const paragraphs = Array.from(doc.querySelectorAll("p, li, blockquote"))
    .map((el) => el.textContent?.trim() ?? "")
    .filter(Boolean);
  return {
    text: doc.body.textContent ?? "",
    paragraphs,
    headings: Array.from(doc.querySelectorAll("h2, h3, h4")).map((h) => h.textContent ?? ""),
    images: Array.from(doc.querySelectorAll("img")).map((img) => ({ alt: img.getAttribute("alt") ?? "" })),
    links: Array.from(doc.querySelectorAll("a[href]")).map((a) => ({ href: a.getAttribute("href") ?? "" })),
  };
}

export default function SeoPanel({ post, set, onSlugEdited }: Props) {
  const [tab, setTab] = useState<"seo" | "readability" | "social" | "advanced">("seo");
  const deferredHtml = useDeferredValue(post.content_html);
  // DOMParser only exists in the browser: analyse after hydration so the
  // server-rendered and first client render match.
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const parsed = useMemo(() => (isClient ? parseHtml(deferredHtml) : null), [isClient, deferredHtml]);

  const seoChecks = useMemo(
    () =>
      parsed
        ? analyzeSeo({
            focusKeyphrase: post.focus_keyphrase,
            seoTitle: post.meta_title,
            metaDescription: post.meta_description,
            slug: post.slug,
            title: post.title,
            featuredImageUrl: post.featured_image_url,
            featuredImageAlt: post.featured_image_alt,
            content: parsed,
            siteHost: "secure-house.co.uk",
          })
        : [],
    [parsed, post.focus_keyphrase, post.meta_title, post.meta_description, post.slug, post.title, post.featured_image_url, post.featured_image_alt],
  );
  const readabilityChecks = useMemo(() => (parsed ? analyzeReadability(parsed) : []), [parsed]);

  const seoScore = overallScore(seoChecks);
  const readScore = overallScore(readabilityChecks);

  const effectiveTitle = post.meta_title || post.title || "Post title";
  const effectiveDesc =
    post.meta_description || post.excerpt || "Add a meta description to control what Google shows here.";
  const url = `${SITE}/${post.post_type}/${post.slug || "post-slug"}/`;

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>SEO</h2>
      <div className={styles.seoTabs} role="tablist">
        <TabButton active={tab === "seo"} onClick={() => setTab("seo")} status={seoScore}>SEO</TabButton>
        <TabButton active={tab === "readability"} onClick={() => setTab("readability")} status={readScore}>Readability</TabButton>
        <TabButton active={tab === "social"} onClick={() => setTab("social")}>Social</TabButton>
        <TabButton active={tab === "advanced"} onClick={() => setTab("advanced")}>Advanced</TabButton>
      </div>

      {tab === "seo" && (
        <>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="kp">
              Focus keyphrase
              <span className={styles.hint}>The search term this post should rank for</span>
            </label>
            <input
              id="kp"
              className={styles.input}
              value={post.focus_keyphrase}
              onChange={(e) => set("focus_keyphrase", e.target.value)}
              placeholder="e.g. high security front doors"
            />
          </div>

          <p className={styles.checkGroupTitle}>Google preview</p>
          <div className={styles.serp} aria-label="Google search result preview">
            <div className={styles.serpSite}>
              <span className={styles.serpFavicon}>SH</span>
              <span>
                <div>Secure House</div>
                <div className={styles.serpUrl}>{url.replace("https://", "").replace(/\/$/, "").split("/").join(" › ")}</div>
              </span>
            </div>
            <div className={styles.serpTitle}>{truncate(effectiveTitle, SEO_TITLE_MAX + 5)}</div>
            <div className={styles.serpDesc}>
              {post.published_at && (
                <span className={styles.serpDate}>
                  {new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} —{" "}
                </span>
              )}
              {truncate(effectiveDesc, META_DESC_MAX)}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="meta_title">
              SEO title
              <span className={styles.hint}>{(post.meta_title || post.title).length} / {SEO_TITLE_MAX}</span>
            </label>
            <input
              id="meta_title"
              className={styles.input}
              value={post.meta_title}
              onChange={(e) => set("meta_title", e.target.value)}
              placeholder={post.title || "Defaults to the post title"}
            />
            <Meter length={(post.meta_title || post.title).length} min={SEO_TITLE_MIN} max={SEO_TITLE_MAX} />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="slug_seo">
              Slug
              <span className={styles.hint}>/{post.post_type}/<strong>{post.slug || "…"}</strong>/</span>
            </label>
            <div className={styles.row} style={{ flexWrap: "nowrap" }}>
              <input
                id="slug_seo"
                className={styles.input}
                value={post.slug}
                onChange={(e) => {
                  onSlugEdited();
                  set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                }}
                onBlur={() => set("slug", slugify(post.slug))}
              />
              <button
                type="button"
                className={styles.button}
                onClick={() => {
                  onSlugEdited();
                  set("slug", slugify(post.focus_keyphrase || post.title));
                }}
                title="Generate from keyphrase (or title)"
              >
                Generate
              </button>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="meta_description">
              Meta description
              <span className={styles.hint}>{post.meta_description.length} / {META_DESC_MAX}</span>
            </label>
            <textarea
              id="meta_description"
              className={styles.textarea}
              rows={3}
              value={post.meta_description}
              onChange={(e) => set("meta_description", e.target.value)}
              placeholder="Summarise the post in ~150 characters, including the focus keyphrase."
            />
            <Meter length={post.meta_description.length} min={META_DESC_MIN} max={META_DESC_MAX} />
          </div>

          <CheckList checks={seoChecks} />
        </>
      )}

      {tab === "readability" && <CheckList checks={readabilityChecks} />}

      {tab === "social" && (
        <>
          <p className={`${styles.muted} ${styles.small}`} style={{ marginBottom: 12 }}>
            How the post looks when shared on Facebook, LinkedIn, WhatsApp or X. Leave blank to reuse the SEO title,
            meta description and featured image.
          </p>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="og_title">Social title</label>
            <input
              id="og_title"
              className={styles.input}
              value={post.og_title}
              onChange={(e) => set("og_title", e.target.value)}
              placeholder={effectiveTitle}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="og_description">Social description</label>
            <textarea
              id="og_description"
              className={styles.textarea}
              rows={3}
              value={post.og_description}
              onChange={(e) => set("og_description", e.target.value)}
              placeholder={post.meta_description || post.excerpt}
            />
          </div>
          <div className={styles.field}>
            <span className={styles.label}>
              Social image <span className={styles.hint}>1200 × 630 px recommended</span>
            </span>
            <ImageField
              url={post.og_image_url}
              onChange={(u) => set("og_image_url", u)}
              emptyText="Optional - defaults to the featured image"
            />
          </div>
        </>
      )}

      {tab === "advanced" && (
        <>
          <div className={styles.field}>
            <label className={styles.checkboxRow}>
              <input type="checkbox" checked={post.noindex} onChange={(e) => set("noindex", e.target.checked)} />
              Hide this post from search engines (noindex)
            </label>
            <span className={styles.hint}>Also removes it from sitemap.xml. Leave unticked for normal posts.</span>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="canonical">
              Canonical URL
              <span className={styles.hint}>Leave blank to use this post&apos;s own URL</span>
            </label>
            <input
              id="canonical"
              className={styles.input}
              value={post.canonical_url}
              onChange={(e) => set("canonical_url", e.target.value)}
              placeholder={url}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="keywords">
              Meta keywords
              <span className={styles.hint}>Comma-separated. Google ignores these; some other engines don&apos;t.</span>
            </label>
            <input
              id="keywords"
              className={styles.input}
              value={post.meta_keywords}
              onChange={(e) => set("meta_keywords", e.target.value)}
              placeholder="security doors, steel doors, london"
            />
          </div>
        </>
      )}
    </div>
  );
}

function noopSubscribe() {
  return () => {};
}

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

function TabButton({
  active,
  onClick,
  status,
  children,
}: {
  active: boolean;
  onClick: () => void;
  status?: CheckStatus;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={`${styles.seoTab} ${active ? styles.seoTabActive : ""}`}
      onClick={onClick}
    >
      {status && <span className={`${styles.dot} ${styles[`dot${status}`]}`} style={{ marginTop: 0 }} />}
      {children}
    </button>
  );
}

function Meter({ length, min, max }: { length: number; min: number; max: number }) {
  const status: CheckStatus = length === 0 || length > max ? "bad" : length < min ? "ok" : "good";
  const color = status === "good" ? "#00a32a" : status === "ok" ? "#dba617" : "#d63638";
  return (
    <div className={styles.meter} aria-hidden>
      <div className={styles.meterFill} style={{ width: `${Math.min(100, (length / max) * 100)}%`, background: color }} />
    </div>
  );
}

function CheckList({ checks }: { checks: Check[] }) {
  const groups: [CheckStatus, string][] = [
    ["bad", "Problems"],
    ["ok", "Improvements"],
    ["good", "Good results"],
  ];
  return (
    <div>
      {groups.map(([status, title]) => {
        const items = checks.filter((c) => c.status === status);
        if (items.length === 0) return null;
        return (
          <div key={status}>
            <p className={styles.checkGroupTitle}>
              {title} ({items.length})
            </p>
            <ul className={styles.checks}>
              {items.map((c) => (
                <li key={c.id}>
                  <span className={`${styles.dot} ${styles[`dot${c.status}`]}`} />
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
