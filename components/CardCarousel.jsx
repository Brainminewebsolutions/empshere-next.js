"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";

/* --------------------------------------------------------------------
   Infinite, auto-playing card slider.

   - Shows 1 card on phones, 2 from `sm`, 4 from `lg` (pure CSS, so the
     server render is already correct — no layout jump on hydration).
   - Loops forever: CLONES copies of the last/first cards sit on either
     side of the real ones; after sliding onto a copy we jump (without
     animation) to the matching real card.
   - Autoplays every `interval` ms; pauses on hover, keyboard focus,
     while dragging, when the tab is hidden, and for reduced motion.
   - Swipe (touch) / drag (mouse) to move manually; dots jump to a card.
   -------------------------------------------------------------------- */

const CLONES = 4; // = the most cards ever visible at once
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION = 650;
const SWIPE_THRESHOLD = 50;

export default function CardCarousel({ children, interval = 1700, label = "Cards", dotLabels = [] }) {
  const items = Children.toArray(children);
  const count = items.length;
  const slides = [...items.slice(-CLONES), ...items, ...items.slice(0, CLONES)];

  const [index, setIndex] = useState(CLONES);
  const [animate, setAnimate] = useState(true);
  const [dragPx, setDragPx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  const viewportRef = useRef(null);
  const drag = useRef(null);

  const active = (((index - CLONES) % count) + count) % count;

  const go = useCallback((next) => {
    setAnimate(true);
    setIndex(next);
  }, []);

  // Reduced motion + tab visibility + phone width (one card in view).
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const phone = window.matchMedia("(max-width: 639px)");
    const syncMotion = () => setReducedMotion(media.matches);
    const syncPhone = () => setIsPhone(phone.matches);
    const syncHidden = () => setHidden(document.hidden);
    syncMotion();
    syncPhone();
    media.addEventListener("change", syncMotion);
    phone.addEventListener("change", syncPhone);
    document.addEventListener("visibilitychange", syncHidden);
    return () => {
      media.removeEventListener("change", syncMotion);
      phone.removeEventListener("change", syncPhone);
      document.removeEventListener("visibilitychange", syncHidden);
    };
  }, []);

  // Autoplay: one step per interval. Phones show a single card, so each one
  // stays up longer there to leave time to read it.
  const delay = isPhone ? Math.max(interval * 2, 3500) : interval;
  useEffect(() => {
    if (paused || dragging || hidden || reducedMotion || count < 2) return undefined;
    const timer = setTimeout(() => go(index + 1), delay);
    return () => clearTimeout(timer);
  }, [index, paused, dragging, hidden, reducedMotion, count, delay, go]);

  // After sliding onto a clone, snap (without animation) to the real card
  // it mirrors. transitionend is the fast path; the timer is the fallback
  // for when the browser skips the event (hidden tab, interrupted slide).
  const onClone = index >= CLONES + count || index < CLONES;
  const snapToReal = useCallback(() => {
    setAnimate(false);
    setIndex((i) => (i >= CLONES + count ? i - count : i < CLONES ? i + count : i));
  }, [count]);

  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    if (onClone) snapToReal();
  };

  useEffect(() => {
    if (!onClone || dragging) return undefined;
    const timer = setTimeout(snapToReal, (reducedMotion ? 200 : DURATION) + 40);
    return () => clearTimeout(timer);
  }, [onClone, dragging, reducedMotion, snapToReal, index]);

  // Re-enable the transition one frame after an instant snap.
  useEffect(() => {
    if (animate) return undefined;
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  /* ----------------------------- dragging ----------------------------- */

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.current = { x: event.clientX, y: event.clientY, id: event.pointerId, axis: null };
  };

  const onPointerMove = (event) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    if (!state.axis) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      state.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (state.axis === "x") {
        event.currentTarget.setPointerCapture?.(event.pointerId);
        setDragging(true);
      }
    }
    if (state.axis === "x") setDragPx(dx);
  };

  const endDrag = (event) => {
    const state = drag.current;
    drag.current = null;
    if (!state || state.axis !== "x") return;
    const dx = event.clientX - state.x;
    setDragPx(0);
    setDragging(false);
    setAnimate(true);
    if (dx <= -SWIPE_THRESHOLD) setIndex((i) => i + 1);
    else if (dx >= SWIPE_THRESHOLD) setIndex((i) => i - 1);
  };

  const transition =
    dragging || !animate ? "none" : reducedMotion ? "transform 200ms ease" : `transform ${DURATION}ms ${EASE}`;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div
        ref={viewportRef}
        className="-mx-2.5 cursor-grab touch-pan-y select-none overflow-hidden px-0 py-3 active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(event) => event.preventDefault()}
      >
        <ul
          className="flex will-change-transform [--step:100%] sm:[--step:50%] lg:[--step:25%]"
          style={{
            transform: `translate3d(calc(${-index} * var(--step) + ${dragPx}px), 0, 0)`,
            transition,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((item, i) => {
            const isClone = i < CLONES || i >= CLONES + count;
            const realIndex = (((i - CLONES) % count) + count) % count;
            return (
              <li
                key={`${isClone ? "clone" : "slide"}-${i}`}
                aria-hidden={isClone || undefined}
                inert={isClone || undefined}
                aria-roledescription="slide"
                aria-label={isClone ? undefined : `${realIndex + 1} of ${count}`}
                className="flex shrink-0 grow-0 basis-full px-2.5 sm:basis-1/2 lg:basis-1/4"
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2" role="group" aria-label={`${label} navigation`}>
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={dotLabels[i] || `Show card ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => go(CLONES + i)}
            className={`h-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b07d00] ${
              i === active ? "w-7 bg-[#efb000] shadow-[0_2px_8px_-2px_rgba(239,176,0,0.8)]" : "w-2.5 bg-[#efb000]/30 hover:bg-[#efb000]/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
