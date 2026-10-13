import Link from "next/link";
import { getPageHref, getPaginationRange } from "@/lib/blog";
import { ChevronIcon } from "./BlogIcons";

/* Crawlable pagination: every page is a real <a href>, so search engines
   can reach every post by following links from /blog/. */

export default function Pagination({ current, total }) {
  if (total <= 1) return null;

  const desktopRange = getPaginationRange(current, total, 1);
  const mobileRange = getPaginationRange(current, total, 0);

  const renderRange = (range) =>
    range.map((item) =>
      typeof item === "string" ? (
        <li key={item} aria-hidden="true" className="blog-label flex h-11 w-6 items-end justify-center pb-2 text-black/40">
          …
        </li>
      ) : (
        <li key={item}>
          {item === current ? (
            <span className="blog-page-link" aria-current="page" aria-label={`Page ${item}, current page`}>
              {item}
            </span>
          ) : (
            <Link href={getPageHref(item)} className="blog-page-link" aria-label={`Go to page ${item}`}>
              {item}
            </Link>
          )}
        </li>
      )
    );

  const prev =
    current > 1 ? (
      <Link href={getPageHref(current - 1)} className="blog-page-link" rel="prev" aria-label="Previous page">
        <ChevronIcon direction="left" />
        <span className="hidden sm:inline">Prev</span>
      </Link>
    ) : (
      <span className="blog-page-link" aria-disabled="true">
        <ChevronIcon direction="left" />
        <span className="hidden sm:inline">Prev</span>
      </span>
    );

  const next =
    current < total ? (
      <Link href={getPageHref(current + 1)} className="blog-page-link" rel="next" aria-label="Next page">
        <span className="hidden sm:inline">Next</span>
        <ChevronIcon direction="right" />
      </Link>
    ) : (
      <span className="blog-page-link" aria-disabled="true">
        <span className="hidden sm:inline">Next</span>
        <ChevronIcon direction="right" />
      </span>
    );

  return (
    <nav aria-label="Blog pagination" className="reveal-on-scroll reveal-fade-up mt-14 sm:mt-16">
      <div className="flex justify-center">
        <div className="blog-pager">
          {prev}
          <span aria-hidden="true" className="mx-1 h-6 w-px bg-[#efe1bd]" />
          <ul className="hidden items-center gap-1 sm:flex">{renderRange(desktopRange)}</ul>
          <ul className="flex items-center gap-0.5 sm:hidden">{renderRange(mobileRange)}</ul>
          <span aria-hidden="true" className="mx-1 h-6 w-px bg-[#efe1bd]" />
          {next}
        </div>
      </div>
      <p className="blog-label mt-4 text-center text-[13px] font-medium text-black/50">
        Page {current} of {total}
      </p>
    </nav>
  );
}
