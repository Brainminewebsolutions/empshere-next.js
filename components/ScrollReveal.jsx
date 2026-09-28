"use client";

import { useEffect } from "react";

/* --------------------------------------------------------------------
   Adds "reveal-visible" to every `.reveal-on-scroll` element inside
   `root` as it scrolls into view — the same observer the home page uses.
   Renders nothing, so a Server Component page can drop it in and keep
   all of its own markup server-rendered.
   -------------------------------------------------------------------- */

export default function ScrollReveal({ root }) {
  useEffect(() => {
    const elements = document.querySelectorAll(`${root} .reveal-on-scroll`);

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("reveal-visible"));
      return;
    }

    const timers = [];
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("reveal-visible");
          obs.unobserve(el);
          // The stagger delay is only for the entrance — drop it afterwards
          // so hover effects on the same element respond immediately.
          if (el.style.transitionDelay) {
            timers.push(setTimeout(() => (el.style.transitionDelay = ""), 1200));
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [root]);

  return null;
}
