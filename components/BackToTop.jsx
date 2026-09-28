"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

/* --------------------------------------------------------------------
   Floating "back to top" button (bottom-right, brand gold).

   Hidden while the page's first section (the hero) is on screen; fades in
   once the visitor has scrolled past it, and smoothly scrolls back up on
   click. Drop it into any page:

     import BackToTop from "@/components/BackToTop";
     ...
     <main>
       ...
       <BackToTop />
     </main>

   Props (all optional):
   - trigger: CSS selector for the element to scroll past before the button
     appears. Defaults to the first element inside <main> (the hero). Pages
     without a <main> should point it at their hero, e.g. the home page uses
     <BackToTop trigger=".home-page > .hero" />.
   - label:   accessible name, default "Back to top".
   -------------------------------------------------------------------- */

const subscribeNoop = () => () => {};

export default function BackToTop({
  trigger = "main > section:first-of-type, main > :first-child",
  label = "Back to top",
}) {
  const [visible, setVisible] = useState(false);
  // The button is portalled into <body>: a transform or animation on any
  // ancestor (e.g. a page-entrance animation on <main>) would otherwise make
  // `position: fixed` stick to that ancestor instead of the viewport.
  // `mounted` is false during server rendering and true in the browser.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );

  useEffect(() => {
    const getTarget = () => {
      let el = document.querySelector(trigger);
      // Skip non-rendered / 0-height elements like <script> or hidden elements
      if (!el || el.tagName === "SCRIPT" || el.offsetHeight === 0) {
        el =
          document.querySelector("main > section:first-of-type") ??
          document.querySelector("main > section") ??
          document.querySelector("section");
      }
      return el;
    };

    const target = getTarget();

    const update = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // Always hide if the user is at the top of the page
      if (scrollY < 80) {
        setVisible(false);
        return;
      }

      // Show once the trigger's bottom edge has scrolled above the viewport
      // or after 400px of scrolling down the page.
      let passed = false;
      if (target && target.getBoundingClientRect().height > 0) {
        passed = target.getBoundingClientRect().bottom < 0 || scrollY > 400;
      } else {
        passed = scrollY > 300;
      }
      setVisible(passed);
    };

    update();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    let unbindLenis;
    if (window.lenis) {
      unbindLenis = window.lenis.on("scroll", onScroll);
    }
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (typeof unbindLenis === "function") unbindLenis();
    };
  }, [trigger]);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.lenis && !reduceMotion) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }

    // Send keyboard / screen-reader focus back to the top of the page too,
    // so the next Tab press continues from the hero instead of the footer.
    const heading = document.querySelector("main h1") ?? document.querySelector("h1");
    if (heading) {
      if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  };

  if (!mounted) return null;

  return createPortal(
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      title={label}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`group fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black/15 bg-brand-gold text-white shadow-[0_4px_14px_rgba(0,0,0,0.22),0_8px_20px_-6px_rgba(239,176,0,0.5)] transition-[opacity,translate,scale,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:bg-brand-gold-dark hover:shadow-[0_6px_20px_rgba(0,0,0,0.3),0_12px_26px_-6px_rgba(239,176,0,0.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold-dark active:scale-95 md:right-8 md:bottom-[calc(2rem+env(safe-area-inset-bottom))] md:h-14 md:w-14 motion-reduce:transition-none ${
        visible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-90 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 transition-[translate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 md:h-7 md:w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>,
    document.body
  );
}
