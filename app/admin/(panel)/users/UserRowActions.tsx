"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { StaffRole } from "@/lib/auth";
import { deleteUser, resetUserPassword, updateUserRole } from "../../_actions/users";
import styles from "../../admin.module.css";
import { useDialog } from "../DialogProvider";
import { useLoadingToast } from "../LoadingToast";

export default function UserRowActions({ id, email, role }: { id: string; email: string; role: StaffRole }) {
  const [pending, startTransition] = useTransition();
  useLoadingToast(pending, "Updating…");
  const router = useRouter();
  const dialog = useDialog();

  const run = (action: () => Promise<{ ok: boolean; error?: string }>, done?: string) =>
    startTransition(async () => {
      const result = await action();
      if (!result.ok) await dialog.alert({ tone: "error", message: result.error ?? "Something went wrong." });
      else {
        if (done) await dialog.alert({ tone: "success", title: "Done", message: done });
        router.refresh();
      }
    });

  return (
    <div className={styles.row} style={{ gap: 4 }}>
      <select
        aria-label={`Role for ${email}`}
        className={styles.select}
        style={{ width: "auto", minHeight: 30 }}
        value={role}
        disabled={pending}
        onChange={async (e) => {
          const next = e.target.value as StaffRole;
          if (await dialog.confirm({ title: "Change role?", message: `Change ${email} to ${next}?`, confirmLabel: "Change role" })) run(() => updateUserRole(id, next));
        }}
      >
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>
      <button
        type="button"
        className={styles.buttonLink}
        disabled={pending}
        onClick={async () => {
          const password = await dialog.prompt({
            title: "Reset password",
            message: `New password for ${email} (min 12 characters, mix of letters, numbers, symbols).`,
            confirmLabel: "Reset password",
          });
          if (password) run(() => resetUserPassword(id, password), "Password changed. Share it with them securely.");
        }}
      >
        Reset password
      </button>
      <button
        type="button"
        className={`${styles.buttonLink} ${styles.buttonLinkDanger}`}
        disabled={pending}
        onClick={async () => {
          if (await dialog.confirm({ title: "Delete this user?", message: `${email} will be logged out immediately and can no longer sign in.`, danger: true })) {
            run(() => deleteUser(id));
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}
