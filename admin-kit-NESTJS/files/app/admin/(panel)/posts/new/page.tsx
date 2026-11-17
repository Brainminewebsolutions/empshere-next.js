import { requireStaff } from "@/lib/auth";
import type { PostType } from "@/lib/posts";
import PostEditor from "../_editor/PostEditor";

export default async function NewPostPage() {
  const staff = await requireStaff();
  const postType: PostType = "blog";

  return (
    <PostEditor
      initial={{
        post_type: postType,
        status: "draft",
        title: "",
        slug: "",
        excerpt: "",
        content_html: "",
        author_name: staff.fullName || "Winsquare",
        featured_image_url: "",
        featured_image_alt: "",
        published_at: "",
        focus_keyphrase: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        canonical_url: "",
        noindex: false,
        og_title: "",
        og_description: "",
        og_image_url: "",
        faqs: [],
        auto_article_schema: true,
        auto_faq_schema: true,
        custom_schemas: [],
      }}
    />
  );
}
