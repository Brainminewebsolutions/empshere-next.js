"use client";

import { useEffect, useState } from "react";
import styles from "../admin.module.css";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> & {
  value: string;
  onValueChange: (value: string) => void;
  copyable?: boolean;
};

// Password box with a show/hide eye and (optionally) a copy button.
export default function PasswordInput({ value, onValueChange, copyable = false, className, ...rest }: Props) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard blocked (non-HTTPS or permission) - nothing else to do.
    }
  };

  return (
    <div className={`${styles.pwWrap} ${copyable ? styles.pwWrapTwo : ""}`}>
      <input
        {...rest}
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={`${styles.input} ${className ?? ""}`}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
      />
      <div className={styles.pwActions}>
        {copyable && (
          <button
            type="button"
            className={`${styles.pwButton} ${copied ? styles.pwButtonDone : ""}`}
            onClick={copy}
            disabled={!value}
            title={copied ? "Copied" : "Copy password"}
            aria-label={copied ? "Copied" : "Copy password"}
          >
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
                <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
              </svg>
            )}
          </button>
        )}
        <button
          type="button"
          className={styles.pwButton}
          onClick={() => setVisible(!visible)}
          title={visible ? "Hide password" : "Show password"}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
            <circle cx="12" cy="12" r="3" />
            {visible && <path d="M4 4l16 16" />}
          </svg>
        </button>
      </div>
    </div>
  );
}
