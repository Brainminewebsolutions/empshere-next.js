"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "../../_actions/posts";
import styles from "../../admin.module.css";
import { useLoadingToast } from "../LoadingToast";

export default function DeletePostButton({ id, title, redirectTo }: { id: string; title: string; redirectTo?: string }) {
  const [pending, startTransition] = useTransition();
  useLoadingToast(pending, "Deleting…");
  const router = useRouter();

  return (
    <button
      type="button"
      className={`${styles.buttonLink} ${styles.buttonLinkDanger}`}
      disabled={pending}
      onClick={() => {
        if (!window.confirm(`Delete "${title}" permanently? This cannot be undone.`)) return;
        startTransition(async () => {
          const result = await deletePost(id);
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
