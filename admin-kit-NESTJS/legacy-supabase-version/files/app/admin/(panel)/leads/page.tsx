import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createSessionClient } from "@/lib/supabase/server";
import Pagination, { PAGE_SIZE, pageParam } from "../Pagination";
import DeleteLeadButton from "./DeleteLeadButton";
import LeadsBulkForm from "./LeadsBulkForm";
import styles from "../../admin.module.css";

type Search = { q?: string; from?: string; to?: string; page?: string };

const TIMEZONE = "Europe/London";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// The Google Sheet every form submission is also appended to. Google decides
// who can open it (its Share settings), not this dashboard.
const LEADS_SHEET_URL =
  process.env.LEADS_SHEET_VIEW_URL ||
  "https://docs.google.com/spreadsheets/d/1Bh5p-VXkxJSlzs5r8DBjHEmLAMfBGmHhMYVlfKahxLU/edit";

// Midnight at the start of a UK calendar day ("2026-10-28"), as a UTC
// instant - so the date filter matches the dates shown in the table.
function londonMidnight(day: string): Date {
  const utcMidnight = new Date(`${day}T00:00:00Z`);
  const offset =
    new Intl.DateTimeFormat("en-GB", { timeZone: TIMEZONE, timeZoneName: "shortOffset" })
      .formatToParts(utcMidnight)
      .find((p) => p.type === "timeZoneName")
      ?.value.match(/GMT([+-]\d+)?/)?.[1] ?? "0";
  return new Date(utcMidnight.getTime() - Number(offset) * 3600_000);
}

function nextDay(day: string): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    timeZone: TIMEZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default async function LeadsPage({ searchParams }: { searchParams: Promise<Search> }) {
  await requireAdmin();
  const params = await searchParams;
  const q = (params.q ?? "").trim().slice(0, 100);
  const from = DATE_RE.test(params.from ?? "") ? params.from! : "";
  const to = DATE_RE.test(params.to ?? "") ? params.to! : "";
  const page = pageParam(params.page);

  const supabase = await createSessionClient();
  let query = supabase
    .from("leads")
    .select("id, created_at, form_name, name, email, phone, page_title, page_url, email_status", { count: "exact" })
    .order("created_at", { ascending: false })
    .order("id")
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (q) {
    // Characters that would break PostgREST's or=() syntax are dropped;
    // "*" is its wildcard.
    const term = q.replace(/[,()"\\*%]/g, " ").trim();
    if (term) query = query.or(`name.ilike.*${term}*,email.ilike.*${term}*,phone.ilike.*${term}*`);
  }
  if (from) query = query.gte("created_at", londonMidnight(from).toISOString());
  if (to) query = query.lt("created_at", londonMidnight(nextDay(to)).toISOString());

  const { data: leads, error, count } = await query;

  const filtered = Boolean(q || from || to);
  const pageHref = (p: number) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (from) sp.set("from", from);
    if (to) sp.set("to", to);
    if (p > 1) sp.set("page", String(p));
    const s = sp.toString();
    return `/admin/leads/${s ? `?${s}` : ""}`;
  };

  if (error?.code === "PGRST103" && page > 1) redirect(pageHref(1));

  const pagination = <Pagination page={page} total={count ?? 0} noun={["lead", "leads"]} hrefFor={pageHref} />;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Leads</h1>
        <a href={LEADS_SHEET_URL} target="_blank" rel="noopener noreferrer" className={styles.buttonPrimary}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="3.5" width="16" height="17" rx="2" />
            <path d="M4 9.5h16M4 15h16M10 9.5v11" />
          </svg>
          Open leads sheet
        </a>
      </div>
      <p className={styles.pageIntro}>Every enquiry from the website forms (Contact Us and Get a Quote), newest first.</p>

      <div className={styles.card} style={{ marginBottom: 16 }}>
        <form className={styles.filterGrid} action="/admin/leads/">
          <label className={styles.field}>
            <span className={styles.label}>Search</span>
            <input name="q" type="search" defaultValue={q} placeholder="Name, email or phone" className={styles.input} />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>From</span>
            <input type="date" name="from" defaultValue={from} max={to || undefined} className={styles.input} />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>To</span>
            <input type="date" name="to" defaultValue={to} min={from || undefined} className={styles.input} />
          </label>
          <div className={styles.row} style={{ flexWrap: "nowrap" }}>
            <button className={styles.buttonPrimary} type="submit">Filter</button>
            {filtered && (
              <Link href="/admin/leads/" className={styles.button}>
                Clear
              </Link>
            )}
          </div>
        </form>
      </div>

      {error && <p className={styles.error}>Could not load leads: {error.message}</p>}

      <LeadsBulkForm key={`${page}-${q}-${from}-${to}`} pagination={pagination}>
        <div className={styles.tableWrap}>
          <table className={`${styles.table} ${styles.tableStack}`}>
            <thead>
              <tr>
                <th className={styles.checkCell}>
                  <input type="checkbox" data-select-all aria-label="Select all leads on this page" />
                </th>
                <th>Name</th>
                <th>Contact</th>
                <th>Form</th>
                <th>Page</th>
                <th>Received</th>
                <th>Email</th>
                <th style={{ width: 120 }}>
                  <span className={styles.srOnly}>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {(leads ?? []).map((lead) => (
                <tr key={lead.id}>
                  <td className={styles.checkCell}>
                    <input type="checkbox" name="ids" value={lead.id} aria-label={`Select lead from ${lead.name || "unknown"}`} />
                  </td>
                  <td data-label="Name">
                    <Link href={`/admin/leads/${lead.id}/`} className={styles.cellTitle}>
                      {lead.name || "—"}
                    </Link>
                  </td>
                  <td data-label="Contact">
                    <div style={{ minWidth: 0 }}>
                      {lead.email && (
                        <div>
                          <a href={`mailto:${lead.email}`} className={styles.cellLink}>{lead.email}</a>
                        </div>
                      )}
                      {lead.phone && (
                        <div>
                          <a href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`} className={styles.cellLink}>{lead.phone}</a>
                        </div>
                      )}
                    </div>
                  </td>
                  <td data-label="Form">{lead.form_name.replace(/ Form$/, "")}</td>
                  <td data-label="Page">
                    {lead.page_url ? (
                      <a href={lead.page_url} target="_blank" rel="noopener" className={styles.cellLink}>
                        {lead.page_title || lead.page_url}
                      </a>
                    ) : (
                      lead.page_title || "—"
                    )}
                  </td>
                  <td data-label="Received" className={`${styles.muted} ${styles.nowrap}`}>
                    {formatDate(lead.created_at)}
                  </td>
                  <td data-label="Email">
                    <span className={`${styles.badge} ${lead.email_status === "Sent" ? styles.badgePublished : lead.email_status === "Failed" ? styles.badgeFailed : styles.badgeDraft}`}>
                      {lead.email_status || "—"}
                    </span>
                  </td>
                  <td>
                    <div className={styles.row} style={{ gap: 2, flexWrap: "nowrap" }}>
                      <Link href={`/admin/leads/${lead.id}/`} className={styles.buttonLink}>View</Link>
                      <DeleteLeadButton id={lead.id} name={lead.name} />
                    </div>
                  </td>
                </tr>
              ))}
              {leads && leads.length === 0 && (
                <tr>
                  <td colSpan={8} className={styles.emptyCell}>
                    {filtered ? "No leads match these filters." : "No leads yet. They appear here as soon as someone submits a form."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </LeadsBulkForm>
    </>
  );
}
