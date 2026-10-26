"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "./ArrowIcon";

const AUTO_ADVANCE_MS = 6500;

export default function HeroCarousel({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="relative h-[480px] w-full overflow-hidden sm:h-[540px] md:h-[600px] lg:h-[631px]">
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        const HeadingTag = index === 0 ? "h1" : "p";

        return (
          <div
            key={slide.heading}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={slide.bg}
              alt={slide.heading}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center gap-4 px-6 pb-16 sm:px-10 md:px-[102px]">
              <HeadingTag className="max-w-xl text-3xl font-semibold text-black sm:text-4xl md:text-[40px] md:leading-[49px]">
                {slide.heading}
              </HeadingTag>
              <p className="max-w-md text-base font-semibold text-black/64 sm:text-lg md:max-w-lg md:text-2xl md:leading-[31px]">
                {slide.body}
              </p>
              <Link
                href={slide.ctaHref}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-md bg-[#EFB000] px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#d99e00]"
              >
                {slide.cta}
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-6 left-6 flex gap-2 sm:left-10 md:left-[102px]">
        {slides.map((slide, index) => (
          <button
            key={slide.heading}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show slide ${index + 1}: ${slide.heading}`}
            aria-current={index === activeIndex}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              index === activeIndex ? "bg-[#EFB000]" : "bg-black/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
