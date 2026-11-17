"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createUser } from "../../_actions/users";
import { MIN_PASSWORD_LENGTH } from "../../_actions/validation";
import styles from "../../admin.module.css";
import { useLoadingToast } from "../LoadingToast";
import PasswordInput from "../PasswordInput";

export default function CreateUserForm() {
  const [state, formAction, pending] = useActionState(createUser, undefined);
  useLoadingToast(pending, "Creating user…");
  const form = useRef<HTMLFormElement>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [lastState, setLastState] = useState(state);

  // Clear the password boxes after a successful create (set during render,
  // not in an effect, so it doesn't trigger a second pass).
  if (state !== lastState) {
    setLastState(state);
    if (state?.success) {
      setPassword("");
      setConfirm("");
    }
  }

  useEffect(() => {
    if (state?.success) form.current?.reset();
  }, [state]);

  const mismatch = confirm.length > 0 && confirm !== password;
  const matches = confirm.length > 0 && confirm === password && password.length >= MIN_PASSWORD_LENGTH;

  return (
    <form
      ref={form}
      action={formAction}
      onSubmit={(e) => {
        if (password !== confirm) {
          e.preventDefault();
          document.getElementById("new_password_confirm")?.focus();
        }
      }}
    >
      {state?.error && <p className={styles.error}>{state.error}</p>}
      {state?.success && <p className={styles.success}>{state.success}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="full_name">Full name</label>
          <input id="full_name" name="full_name" className={styles.input} autoComplete="off" />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="new_email">Username or email</label>
          <input id="new_email" name="email" type="text" required className={styles.input} autoComplete="off" />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="role">Role</label>
          <select id="role" name="role" className={styles.select} defaultValue="editor">
            <option value="editor">Editor (posts only)</option>
            <option value="admin">Admin (everything)</option>
          </select>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="new_password">
            Password <span className={styles.hint}>min {MIN_PASSWORD_LENGTH} chars</span>
          </label>
          <PasswordInput
            id="new_password"
            name="password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            autoComplete="new-password"
            value={password}
            onValueChange={setPassword}
            copyable
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="new_password_confirm">Retype password</label>
          <PasswordInput
            id="new_password_confirm"
            name="confirm"
            required
            autoComplete="new-password"
            value={confirm}
            onValueChange={setConfirm}
            aria-invalid={mismatch}
            aria-describedby="pw_match"
            className={mismatch ? styles.inputInvalid : matches ? styles.inputValid : ""}
          />
          <span id="pw_match" aria-live="polite" className={`${styles.pwMatch} ${mismatch ? styles.pwMatchBad : matches ? styles.pwMatchGood : ""}`}>
            {mismatch ? "Passwords do not match" : matches ? "Passwords match" : " "}
          </span>
        </div>
      </div>
      <button type="submit" className={styles.buttonPrimary} disabled={pending || mismatch} style={{ marginTop: 4 }}>
        {pending ? "Creating…" : "Create user"}
      </button>
    </form>
  );
}
