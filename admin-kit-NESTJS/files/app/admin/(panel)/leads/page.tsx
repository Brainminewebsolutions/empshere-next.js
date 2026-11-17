import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { count, query, toIso } from "@/lib/db";
import Pagination, { PAGE_SIZE, pageParam } from "../Pagination";
import DeleteLeadButton from "./DeleteLeadButton";
import LeadsBulkForm from "./LeadsBulkForm";
import styles from "../../admin.module.css";

type Search = { q?: string; from?: string; to?: string; page?: string };

const TIMEZONE = "Asia/Kolkata";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Midnight at the start of an Indian calendar day ("2026-10-28") as a UTC
// instant (IST is a fixed UTC+5:30), so the filter matches the dates shown.
function istMidnight(day: string): Date {
  return new Date(new Date(`${day}T00:00:00Z`).getTime() - 5.5 * 3600_000);
}

function nextDay(day: string): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

type LeadRow = {
  id: string; created_at: string; form_name: string; name: string; email: string; phone: string; page_title: string; page_url: string;
};

const formatDate = (value: string) =>
  new Date(toIso(value) ?? "").toLocaleString("en-GB", {
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

  const where: string[] = [];
  const args: (string | Date)[] = [];
  if (q) {
    const like = `%${q.replace(/[\\%_]/g, (c) => "\\" + c)}%`;
    where.push("(name LIKE ? OR email LIKE ? OR phone LIKE ?)");
    args.push(like, like, like);
  }
  if (from) { where.push("created_at >= ?"); args.push(istMidnight(from)); }
  if (to) { where.push("created_at < ?"); args.push(istMidnight(nextDay(to))); }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  let leads: LeadRow[] = [];
  let total = 0;
  let error: { message: string } | null = null;
  try {
    [leads, total] = await Promise.all([
      query<LeadRow>(
        `SELECT id, created_at, form_name, name, email, phone, page_title, page_url FROM leads ${clause}
          ORDER BY created_at DESC, id ASC LIMIT ? OFFSET ?`,
        [...args, PAGE_SIZE, (page - 1) * PAGE_SIZE],
      ),
      count(`SELECT COUNT(*) AS n FROM leads ${clause}`, args),
    ]);
  } catch (err) {
    console.error("[admin leads]", err);
    error = { message: "database error - check that database/winsquare_admin.sql was run." };
  }

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

  const pagination = <Pagination page={page} total={total} noun={["lead", "leads"]} hrefFor={pageHref} />;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Leads</h1>
      </div>
      <p className={styles.pageIntro}>Every enquiry from the website forms (contact, kitchen, window and door enquiries), newest first.</p>

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
                <th style={{ width: 120 }}>
                  <span className={styles.srOnly}>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
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
                  <td data-label="Form">{lead.form_name}</td>
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
                  <td>
                    <div className={styles.row} style={{ gap: 2, flexWrap: "nowrap" }}>
                      <Link href={`/admin/leads/${lead.id}/`} className={styles.buttonLink}>View</Link>
                      <DeleteLeadButton id={lead.id} name={lead.name} />
                    </div>
                  </td>
                </tr>
              ))}
              {!error && leads.length === 0 && (
                <tr>
                  <td colSpan={7} className={styles.emptyCell}>
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
