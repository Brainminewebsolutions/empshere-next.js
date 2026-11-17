"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "../admin.module.css";

// One "Loading…" pill at the bottom of the admin, shown while anything is in
// flight. Two sources feed it:
//  - navigation: clicks on internal links and native form submits (search /
//    filter forms), cleared when the URL changes;
//  - actions: components call useLoadingToast(pending, "Deleting…").

type Entry = { id: number; label: string };

let entries: Entry[] = [];
let nextId = 1;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function add(label: string): number {
  const id = nextId++;
  entries = [...entries, { id, label }];
  emit();
  return id;
}

function remove(id: number) {
  if (!entries.some((e) => e.id === id)) return;
  entries = entries.filter((e) => e.id !== id);
  emit();
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const getEntries = () => entries;
// Same array every call - useSyncExternalStore compares snapshots by identity.
const NO_ENTRIES: Entry[] = [];
const getNoEntries = () => NO_ENTRIES;

// Show the toast while `pending` is true (e.g. a useTransition flag).
export function useLoadingToast(pending: boolean, label = "Loading…") {
  useEffect(() => {
    if (!pending) return;
    const id = add(label);
    return () => remove(id);
  }, [pending, label]);
}

const SHOW_DELAY_MS = 120; // skip the toast for near-instant loads
const MIN_VISIBLE_MS = 450; // once shown, don't flash
const NAV_TIMEOUT_MS = 20_000; // never stick forever if a navigation is dropped
const SPOKES = 8;

export default function LoadingToast() {
  const active = useSyncExternalStore(subscribe, getEntries, getNoEntries);
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const navId = useRef<number | null>(null);
  const navTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const shownAt = useRef(0);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("Loading…");

  const endNavigation = () => {
    clearTimeout(navTimer.current);
    if (navId.current !== null) remove(navId.current);
    navId.current = null;
  };

  // Start a navigation entry on internal link clicks and native form submits.
  useEffect(() => {
    const startNavigation = () => {
      if (navId.current !== null) return;
      navId.current = add("Loading…");
      navTimer.current = setTimeout(endNavigation, NAV_TIMEOUT_MS);
    };

    // Capture phase: next/link calls preventDefault() for client routing.
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if ((link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return; // external, mailto:, tel:
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      startNavigation();
    };

    // Bubble phase: by now React has run its handlers, so a submit that
    // wasn't prevented is a real page load (GET search/filter forms). Forms
    // that run server actions are prevented and report via useLoadingToast.
    const onSubmit = (e: SubmitEvent) => {
      if (!e.defaultPrevented) startNavigation();
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit);
    };
  }, []);

  // New URL rendered: navigation finished.
  useEffect(endNavigation, [pathname, search]);

  const isLoading = active.length > 0;
  const currentLabel = active.at(-1)?.label;
  // Kept after loading ends so the text doesn't vanish mid fade-out.
  if (currentLabel && currentLabel !== label) setLabel(currentLabel);

  useEffect(() => {
    if (isLoading) {
      if (visible) return;
      const t = setTimeout(() => {
        shownAt.current = Date.now();
        setVisible(true);
      }, SHOW_DELAY_MS);
      return () => clearTimeout(t);
    }
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), Math.max(0, MIN_VISIBLE_MS - (Date.now() - shownAt.current)));
    return () => clearTimeout(t);
  }, [isLoading, visible]);

  return (
    <div className={`${styles.toast} ${visible ? styles.toastVisible : ""}`} role="status" aria-live="polite" aria-hidden={!visible}>
      <span className={styles.spinner} aria-hidden="true">
        {Array.from({ length: SPOKES }, (_, i) => (
          <span
            key={i}
            style={{
              transform: `rotate(${(360 / SPOKES) * i}deg)`,
              animationDelay: `${-((SPOKES - i) / SPOKES) * 0.8}s`,
            }}
          />
        ))}
      </span>
      {label}
    </div>
  );
}
