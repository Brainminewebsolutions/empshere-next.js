"use client";

import { useEffect, useRef, useState } from "react";

/* --------------------------------------------------------------------
   Stopwatch-style rolling digit counter.
   Each digit column rolls vertically through staggered, spinning
   number reels with hardware-accelerated CSS transforms and an Apple-
   grade cubic-bezier deceleration curve, perfectly mimicking the
   precision mechanism of a stopwatch.
   -------------------------------------------------------------------- */

// Generate the number strip for a target digit
function buildDigitStrip(targetDigit, digitIndex) {
  // Higher digit indices (rightmost dials) spin more cycles to mimic
  // the high-speed split-second dials on a stopwatch.
  const baseCycles = 2 + Math.floor(digitIndex * 0.55);
  const items = [];
  for (let c = 0; c < baseCycles; c++) {
    for (let d = 0; d < 10; d++) {
      items.push(d);
    }
  }
  // End on the target digit
  for (let d = 0; d <= targetDigit; d++) {
    items.push(d);
  }
  return items;
}

export default function StopwatchCounter({
  value = "15,00,000",
  suffix = "",
  className = "",
}) {
  const containerRef = useRef(null);
  const [isArmed, setIsArmed] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  // Parse characters into structured items
  const fullValue = `${value ?? ""}${suffix ?? ""}`;
  const characters = String(fullValue).split("");
  let digitCounter = 0;
  const items = characters.map((char) => {
    if (char === "," || char === "." || !char.trim() || isNaN(Number(char))) {
      return { type: "char", value: char };
    }
    const targetDigit = parseInt(char, 10);
    const strip = buildDigitStrip(targetDigit, digitCounter);
    const item = {
      type: "digit",
      target: targetDigit,
      strip,
      digitIndex: digitCounter,
    };
    digitCounter++;
    return item;
  });

  const totalDigits = digitCounter;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRolling(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;

    // Arm at 0
    setIsArmed(true);

    if (isAlreadyVisible) {
      // If already in view on load, begin rolling after a short pause
      const timer = setTimeout(() => {
        setIsRolling(true);
      }, 150);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay start slightly for optimal perceived motion
          setTimeout(() => {
            setIsRolling(true);
          }, 120);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleReplay = (e) => {
    e.preventDefault();
    setIsRolling(false);
    setTimeout(() => {
      setIsRolling(true);
    }, 60);
  };

  return (
    <span
      ref={containerRef}
      onClick={handleReplay}
      className={`inline-flex items-baseline cursor-pointer select-none font-sans font-bold tabular-nums tracking-tight ${className}`}
      title="Click to replay stopwatch animation"
      aria-label={fullValue}
    >
      <span className="sr-only">{fullValue}</span>
      <span aria-hidden="true" className="inline-flex items-baseline">
        {items.map((item, idx) => {
          if (item.type === "char") {
            return (
              <span
                key={`sep-${idx}`}
                className="inline-block px-[0.03em]"
                style={{ verticalAlign: "baseline" }}
              >
                {item.value}
              </span>
            );
          }

          const stripLen = item.strip.length;
          // While armed (ready at 0) and not yet rolling -> show top item (0)
          // When rolling (or SSR before arming) -> translate to target digit
          const showTarget = !isArmed || isRolling;
          const targetYPercent = showTarget ? -((stripLen - 1) / stripLen) * 100 : 0;

          // Staggered durations: left dials lock in earlier (~1.6s),
          // rightmost dials spin longer (~2.4s) like high-speed stopwatch centiseconds
          const progress = totalDigits > 1 ? item.digitIndex / (totalDigits - 1) : 0;
          const duration = 1600 + progress * 800;
          const delay = progress * 70;

          return (
            <span
              key={`digit-${idx}`}
              className="relative inline-block h-[1.18em] overflow-hidden align-baseline"
              style={{
                verticalAlign: "-0.16em",
                width: "0.62em",
                textAlign: "center",
              }}
            >
              <span
                className="flex flex-col w-full text-center"
                style={{
                  transform: `translate3d(0, ${targetYPercent}%, 0)`,
                  transitionProperty: isArmed ? "transform" : "none",
                  transitionDuration: isArmed && isRolling ? `${duration}ms` : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: isArmed && isRolling ? `${delay}ms` : "0ms",
                  willChange: "transform",
                }}
              >
                {item.strip.map((digit, sIdx) => (
                  <span
                    key={sIdx}
                    className="flex h-[1.18em] w-full shrink-0 items-center justify-center leading-[1.18em]"
                  >
                    {digit}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
