import styles from "../admin.module.css";

// Shared layout for record detail pages (job applications, leads): a summary
// banner with initials, name and badges, then grouped two-column tables.

export type DetailRow = [label: string, value: React.ReactNode];
export type DetailSection = { title: string; rows: DetailRow[] };

export function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

export function DetailSummary({
  name,
  subtitle,
  badges,
  meta,
}: {
  name: string;
  subtitle?: React.ReactNode;
  badges?: React.ReactNode;
  meta?: [label: string, value: React.ReactNode][];
}) {
  return (
    <div className={styles.detailSummary}>
      <span className={styles.detailAvatar} aria-hidden="true">{initialsOf(name)}</span>
      <div className={styles.detailSummaryText}>
        <div className={styles.detailName}>{name || "—"}</div>
        {subtitle && <div className={styles.detailSubtitle}>{subtitle}</div>}
        {badges && <div className={styles.row} style={{ gap: 8, marginTop: 8 }}>{badges}</div>}
      </div>
      {meta && meta.length > 0 && (
        <dl className={styles.detailMeta}>
          {meta.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

export function DetailTables({ sections }: { sections: DetailSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.title} className={styles.detailSection}>
          <h2 className={styles.detailSectionTitle}>{section.title}</h2>
          <div className={styles.detailTableWrap}>
            <table className={styles.detailTable}>
              <tbody>
                {section.rows.map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </>
  );
}
