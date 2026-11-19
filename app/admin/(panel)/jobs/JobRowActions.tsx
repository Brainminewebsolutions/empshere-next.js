"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteJob, setJobStatus } from "../../_actions/jobs";
import type { JobStatus } from "@/lib/jobs-shared";
import styles from "../../admin.module.css";
import { useDialog } from "../DialogProvider";
import { useLoadingToast } from "../LoadingToast";

export default function JobRowActions({ id, title, status }: { id: string; title: string; status: JobStatus }) {
  const [pending, startTransition] = useTransition();
  useLoadingToast(pending, "Updating…");
  const router = useRouter();
  const dialog = useDialog();

  return (
    <div className={styles.row} style={{ gap: 2, flexWrap: "nowrap" }}>
      <Link href={`/admin/jobs/${id}/`} className={styles.buttonLink}>Edit</Link>
      <button
        type="button"
        className={styles.buttonLink}
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const result = await setJobStatus(id, status === "open" ? "closed" : "open");
            if (!result.ok) await dialog.alert({ tone: "error", message: result.error ?? "Update failed." });
            else router.refresh();
          })
        }
      >
        {status === "open" ? "Close" : "Reopen"}
      </button>
      <button
        type="button"
        className={`${styles.buttonLink} ${styles.buttonLinkDanger}`}
        disabled={pending}
        onClick={async () => {
          const ok = await dialog.confirm({
            title: "Delete this job?",
            message: `"${title}" will be removed from the careers page permanently. This cannot be undone.`,
            danger: true,
          });
          if (!ok) return;
          startTransition(async () => {
            const result = await deleteJob(id);
            if (!result.ok) await dialog.alert({ tone: "error", title: "Delete failed", message: result.error ?? "Please try again." });
            else router.refresh();
          });
        }}
      >
        Delete
      </button>
    </div>
  );
}
