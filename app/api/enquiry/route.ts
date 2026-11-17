import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { count, exec } from "@/lib/db";

// Stores website form submissions in the "leads" table (Admin -> Leads).
// The forms still send their email as before; this is the database copy,
// so a failure here must never block the visitor.

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (body._honey) return NextResponse.json({ ok: true }); // bot trap field

  const name = clip(body.name, 150);
  const email = clip(body.email, 190);
  const phone = clip(body.phone, 40);
  if (!name || (!email && !phone)) return NextResponse.json({ ok: false, error: "Missing details." }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "";

  try {
    // Simple flood guard: max 10 submissions per IP per hour.
    if (ip && (await count("SELECT COUNT(*) AS n FROM leads WHERE ip = ? AND created_at >= ?", [ip, new Date(Date.now() - 3_600_000)])) >= 10) {
      return NextResponse.json({ ok: false, error: "Too many requests." }, { status: 429 });
    }
    await exec(
      `INSERT INTO leads (id, created_at, form_name, name, email, phone, message, page_title, page_url, referrer, device, ip)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        randomUUID(),
        new Date(),
        clip(body.form_name, 100) || "Website enquiry",
        name,
        email,
        phone,
        clip(body.message, 2000),
        clip(body.page_title, 200),
        clip(body.page_url, 500),
        clip(body.referrer, 500),
        (request.headers.get("user-agent") ?? "").slice(0, 255),
        ip.slice(0, 64),
      ],
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/enquiry]", err);
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
