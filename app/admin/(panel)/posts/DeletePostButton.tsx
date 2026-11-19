"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "../../_actions/posts";
import styles from "../../admin.module.css";
import { useDialog } from "../DialogProvider";
import { useLoadingToast } from "../LoadingToast";

export default function DeletePostButton({ id, title, redirectTo }: { id: string; title: string; redirectTo?: string }) {
  const [pending, startTransition] = useTransition();
  useLoadingToast(pending, "Deleting…");
  const router = useRouter();
  const dialog = useDialog();

  return (
    <button
      type="button"
      className={`${styles.buttonLink} ${styles.buttonLinkDanger}`}
      disabled={pending}
      onClick={async () => {
        const ok = await dialog.confirm({
          title: "Delete this post?",
          message: `"${title}" will be deleted permanently. This cannot be undone.`,
          danger: true,
        });
        if (!ok) return;
        startTransition(async () => {
          const result = await deletePost(id);
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
