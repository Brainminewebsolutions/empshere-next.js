"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { StaffRole } from "@/lib/auth";
import { deleteUser, resetUserPassword, updateUserRole } from "../../_actions/users";
import styles from "../../admin.module.css";
import { useLoadingToast } from "../LoadingToast";

export default function UserRowActions({ id, email, role }: { id: string; email: string; role: StaffRole }) {
  const [pending, startTransition] = useTransition();
  useLoadingToast(pending, "Updating…");
  const router = useRouter();

  const run = (action: () => Promise<{ ok: boolean; error?: string }>, done?: string) =>
    startTransition(async () => {
      const result = await action();
      if (!result.ok) window.alert(result.error ?? "Something went wrong.");
      else {
        if (done) window.alert(done);
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
        onChange={(e) => {
          const next = e.target.value as StaffRole;
          if (window.confirm(`Change ${email} to ${next}?`)) run(() => updateUserRole(id, next));
        }}
      >
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>
      <button
        type="button"
        className={styles.buttonLink}
        disabled={pending}
        onClick={() => {
          const password = window.prompt(`New password for ${email} (min 12 characters, mix of letters, numbers, symbols):`);
          if (password) run(() => resetUserPassword(id, password), "Password changed. Share it with them securely.");
        }}
      >
        Reset password
      </button>
      <button
        type="button"
        className={`${styles.buttonLink} ${styles.buttonLinkDanger}`}
        disabled={pending}
        onClick={() => {
          if (window.confirm(`Delete ${email}? They will be logged out immediately and can no longer sign in.`)) {
            run(() => deleteUser(id));
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}
