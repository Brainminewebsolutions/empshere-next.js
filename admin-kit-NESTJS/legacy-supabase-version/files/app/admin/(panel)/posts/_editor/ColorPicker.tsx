"use client";

import { useEffect, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import styles from "../../../admin.module.css";

// Brand colours first, then a general palette.
const SWATCHES: [string, string][] = [
  ["#1c1e36", "Navy"],
  ["#847b73", "Taupe"],
  ["#635548", "Brown"],
  ["#000000", "Black"],
  ["#555555", "Dark grey"],
  ["#999999", "Grey"],
  ["#c42b2b", "Red"],
  ["#e8590c", "Orange"],
  ["#f2b705", "Yellow"],
  ["#157f3c", "Green"],
  ["#0f8b8d", "Teal"],
  ["#2a55b8", "Blue"],
  ["#5b3cc4", "Purple"],
  ["#c2255c", "Pink"],
];

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

// "rgb(28, 30, 54)" or "#abc" -> "#1c1e36" so <input type="color"> accepts it.
function toHex(color: string | undefined): string {
  if (!color) return "#000000";
  if (HEX.test(color)) {
    return color.length === 4 ? `#${[...color.slice(1)].map((c) => c + c).join("")}`.toLowerCase() : color.toLowerCase();
  }
  const m = color.match(/\d+/g);
  if (!m || m.length < 3) return "#000000";
  return `#${m.slice(0, 3).map((n) => Math.min(255, Number(n)).toString(16).padStart(2, "0")).join("")}`;
}

export default function ColorPicker({ editor, disabled }: { editor: Editor; disabled: boolean }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const current = editor.getAttributes("textStyle").color as string | undefined;
  const [hex, setHex] = useState("");

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const apply = (color: string) => editor.chain().focus().setColor(color).run();

  const applyHex = () => {
    const value = hex.trim().startsWith("#") ? hex.trim() : `#${hex.trim()}`;
    if (!HEX.test(value)) return;
    apply(value);
    setOpen(false);
  };

  return (
    <div ref={wrap} className={styles.colorWrap}>
      <button
        type="button"
        title="Text colour"
        aria-label="Text colour"
        aria-haspopup="true"
        aria-expanded={open}
        disabled={disabled}
        className={`${styles.toolButton} ${open || current ? styles.toolButtonActive : ""}`}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          setHex(current ? toHex(current) : "");
          setOpen(!open);
        }}
      >
        <span className={styles.colorA}>
          A
          <span className={styles.colorBar} style={{ background: current ?? "var(--ink)" }} />
        </span>
      </button>

      {open && (
        <div className={styles.colorPop} role="dialog" aria-label="Text colour">
          <div className={styles.colorGrid}>
            {SWATCHES.map(([value, name]) => (
              <button
                key={value}
                type="button"
                title={`${name} ${value}`}
                aria-label={name}
                className={`${styles.colorSwatch} ${current && toHex(current) === value ? styles.colorSwatchActive : ""}`}
                style={{ background: value }}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  apply(value);
                  setOpen(false);
                }}
              />
            ))}
          </div>

          <div className={styles.colorCustom}>
            <label className={styles.colorNative} title="Pick any colour">
              <input
                type="color"
                value={toHex(hex || current)}
                aria-label="Pick any colour"
                onChange={(e) => {
                  setHex(e.target.value);
                  apply(e.target.value);
                }}
              />
            </label>
            <input
              className={styles.input}
              value={hex}
              placeholder="#1c1e36"
              maxLength={7}
              spellCheck={false}
              aria-label="Hex colour code"
              onChange={(e) => setHex(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyHex();
                }
              }}
            />
            <button type="button" className={styles.button} onClick={applyHex} disabled={!HEX.test(hex.trim().startsWith("#") ? hex.trim() : `#${hex.trim()}`)}>
              Apply
            </button>
          </div>

          <button
            type="button"
            className={styles.colorReset}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().unsetColor().run();
              setOpen(false);
            }}
          >
            Remove colour
          </button>
        </div>
      )}
    </div>
  );
}
