"use client";

import { useState } from "react";
import { ArrowsOut, Cloud, CursorClick, Headset, ShieldCheck, SlidersHorizontal, Trophy } from "@phosphor-icons/react/ssr";

// Section icons from Phosphor (https://phosphoricons.com), white on the #EFB000 tile.
const ICONS = {
  tailored: SlidersHorizontal,
  cloud: Cloud,
  scale: ArrowsOut,
  pointer: CursorClick,
  headset: Headset,
  shield: ShieldCheck,
  trophy: Trophy,
};

export default function WhyChooseFlipCards({ reasons }) {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleToggle = (index) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <ul className="flex flex-wrap justify-center gap-5 sm:gap-6 list-none p-0 m-0">
      {reasons.map((item, index) => {
        const Icon = ICONS[item.icon];
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
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EFB000] text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <Icon weight="fill" aria-hidden="true" className="h-8 w-8" />
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
