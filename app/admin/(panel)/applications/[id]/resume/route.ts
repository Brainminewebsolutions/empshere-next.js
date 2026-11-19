import { getCurrentStaff } from "@/lib/auth";
import { queryOne } from "@/lib/db";
import { isUuid } from "../../../../_actions/validation";

// Downloads the resume saved with a job application. Staff only.
export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentStaff())) return new Response("Unauthorized", { status: 401 });
  const { id } = await ctx.params;
  if (!isUuid(id)) return new Response("Not found", { status: 404 });

  const row = await queryOne<{ resume_name: string; resume_mime: string; resume_data: Buffer | null }>(
    "SELECT resume_name, resume_mime, resume_data FROM job_applications WHERE id = ?",
    [id],
  );
  if (!row?.resume_data) return new Response("Not found", { status: 404 });

  const filename = row.resume_name.replace(/[^\w.-]+/g, "_") || "resume";
  return new Response(new Uint8Array(row.resume_data), {
    headers: {
      "Content-Type": row.resume_mime || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
