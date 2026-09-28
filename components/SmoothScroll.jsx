"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Initialize Lenis with matching configuration to keka.com
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      autoRaf: true,
      anchors: { offset: -90, duration: 1.2 },
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Handle hash scroll on initial page load if present
    if (window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          lenis.scrollTo(target, { offset: -90, immediate: false, duration: 1.2 });
        }
      }, 100);
    }

    const onResize = () => {
      lenis.resize();
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      lenis.destroy();
      lenisRef.current = null;
      if (window.lenis === lenis) {
        delete window.lenis;
      }
    };
  }, []);

  // When pathname changes (route navigation), scroll to top immediately & recalculate dimensions
  useEffect(() => {
    if (!lenisRef.current) return;

    if (window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target && lenisRef.current) {
          lenisRef.current.scrollTo(target, { offset: -90, immediate: false, duration: 1.2 });
          return;
        }
      }, 100);
    } else {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    const frame = requestAnimationFrame(() => {
      lenisRef.current?.resize();
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
