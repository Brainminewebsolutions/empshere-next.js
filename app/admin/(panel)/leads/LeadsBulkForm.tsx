"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteLeads } from "../../_actions/leads";
import styles from "../../admin.module.css";
import { useDialog } from "../DialogProvider";
import { useLoadingToast } from "../LoadingToast";

// Wraps the leads table in one form so the row checkboxes (name="ids") and
// the header "select all" checkbox (data-select-all) are plain server-rendered
// inputs - this component only reads them.
export default function LeadsBulkForm({ pagination, children }: { pagination: React.ReactNode; children: React.ReactNode }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selected, setSelected] = useState(0);
  const [action, setAction] = useState("");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  useLoadingToast(pending, "Deleting…");
  const router = useRouter();
  const dialog = useDialog();

  const rowBoxes = () =>
    Array.from(formRef.current?.querySelectorAll<HTMLInputElement>('input[name="ids"]') ?? []);

  const sync = () => {
    const boxes = rowBoxes();
    const checked = boxes.filter((b) => b.checked).length;
    const all = formRef.current?.querySelector<HTMLInputElement>("input[data-select-all]");
    if (all) {
      all.checked = boxes.length > 0 && checked === boxes.length;
      all.indeterminate = checked > 0 && checked < boxes.length;
    }
    setSelected(checked);
  };

  return (
    <form
      ref={formRef}
      onChange={(e) => {
        const target = e.target;
        if (!(target instanceof HTMLInputElement)) return;
        if (target.hasAttribute("data-select-all")) {
          for (const box of rowBoxes()) box.checked = target.checked;
        }
        if (target.type === "checkbox") {
          setMessage("");
          sync();
        }
      }}
      onSubmit={async (e) => {
        e.preventDefault();
        const ids = rowBoxes()
          .filter((b) => b.checked)
          .map((b) => b.value);
        if (action !== "delete") return setMessage("Choose a bulk action first.");
        if (ids.length === 0) return setMessage("Select at least one lead.");
        const ok = await dialog.confirm({
          title: `Delete ${ids.length} ${ids.length === 1 ? "lead" : "leads"}?`,
          message: "They will be deleted permanently. This cannot be undone.",
          danger: true,
        });
        if (!ok) return;

        startTransition(async () => {
          const result = await deleteLeads(ids);
          if (!result.ok) {
            setMessage(result.error ?? "Delete failed.");
            return;
          }
          formRef.current?.reset();
          setAction("");
          setSelected(0);
          setMessage(`Deleted ${ids.length} ${ids.length === 1 ? "lead" : "leads"}.`);
          router.refresh();
        });
      }}
    >
      <div className={styles.listToolbar} style={{ alignItems: "center" }}>
        <div className={styles.row} style={{ gap: 8 }}>
          <select
            aria-label="Bulk actions"
            className={styles.select}
            style={{ width: 170 }}
            value={action}
            onChange={(e) => setAction(e.target.value)}
          >
            <option value="">Bulk actions</option>
            <option value="delete">Delete</option>
          </select>
          <button type="submit" className={styles.button} disabled={pending}>
            {pending ? "Deleting…" : "Apply"}
          </button>
          {selected > 0 && <span className={`${styles.muted} ${styles.small}`}>{selected} selected</span>}
          {message && <span className={styles.small} role="status">{message}</span>}
        </div>
        {pagination}
      </div>

      {children}

      <div style={{ marginTop: 12 }}>{pagination}</div>
    </form>
  );
}
