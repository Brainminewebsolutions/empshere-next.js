import { NextResponse, type NextRequest } from "next/server";
import { getPublishedPostsPage } from "@/lib/posts";

// Public JSON feed of published posts, used by the home page and the
// "Load more" button on /blogs. Reads the same cached query as the pages.
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const page = Math.max(1, Math.min(1000, Number(sp.get("page")) || 1));
  const per = Math.max(1, Math.min(24, Number(sp.get("per")) || 9));
  try {
    const { posts, total } = await getPublishedPostsPage(page, per);
    return NextResponse.json(
      { posts, total, hasMore: page * per < total },
      { headers: { "Cache-Control": "no-cache" } },
    );
  } catch (err) {
    console.error("[api/posts]", err);
    return NextResponse.json({ error: "Could not load posts." }, { status: 503 });
  }
}
