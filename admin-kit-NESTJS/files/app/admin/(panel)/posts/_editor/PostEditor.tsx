"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { savePost, type PostInput } from "../../../_actions/posts";
import { slugify } from "@/lib/slug";
import RichTextEditor from "./RichTextEditor";
import SeoPanel from "./SeoPanel";
import ImageField from "./ImageField";
import FaqEditor from "./FaqEditor";
import SchemaEditor from "./SchemaEditor";
import DeletePostButton from "../DeletePostButton";
import styles from "../../../admin.module.css";
import { useLoadingToast } from "../../LoadingToast";

type Props = {
  initial: PostInput;
  // The status/slug as currently saved in the database (drives "View post").
  savedStatus?: "draft" | "published";
  savedSlug?: string;
};

// ISO -> value for <input type="datetime-local"> in the browser's timezone.
function toLocalInput(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function PostEditor({ initial, savedStatus, savedSlug }: Props) {
  const router = useRouter();
  const [post, setPost] = useState<PostInput>(initial);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  useLoadingToast(pending, "Saving…");
  // New posts: slug follows the title until someone edits it by hand.
  const slugTouched = useRef(Boolean(initial.id));

  const set = useCallback(<K extends keyof PostInput>(key: K, value: PostInput[K]) => {
    setPost((p) => {
      const next = { ...p, [key]: value };
      if (key === "title" && !slugTouched.current) next.slug = slugify(String(value));
      return next;
    });
    setDirty(true);
  }, []);

  const save = useCallback(
    (status: "draft" | "published") => {
      setMessage(null);
      startTransition(async () => {
        const result = await savePost({ ...post, status });
        if (!result.ok) {
          setMessage({ type: "error", text: result.error });
          return;
        }
        setDirty(false);
        setPost((p) => ({ ...p, id: result.id, status, slug: result.slug }));
        setMessage(
          result.warning
            ? { type: "error", text: result.warning }
            : {
                type: "success",
                text: status === "published" ? "Saved and published. The live page has been updated." : "Draft saved.",
              },
        );
        if (!post.id) router.replace(`/admin/posts/${result.id}/`);
        else router.refresh();
      });
    },
    [post, router],
  );

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  // Ctrl/Cmd+S saves with the current status.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (!pending) save(post.status);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pending, post.status, save]);

  const isPublished = savedStatus === "published";
  const typeLabel = "blog post";

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>{post.id ? `Edit ${typeLabel}` : `Add new ${typeLabel}`}</h1>
        <div className={styles.row}>
          {dirty && <span className={`${styles.muted} ${styles.small}`}>Unsaved changes</span>}
          {post.id && isPublished && savedSlug && (
            <a className={styles.button} href={`/${post.post_type}/${savedSlug}/`} target="_blank" rel="noopener">
              View post ↗
            </a>
          )}
        </div>
      </div>

      {message && (
        <p className={message.type === "error" ? styles.error : styles.success} role="status">
          {message.text}
        </p>
      )}

      <div className={styles.editorGrid}>
        <div style={{ minWidth: 0 }}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="title">Title (H1)</label>
            <input
              id="title"
              className={`${styles.input} ${styles.titleInput}`}
              value={post.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Add title"
            />
            <span className={styles.hint}>
              Permalink: https://www.winsquare.in/blogs/<strong>{post.slug || "…"}</strong>{" "}
              <span>(edit the slug in the SEO box below)</span>
            </span>
          </div>

          <div className={styles.field}>
            <RichTextEditor value={post.content_html} onChange={(html) => set("content_html", html)} />
          </div>

          <FaqEditor faqs={post.faqs} onChange={(faqs) => set("faqs", faqs)} />

          <SchemaEditor
            post={post}
            set={set}
            liveUrl={
              post.id && savedStatus === "published" && savedSlug
                ? `https://www.winsquare.in/blogs/${savedSlug}`
                : undefined
            }
          />

          <div className={styles.card} style={{ marginBottom: 16 }}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="excerpt">
                Excerpt
                <span className={styles.hint}>Shown on the blog listing card</span>
              </label>
              <textarea
                id="excerpt"
                className={styles.textarea}
                rows={3}
                value={post.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
              />
            </div>
          </div>

          <SeoPanel post={post} set={set} onSlugEdited={() => (slugTouched.current = true)} />
        </div>

        <aside className={styles.editorSide}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Publish</h2>
            <p style={{ marginBottom: 10 }}>
              Status:{" "}
              <span className={`${styles.badge} ${isPublished ? styles.badgePublished : styles.badgeDraft}`}>
                {savedStatus ?? "not saved"}
              </span>
            </p>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="published_at">
                Publish date
                <span className={styles.hint}>Blank = now</span>
              </label>
              <input
                id="published_at"
                type="datetime-local"
                // Rendered in the browser's timezone, which can differ from the server's.
                suppressHydrationWarning
                className={styles.input}
                value={toLocalInput(post.published_at)}
                onChange={(e) => set("published_at", e.target.value ? new Date(e.target.value).toISOString() : "")}
              />
            </div>
            <div className={styles.saveBar}>
              {isPublished ? (
                <>
                  <button type="button" className={styles.buttonPrimary} disabled={pending} onClick={() => save("published")}>
                    {pending ? "Saving…" : "Update"}
                  </button>
                  <button type="button" className={styles.button} disabled={pending} onClick={() => save("draft")}>
                    Switch to draft
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className={styles.button} disabled={pending} onClick={() => save("draft")}>
                    {pending ? "Saving…" : "Save draft"}
                  </button>
                  <button type="button" className={styles.buttonPrimary} disabled={pending} onClick={() => save("published")}>
                    Publish
                  </button>
                </>
              )}
            </div>
            {post.id && (
              <div className={styles.row} style={{ marginTop: 12, justifyContent: "space-between" }}>
                <a href={`/admin/preview/${post.id}/`} target="_blank" rel="noopener" className={styles.buttonLink} style={{ paddingLeft: 0 }}>
                  Preview (saved version)
                </a>
                <DeletePostButton id={post.id} title={post.title} redirectTo="/admin/posts/" />
              </div>
            )}
            <p className={`${styles.muted} ${styles.small}`} style={{ marginTop: 10 }}>
              Tip: Ctrl+S saves.
            </p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Featured image</h2>
            <ImageField url={post.featured_image_url} onChange={(u) => set("featured_image_url", u)} />
            <div className={styles.field} style={{ marginTop: 12 }}>
              <label className={styles.label} htmlFor="featured_alt">Alt text</label>
              <input
                id="featured_alt"
                className={styles.input}
                value={post.featured_image_alt}
                onChange={(e) => set("featured_image_alt", e.target.value)}
                placeholder="Describe the image"
              />
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Post settings</h2>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="author">Author</label>
              <input
                id="author"
                className={styles.input}
                value={post.author_name}
                onChange={(e) => set("author_name", e.target.value)}
              />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
