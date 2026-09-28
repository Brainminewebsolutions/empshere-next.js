"use client";

import { useEffect, useRef, useState } from "react";

/* --------------------------------------------------------------------
   Pinned "scroll the cards, not the page" section (desktop only).

   When the section reaches the top of the viewport it pins under the
   site header: the left column (`intro`) stays still while page scroll
   moves the right column's cards up inside a fixed window. Once the last
   card is fully in view the section un-pins and the page scrolls on.

   How: the section is given extra height equal to how far the cards need
   to travel; an inner `position: sticky` frame holds the layout in place
   and the card list is translated by the scroll progress. Below `lg`, on
   short screens, or before hydration it is a normal two-column/stacked
   layout, so nothing is ever hidden.
   -------------------------------------------------------------------- */

const MIN_VIEWPORT_HEIGHT = 560;
const FRAME_PADDING = 40; // space above/below the card window inside the pinned frame

export default function PinnedScrollSection({ intro, children, className = "", listClassName = "gap-4", ariaLabelledby }) {
  const sectionRef = useRef(null);
  const windowRef = useRef(null);
  const listRef = useRef(null);
  const [layout, setLayout] = useState(null); // { headerH, frameH, travel } when pinned

  // Measure and decide whether to pin.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");

    const measure = () => {
      const list = listRef.current;
      if (!list || !sectionRef.current) return;
      const header = document.querySelector("body > header, header.sticky");
      const headerH = header ? header.getBoundingClientRect().height : 0;
      const frameH = window.innerHeight - headerH;
      if (!desktop.matches || window.innerHeight < MIN_VIEWPORT_HEIGHT) {
        setLayout(null);
        return;
      }
      const windowH = frameH - FRAME_PADDING * 2;
      const travel = Math.max(0, list.scrollHeight - windowH);
      setLayout(travel > 0 ? { headerH, frameH, windowH, travel } : null);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    if (listRef.current) resizeObserver.observe(listRef.current);
    window.addEventListener("resize", measure);
    desktop.addEventListener("change", measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      desktop.removeEventListener("change", measure);
    };
  }, []);

  // Scroll-linked translation of the card list.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    if (!layout) {
      list.style.transform = "";
      return undefined;
    }

    // One read + one transform write per scroll event — cheap enough to run
    // directly, so the cards stay locked to the scroll position.
    const update = () => {
      if (!sectionRef.current || !list) return;
      const top = sectionRef.current.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, (layout.headerH - top) / layout.travel));
      list.style.transform = `translate3d(0, ${-progress * layout.travel}px, 0)`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    let unbindLenis;
    if (window.lenis) {
      unbindLenis = window.lenis.on("scroll", update);
    }
    return () => {
      window.removeEventListener("scroll", update);
      if (typeof unbindLenis === "function") unbindLenis();
    };
  }, [layout]);

  const pinned = Boolean(layout);

  return (
    <section
      ref={sectionRef}
      aria-labelledby={ariaLabelledby}
      className={`relative ${pinned ? "" : "py-12 md:py-20"} ${className}`}
      style={pinned ? { height: layout.frameH + layout.travel } : undefined}
    >
      <div
        className={pinned ? "sticky flex items-center" : ""}
        style={pinned ? { top: layout.headerH, height: layout.frameH } : undefined}
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 md:px-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <div className={pinned ? "" : "lg:sticky lg:top-28 lg:self-start"}>{intro}</div>

          <div
            ref={windowRef}
            className={pinned ? "relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_4%,#000_96%,transparent)]" : ""}
            style={pinned ? { height: layout.windowH } : undefined}
          >
            <ul ref={listRef} className={`flex flex-col ${listClassName} ${pinned ? "py-3 will-change-transform" : ""}`}>
              {children}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
