"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import LeadForm, { PRODUCTS, productForPath } from "@/components/LeadForm";
import { captureUtm } from "@/lib/utm";

// Same typeface as the site's gold "REQUEST DEMO →" buttons.
const inter = Inter({ subsets: ["latin"], weight: ["600"] });

/* --------------------------------------------------------------------
   "Request Demo" popup + the vertical "Request Demo" tab on the right
   edge of every page. Mounted once in app/layout.js.

   Any element with a `data-request-demo` attribute opens the popup, so
   server-rendered pages need no client code:

     <a href="/contact-us/" data-request-demo>Book a Demo</a>

   The href stays as the fallback before JavaScript loads. Give the
   attribute a value to preselect a product, e.g.
   data-request-demo="emMeal Canteen Management System"; otherwise the
   product is picked from the current page.
   -------------------------------------------------------------------- */

const OPEN_MS = 450;
const CLOSE_MS = 240;
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])';

export default function DemoModal() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const panelRef = useRef(null);
  const returnFocusRef = useRef(null);
  const closeTimer = useRef(null);

  const open = useCallback((requested, trigger) => {
    clearTimeout(closeTimer.current);
    returnFocusRef.current = trigger || document.activeElement;
    setProduct(requested || null);
    setMounted(true);
    // Two frames: let the closed state paint, then transition to open.
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setMounted(false);
      returnFocusRef.current?.focus?.({ preventScroll: true });
    }, CLOSE_MS);
  }, []);

  // Delegated listener: any [data-request-demo] element opens the popup.
  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const trigger = event.target.closest?.("[data-request-demo]");
      if (!trigger) return;
      // Capture phase + stopPropagation: a Next.js <Link> trigger would
      // otherwise navigate to its href before this listener runs.
      event.preventDefault();
      event.stopPropagation();
      const requested = trigger.getAttribute("data-request-demo");
      open(PRODUCTS.includes(requested) ? requested : null, trigger);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [open]);

  // Save UTM tags / click IDs from the URL for the lead form (lib/utm.js).
  useEffect(() => {
    captureUtm();
  }, [pathname]);

  // Close when navigating to another page.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setVisible(false);
    setMounted(false);
  }

  // Lock page scroll (native + Lenis) while open; keep layout from shifting.
  useEffect(() => {
    if (!mounted) return undefined;
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    const prev = { overflow: root.style.overflow, paddingRight: document.body.style.paddingRight };
    root.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    window.lenis?.stop();
    return () => {
      root.style.overflow = prev.overflow;
      document.body.style.paddingRight = prev.paddingRight;
      window.lenis?.start();
    };
  }, [mounted]);

  // Escape closes; Tab stays inside the dialog.
  useEffect(() => {
    if (!mounted) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mounted, close]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const ease = visible ? "ease-[cubic-bezier(0.16,1,0.3,1)]" : "ease-[cubic-bezier(0.4,0,1,1)]";
  const duration = { transitionDuration: `${visible ? OPEN_MS : CLOSE_MS}ms` };

  return (
    <>
      {/* Vertical "Request Demo" tab, right edge of every page */}
      <button
        type="button"
        data-request-demo=""
        aria-haspopup="dialog"
        className={`${inter.className} group fixed right-0 top-1/2 z-[60] flex -translate-y-1/2 items-center rounded-l-[9px] bg-[#EFB000] px-2 py-3.5 text-[13px] font-semibold uppercase leading-none tracking-[0.02em] text-[#1f1f1f] shadow-[0_8px_18px_-6px_rgba(239,176,0,0.55)] transition-[padding,background-color,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] [writing-mode:vertical-rl] hover:bg-[#d99e00] hover:pr-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#efb000]/50 max-sm:px-1.5 max-sm:py-3 max-sm:text-[11px] ${
          mounted ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {/* Reads bottom-to-top; the arrow follows the text like the gold "REQUEST DEMO →" buttons. */}
        <span className="inline-flex rotate-180 items-center gap-2">
          Request Demo
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5 rotate-90" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10h12M11 5l5 5-5 5" />
          </svg>
        </span>
      </button>

      {mounted &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 min-[400px]:p-4 sm:p-6" role="presentation">
            {/* Backdrop: dims and lightly blurs the page */}
            <div
              aria-hidden="true"
              onClick={close}
              style={duration}
              className={`absolute inset-0 bg-[#141414]/45 backdrop-blur-[4px] transition-opacity motion-reduce:transition-none ${ease} ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            />

            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="demo-modal-title"
              data-lenis-prevent
              style={duration}
              className={`relative flex max-h-[calc(100dvh-1.5rem)] min-[400px]:max-h-[calc(100dvh-2rem)] w-full max-w-[400px] flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.45),0_0_0_1px_rgba(0,0,0,0.04)] transition-[opacity,translate,scale] will-change-transform motion-reduce:transition-none sm:max-h-[calc(100dvh-3rem)] sm:max-w-[520px] sm:rounded-[20px] ${ease} ${
                visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.96] opacity-0"
              }`}
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-1.5 bg-[#EFB000]" />

              <header className="flex shrink-0 items-start justify-between gap-3 border-b border-black/[0.06] px-4 pb-2.5 pt-4 sm:gap-4 sm:px-6 sm:pb-3.5 sm:pt-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#b07d00] sm:text-[11px]">Request a demo</p>
                  <h2 id="demo-modal-title" className="mt-0.5 text-[17px] font-semibold sm:mt-1 sm:text-xl leading-tight tracking-[-0.01em] text-[#1f1f1f]">
                    See emSphere in action
                  </h2>
                  <p className="mt-0.5 text-[12px] leading-[17px] text-black/60 sm:mt-1 sm:text-[13px] sm:leading-[19px]">
                    Share a few details and we&apos;ll schedule your walkthrough.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="-mr-1.5 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black/50 transition-colors hover:bg-black/[0.05] hover:text-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#efb000]/40"
                >
                  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                    <path d="M5 5l10 10M15 5L5 15" />
                  </svg>
                </button>
              </header>

              <div className="overflow-y-auto overscroll-contain px-4 pb-4 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
                <LeadForm
                  product={product || productForPath(pathname)}
                  title={null}
                  framed={false}
                  compact
                  autoFocus
                  stickySubmit
                  submitLabel="Request Demo"
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
