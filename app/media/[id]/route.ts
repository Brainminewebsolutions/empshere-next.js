import { queryOne } from "@/lib/db";

// Serves images uploaded in the admin (stored in the "media" table).
export async function GET(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!/^\d{1,12}$/.test(id)) return new Response("Not found", { status: 404 });

  const etag = `"m${id}"`;
  // Uploaded files never change (every upload gets a new id), so cache hard.
  const headers = {
    "Cache-Control": "public, max-age=31536000, immutable",
    ETag: etag,
    "X-Content-Type-Options": "nosniff",
  };
  if (request.headers.get("if-none-match") === etag) return new Response(null, { status: 304, headers });

  try {
    const row = await queryOne<{ mime: string; data: Buffer }>("SELECT mime, data FROM media WHERE id = ?", [Number(id)]);
    if (!row) return new Response("Not found", { status: 404 });
    return new Response(new Uint8Array(row.data), { headers: { ...headers, "Content-Type": row.mime } });
  } catch (err) {
    console.error("[media]", err);
    return new Response("Unavailable", { status: 503 });
  }
}
