"use client";

import { useEffect, useRef, useState } from "react";

/* --------------------------------------------------------------------
   Number that counts up from 0 when it scrolls into view.
   The server HTML already contains the final value (good for SEO and
   no-JS visitors); it resets to 0 only if it is still off-screen once
   the page is interactive. Reduced motion shows the final value.
   -------------------------------------------------------------------- */

const DURATION = 1600;

export default function CountUp({ end, suffix = "", className = "" }) {
  const ref = useRef(null);
  const [value, setValue] = useState(end);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return undefined;

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return undefined; // already visible — keep final value
    setValue(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        // Time from the first frame's own timestamp: rAF timestamps can be a
        // little earlier than performance.now(), which would go negative.
        let start = null;
        const tick = (now) => {
          if (start === null) start = now;
          const t = Math.min(1, Math.max(0, (now - start) / DURATION));
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(end * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
