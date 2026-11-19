"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteLead } from "../../_actions/leads";
import styles from "../../admin.module.css";
import { useDialog } from "../DialogProvider";
import { useLoadingToast } from "../LoadingToast";

export default function DeleteLeadButton({ id, name, redirectTo }: { id: string; name: string; redirectTo?: string }) {
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
          title: "Delete this lead?",
          message: `The lead from "${name || "this person"}" will be deleted permanently. This cannot be undone.`,
          danger: true,
        });
        if (!ok) return;
        startTransition(async () => {
          const result = await deleteLead(id);
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
