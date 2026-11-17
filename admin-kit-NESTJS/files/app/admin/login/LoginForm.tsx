"use client";

import { useActionState, useState } from "react";
import PasswordInput from "../(panel)/PasswordInput";
import { login } from "../_actions/auth";
import styles from "../admin.module.css";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">Password</label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onValueChange={setPassword}
        />
      </div>
      <button type="submit" className={styles.buttonPrimary} disabled={pending} style={{ width: "100%", marginTop: 6 }}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
