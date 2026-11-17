"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteLead } from "../../_actions/leads";
import styles from "../../admin.module.css";
import { useLoadingToast } from "../LoadingToast";

export default function DeleteLeadButton({ id, name, redirectTo }: { id: string; name: string; redirectTo?: string }) {
  const [pending, startTransition] = useTransition();
  useLoadingToast(pending, "Deleting…");
  const router = useRouter();

  return (
    <button
      type="button"
      className={redirectTo ? styles.buttonDanger : `${styles.buttonLink} ${styles.buttonLinkDanger}`}
      disabled={pending}
      onClick={() => {
        if (!window.confirm(`Delete the lead from "${name || "this person"}" permanently? This cannot be undone.`)) return;
        startTransition(async () => {
          const result = await deleteLead(id);
          if (!result.ok) {
            window.alert(result.error ?? "Delete failed.");
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
