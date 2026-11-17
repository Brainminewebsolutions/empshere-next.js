import Link from "next/link";
import styles from "../admin.module.css";

export const PAGE_SIZE = 10;

// "?page=3" -> 3. Anything missing or invalid is page 1.
export function pageParam(value: string | undefined): number {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : 1;
}

// WordPress-style "123 items  « ‹ 2 of 13 › »" with a few page numbers.
// hrefFor builds the link for a page, keeping the list's other filters.
export default function Pagination({
  page,
  total,
  noun,
  hrefFor,
}: {
  page: number;
  total: number;
  noun: [string, string];
  hrefFor: (page: number) => string;
}) {
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const label = `${total} ${total === 1 ? noun[0] : noun[1]}`;
  if (totalPages <= 1) return <div className={`${styles.pagination} ${styles.muted}`}>{label}</div>;

  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => start + i);

  const step = (target: number, text: string, title: string) =>
    target < 1 || target > totalPages || target === page ? (
      <span className={`${styles.pageButton} ${styles.pageButtonDisabled}`} aria-hidden="true">
        {text}
      </span>
    ) : (
      <Link href={hrefFor(target)} className={styles.pageButton} title={title} aria-label={title}>
        {text}
      </Link>
    );

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <span className={styles.muted}>{label}</span>
      {step(1, "«", "First page")}
      {step(page - 1, "‹", "Previous page")}
      {pages.map((p) =>
        p === page ? (
          <span key={p} className={`${styles.pageButton} ${styles.pageButtonActive}`} aria-current="page">
            {p}
          </span>
        ) : (
          <Link key={p} href={hrefFor(p)} className={`${styles.pageButton} ${styles.pageNum}`}>
            {p}
          </Link>
        ),
      )}
      <span className={styles.muted}>of {totalPages}</span>
      {step(page + 1, "›", "Next page")}
      {step(totalPages, "»", "Last page")}
    </nav>
  );
}
