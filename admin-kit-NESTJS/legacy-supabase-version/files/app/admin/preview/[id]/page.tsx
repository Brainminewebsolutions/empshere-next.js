import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { createSessionClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/posts";
import BlogPostTemplate from "@/components/BlogPostTemplate";
import { isUuid } from "../../_actions/validation";

// Shows the saved version of any post (including drafts) exactly as the
// public template renders it. Staff-only, like the rest of /admin.
export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const { id } = await params;
  if (!isUuid(id)) notFound();

  const supabase = await createSessionClient();
  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const post = data as Post;

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <div
        style={{
          background: "#1d2327",
          color: "#fff",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          fontSize: 13,
        }}
      >
        <span>
          Preview{post.status === "draft" ? " (draft, not visible to the public)" : ""}
        </span>
        <Link href={`/admin/posts/${post.id}/`} style={{ color: "#72aee6" }}>
          ← Back to editor
        </Link>
      </div>
      <BlogPostTemplate post={post} />
    </div>
  );
}
