"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import styles from "../admin.module.css";

// Themed replacement for window.confirm / alert / prompt. Components call
//   const dialog = useDialog();
//   if (!(await dialog.confirm({ title, message, confirmLabel, danger: true }))) return;
//   await dialog.alert({ title, message });
//   const value = await dialog.prompt({ title, message, defaultValue }); // null if cancelled

type ConfirmOptions = { title?: string; message: React.ReactNode; confirmLabel?: string; cancelLabel?: string; danger?: boolean };
type AlertOptions = { title?: string; message: React.ReactNode; tone?: "error" | "success" | "info" };
type PromptOptions = { title?: string; message?: React.ReactNode; defaultValue?: string; placeholder?: string; confirmLabel?: string; inputType?: "text" | "url" | "password" };

type Api = {
  confirm: (o: ConfirmOptions) => Promise<boolean>;
  alert: (o: AlertOptions) => Promise<void>;
  prompt: (o: PromptOptions) => Promise<string | null>;
};

type Active = { id: number } & (
  | { kind: "confirm"; opts: ConfirmOptions; resolve: (v: boolean) => void }
  | { kind: "alert"; opts: AlertOptions; resolve: () => void }
  | { kind: "prompt"; opts: PromptOptions; resolve: (v: string | null) => void }
);

const DialogContext = createContext<Api | null>(null);

export function useDialog(): Api {
  const api = useContext(DialogContext);
  if (!api) throw new Error("useDialog must be used inside <DialogProvider>.");
  return api;
}

const ICONS = {
  danger: (
    <>
      <path d="M12 4.2 21 19.5H3z" />
      <path d="M12 10v4.2M12 16.9v.1" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 8v.1" />
    </>
  ),
  success: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.3 2.4 2.4 4.6-4.9" />
    </>
  ),
};

export default function DialogProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Active | null>(null);
  const queue = useRef<Active[]>([]);
  const nextId = useRef(1);
  const [value, setValue] = useState("");

  const enqueue = useCallback((item: Active) => {
    setActive((current) => {
      if (current) {
        queue.current.push(item);
        return current;
      }
      return item;
    });
  }, []);

  const api = useMemo<Api>(
    () => ({
      confirm: (opts) => new Promise((resolve) => enqueue({ id: nextId.current++, kind: "confirm", opts, resolve })),
      alert: (opts) => new Promise((resolve) => enqueue({ id: nextId.current++, kind: "alert", opts, resolve })),
      prompt: (opts) => new Promise((resolve) => enqueue({ id: nextId.current++, kind: "prompt", opts, resolve })),
    }),
    [enqueue],
  );

  const close = (result?: boolean | string | null) => {
    if (!active) return;
    if (active.kind === "confirm") active.resolve(result === true);
    else if (active.kind === "alert") active.resolve();
    else active.resolve(typeof result === "string" ? result : null);
    setActive(queue.current.shift() ?? null);
  };

  return (
    <DialogContext.Provider value={api}>
      {children}
      {active && <DialogView key={active.id} active={active} value={value} setValue={setValue} close={close} />}
    </DialogContext.Provider>
  );
}

function DialogView({
  active,
  value,
  setValue,
  close,
}: {
  active: Active;
  value: string;
  setValue: (v: string) => void;
  close: (result?: boolean | string | null) => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const { kind, opts } = active;
  const danger = kind === "confirm" && opts.danger;
  const tone = kind === "alert" ? (opts.tone ?? "info") : danger ? "danger" : "info";
  const icon = tone === "error" ? "danger" : tone;

  useEffect(() => {
    if (kind === "prompt") setValue((opts as PromptOptions).defaultValue ?? "");
    const previous = document.activeElement as HTMLElement | null;
    if (kind === "prompt") input.current?.focus();
    else panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    return () => previous?.focus?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancel = () => close(kind === "prompt" ? null : false);
  const confirmLabel =
    kind === "alert" ? "OK" : (opts as ConfirmOptions | PromptOptions).confirmLabel ?? (kind === "prompt" ? "OK" : danger ? "Delete" : "Confirm");
  const title =
    opts.title ?? (kind === "confirm" ? (danger ? "Are you sure?" : "Please confirm") : kind === "prompt" ? "Enter a value" : tone === "error" ? "Something went wrong" : "Notice");

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      cancel();
    }
    if (e.key !== "Tab") return;
    const items = panel.current?.querySelectorAll<HTMLElement>("button:not([disabled]), input");
    if (!items?.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const submit = () => (kind === "prompt" ? close(value) : close(true));

  return (
    <div className={styles.dialogScrim} onMouseDown={(e) => e.target === e.currentTarget && cancel()} onKeyDown={onKeyDown}>
      <div ref={panel} role={kind === "alert" ? "alertdialog" : "dialog"} aria-modal="true" aria-labelledby="admin-dialog-title" className={styles.dialog}>
        <div className={styles.dialogBody}>
          <span className={`${styles.dialogIcon} ${tone === "danger" || tone === "error" ? styles.dialogIconDanger : tone === "success" ? styles.dialogIconSuccess : ""}`} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {ICONS[icon as keyof typeof ICONS]}
            </svg>
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h2 id="admin-dialog-title" className={styles.dialogTitle}>{title}</h2>
            {opts.message && <div className={styles.dialogMessage}>{opts.message}</div>}
            {kind === "prompt" && (
              <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
                <input
                  ref={input}
                  className={styles.input}
                  style={{ marginTop: 12 }}
                  type={(opts as PromptOptions).inputType ?? "text"}
                  value={value}
                  placeholder={(opts as PromptOptions).placeholder}
                  onChange={(e) => setValue(e.target.value)}
                  aria-labelledby="admin-dialog-title"
                />
              </form>
            )}
          </div>
        </div>
        <div className={styles.dialogActions}>
          {kind !== "alert" && (
            <button type="button" className={styles.button} onClick={cancel}>
              {(opts as ConfirmOptions).cancelLabel ?? "Cancel"}
            </button>
          )}
          <button
            type="button"
            data-autofocus
            className={danger ? styles.buttonDanger : styles.buttonPrimary}
            onClick={submit}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
