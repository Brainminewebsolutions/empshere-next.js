"use client";

import { useState } from "react";

const ICON_PATHS = {
  tailored: (
    <>
      <path d="M6 9h20M6 16h20M6 23h20" />
      <circle cx="12" cy="9" r="2.8" fill="currentColor" fillOpacity={0.3} />
      <circle cx="21" cy="16" r="2.8" fill="currentColor" fillOpacity={0.3} />
      <circle cx="10" cy="23" r="2.8" fill="currentColor" fillOpacity={0.3} />
    </>
  ),
  cloud: (
    <>
      <path d="M10 24a6 6 0 0 1-.8-11.95A8 8 0 0 1 24.6 13 5.5 5.5 0 0 1 23.5 24Z" fill="currentColor" fillOpacity={0.18} />
      <path d="M16 13.5v8M13 18.5l3 3 3-3" />
    </>
  ),
  scale: (
    <>
      <path d="M5 11V5h6M27 11V5h-6M5 21v6h6M27 21v6h-6" />
      <rect x="10.5" y="10.5" width="11" height="11" rx="2" fill="currentColor" fillOpacity={0.18} />
    </>
  ),
  pointer: (
    <>
      <rect x="4" y="5" width="24" height="18" rx="2.5" fill="currentColor" fillOpacity={0.18} />
      <path d="M4 10h24M8 7.5h.01M11 7.5h.01M16 15l8.5 3-3.7 1.3-1.3 3.7Z" />
    </>
  ),
  headset: (
    <>
      <path d="M6 18v-3a10 10 0 0 1 20 0v3" />
      <rect x="4.5" y="17" width="5" height="8" rx="2" fill="currentColor" fillOpacity={0.18} />
      <rect x="22.5" y="17" width="5" height="8" rx="2" fill="currentColor" fillOpacity={0.18} />
      <path d="M25 25c0 2-2 3-5 3h-3" />
    </>
  ),
  shield: (
    <>
      <path d="M16 3.5 26 7.5v7.5c0 6.2-4.3 10.8-10 13-5.7-2.2-10-6.8-10-13V7.5Z" fill="currentColor" fillOpacity={0.18} />
      <path d="m11.5 16 3.2 3.2 6-6.4" />
    </>
  ),
  trophy: (
    <>
      <path d="M10 5h12v7a6 6 0 0 1-12 0Z" fill="currentColor" fillOpacity={0.18} />
      <path d="M10 8H6c0 4 2 6 4.5 6.5M22 8h4c0 4-2 6-4.5 6.5M16 18v5M11 27h10M12.5 27l1-4h5l1 4" />
    </>
  ),
};

const TONES = [
  { bg: "#d8e7fe", color: "#1d64d8" },
  { bg: "#fee6b1", color: "#b07d00" },
  { bg: "#d1f4e3", color: "#0b8f63" },
  { bg: "#fdd7d4", color: "#c2362c" },
  { bg: "#e9eafe", color: "#5b5bd6" },
];

export default function WhyChooseFlipCards({ reasons }) {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleToggle = (index) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <ul className="flex flex-wrap justify-center gap-5 sm:gap-6 list-none p-0 m-0">
      {reasons.map((item, index) => {
        const toneColor = TONES[(index + 1) % TONES.length];
        const isFlipped = flippedIndex === index;

        return (
          <li
            key={item.title}
            className="reveal-on-scroll reveal-fade-up perspective-1000 group w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] h-[310px] sm:h-[320px] cursor-pointer"
            style={{ transitionDelay: `${(index % 4) * 80}ms` }}
            onClick={() => handleToggle(index)}
            onMouseLeave={() => setFlippedIndex(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`${item.title}. Click or hover to flip and view details.`}
          >
            <div
              className={`relative h-full w-full rounded-2xl transform-style-3d transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-y-180 ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* Front Face: ONLY Icon and Title as requested */}
              <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center p-6 text-center rounded-2xl bg-white shadow-[inset_0_0_0_1px_#ececec,0_6px_20px_-6px_rgba(0,0,0,0.06)] border-b-4 border-[#efb000] backface-hidden select-none">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110"
                  style={{ background: toneColor.bg, color: toneColor.color }}
                >
                  <svg
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICON_PATHS[item.icon]}
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#1f1f1f] leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Back Face: Title and remaining information */}
              <div className="absolute inset-0 flex h-full w-full flex-col justify-center p-6 rounded-2xl bg-[#fffdfa] shadow-[inset_0_0_0_1.5px_#efb000,0_12px_28px_-8px_rgba(239,176,0,0.2)] rotate-y-180 backface-hidden select-none">
                <div className="flex items-center gap-2 pb-2.5 border-b border-[#efb000]/25 shrink-0">
                  <span className="h-2 w-2 rounded-full bg-[#efb000] shrink-0" />
                  <h4 className="text-[15px] font-bold text-[#1f1f1f] leading-snug">
                    {item.title}
                  </h4>
                </div>
                <p className="mt-3 text-[13.5px] leading-[22px] text-[#4c4c4c] overflow-y-auto pr-1">
                  {item.text}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
