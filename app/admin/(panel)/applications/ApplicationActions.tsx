"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteApplication, setApplicationStatus } from "../../_actions/applications";
import { APPLICATION_STATUSES, STATUS_LABELS, type ApplicationStatus } from "@/lib/applications-shared";
import styles from "../../admin.module.css";
import { useDialog } from "../DialogProvider";
import { useLoadingToast } from "../LoadingToast";

export function StatusSelect({ id, status }: { id: string; status: ApplicationStatus }) {
  const [pending, startTransition] = useTransition();
  useLoadingToast(pending, "Updating…");
  const router = useRouter();
  const dialog = useDialog();
  return (
    <select
      aria-label="Application status"
      className={styles.select}
      style={{ width: "auto", minWidth: 150 }}
      value={status}
      disabled={pending}
      onChange={(e) =>
        startTransition(async () => {
          const result = await setApplicationStatus(id, e.target.value as ApplicationStatus);
          if (!result.ok) await dialog.alert({ tone: "error", message: result.error ?? "Update failed." });
          router.refresh();
        })
      }
    >
      {APPLICATION_STATUSES.map((s) => (
        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
      ))}
    </select>
  );
}

export function DeleteApplicationButton({ id, name, redirectTo }: { id: string; name: string; redirectTo?: string }) {
  const [pending, startTransition] = useTransition();
  useLoadingToast(pending, "Deleting…");
  const router = useRouter();
  const dialog = useDialog();
  return (
    <button
      type="button"
      className={redirectTo ? styles.buttonDanger : `${styles.buttonLink} ${styles.buttonLinkDanger}`}
      disabled={pending}
      onClick={async () => {
        const ok = await dialog.confirm({
          title: "Delete this application?",
          message: `The application from "${name || "this candidate"}" and their resume will be deleted permanently. This cannot be undone.`,
          danger: true,
        });
        if (!ok) return;
        startTransition(async () => {
          const result = await deleteApplication(id);
          if (!result.ok) {
            await dialog.alert({ tone: "error", title: "Delete failed", message: result.error ?? "Please try again." });
            return;
          }
          if (redirectTo) router.push(redirectTo);
          else router.refresh();
        });
      }}
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
