import HomePage from "@/components/HomePage";
import { getLatestPosts } from "@/lib/blog";

// The "Latest Blogs" strip comes from the database. The page is regenerated
// every 5 minutes, and immediately when a post is saved in /admin.
export const revalidate = 300;

async function loadLatestBlogs() {
  try {
    const posts = await getLatestPosts(3);
    return posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      featuredImage: post.featuredImage,
    }));
  } catch (error) {
    // Database unreachable (e.g. during a build): the page falls back to its built-in cards.
    console.error("[home] could not load latest blogs:", error?.message || error);
    return [];
  }
}

export default async function Page() {
  return <HomePage latestBlogs={await loadLatestBlogs()} />;
}
