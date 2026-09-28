"use client";

import { useEffect, useRef } from "react";

/* Thin gold→blue bar pinned to the top of the viewport that fills as the
   reader scrolls through `target` (the article body). */

export default function ReadingProgress({ target }) {
  const barRef = useRef(null);

  useEffect(() => {
    const article = document.querySelector(target);
    const bar = barRef.current;
    if (!article || !bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = article.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : rect.top < 0 ? 1 : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [target]);

  return <div ref={barRef} className="blog-progress" aria-hidden="true" />;
}
