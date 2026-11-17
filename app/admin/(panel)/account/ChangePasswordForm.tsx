"use client";

import { useActionState, useEffect, useRef } from "react";
import { changeOwnPassword } from "../../_actions/auth";
import { MIN_PASSWORD_LENGTH } from "../../_actions/validation";
import styles from "../../admin.module.css";
import { useLoadingToast } from "../LoadingToast";

export default function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changeOwnPassword, undefined);
  useLoadingToast(pending, "Saving…");
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) form.current?.reset();
  }, [state]);

  return (
    <form ref={form} action={formAction}>
      {state?.error && <p className={styles.error}>{state.error}</p>}
      {state?.success && <p className={styles.success}>{state.success}</p>}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="current">Current password</label>
        <input id="current" name="current" type="password" required autoComplete="current-password" className={styles.input} />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          New password <span className={styles.hint}>min {MIN_PASSWORD_LENGTH} chars, 3 of: a-z, A-Z, 0-9, symbol</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          autoComplete="new-password"
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="confirm">Confirm new password</label>
        <input id="confirm" name="confirm" type="password" required autoComplete="new-password" className={styles.input} />
      </div>
      <button type="submit" className={styles.buttonPrimary} disabled={pending}>
        {pending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
