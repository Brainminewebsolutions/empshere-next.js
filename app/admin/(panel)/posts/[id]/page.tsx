import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { getPostById } from "@/lib/posts";
import { isUuid } from "../../../_actions/validation";
import PostEditor from "../_editor/PostEditor";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const { id } = await params;
  if (!isUuid(id)) notFound();

  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <PostEditor
      // Remount when switching between posts so no state leaks across.
      key={post.id}
      savedStatus={post.status}
      savedSlug={post.slug}
      initial={{
        id: post.id,
        post_type: post.post_type,
        status: post.status,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content_html: post.content_html,
        author_name: post.author_name,
        featured_image_url: post.featured_image_url ?? "",
        featured_image_alt: post.featured_image_alt,
        categories_text: post.categories.map((t) => t.name).join(", "),
        tags_text: post.tags.map((t) => t.name).join(", "),
        published_at: post.published_at ?? "",
        focus_keyphrase: post.focus_keyphrase,
        meta_title: post.meta_title,
        meta_description: post.meta_description,
        meta_keywords: post.meta_keywords,
        canonical_url: post.canonical_url,
        noindex: post.noindex,
        og_title: post.og_title,
        og_description: post.og_description,
        og_image_url: post.og_image_url ?? "",
        faqs: post.faqs ?? [],
        auto_article_schema: post.auto_article_schema !== false,
        auto_faq_schema: post.auto_faq_schema !== false,
        custom_schemas: post.custom_schemas ?? [],
      }}
    />
  );
}
