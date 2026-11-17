"use client";

import { useActionState } from "react";
import { login } from "../_actions/auth";
import styles from "../admin.module.css";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction}>
      {state?.error && (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      )}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">Username or email</label>
        <input
          id="email"
          name="email"
          type="text"
          autoCapitalize="none"
          spellCheck={false}
          autoComplete="username"
          required
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.buttonPrimary} disabled={pending} style={{ width: "100%", marginTop: 6 }}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
