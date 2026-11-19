"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { changeOwnPassword } from "../../_actions/auth";
import { MIN_PASSWORD_LENGTH } from "../../_actions/validation";
import styles from "../../admin.module.css";
import { useLoadingToast } from "../LoadingToast";
import PasswordInput from "../PasswordInput";

export default function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changeOwnPassword, undefined);
  useLoadingToast(pending, "Saving…");
  const form = useRef<HTMLFormElement>(null);
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [lastState, setLastState] = useState(state);

  // Clear the boxes after a successful change (set during render, not in an
  // effect, so it doesn't trigger a second pass).
  if (state !== lastState) {
    setLastState(state);
    if (state?.success) {
      setCurrent("");
      setPassword("");
      setConfirm("");
    }
  }

  useEffect(() => {
    if (state?.success) form.current?.reset();
  }, [state]);

  return (
    <form ref={form} action={formAction}>
      {state?.error && <p className={styles.error}>{state.error}</p>}
      {state?.success && <p className={styles.success}>{state.success}</p>}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="current">Current password</label>
        <PasswordInput id="current" name="current" required autoComplete="current-password" value={current} onValueChange={setCurrent} />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          New password <span className={styles.hint}>min {MIN_PASSWORD_LENGTH} chars, 3 of: a-z, A-Z, 0-9, symbol</span>
        </label>
        <PasswordInput
          id="password"
          name="password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          autoComplete="new-password"
          value={password}
          onValueChange={setPassword}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="confirm">Confirm new password</label>
        <PasswordInput id="confirm" name="confirm" required autoComplete="new-password" value={confirm} onValueChange={setConfirm} />
      </div>
      <button type="submit" className={styles.buttonPrimary} disabled={pending}>
        {pending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
