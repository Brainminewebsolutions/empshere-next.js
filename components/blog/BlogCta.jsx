import Link from "next/link";
import { ArrowRightIcon } from "./BlogIcons";

/* Closing "Ready to talk? / Want to know more?" band. */

const COLUMNS = [
  { title: "Ready to talk?", cta: "Talk to Sales", reveal: "reveal-fade-right" },
  { title: "Want to know more?", cta: "Book Demo", reveal: "reveal-fade-left" },
];

export default function BlogCta() {
  return (
    <section className="bg-[#FFFFFA] px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="reveal-on-scroll reveal-zoom-in relative isolate mx-auto max-w-[1100px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#fff1c9] via-[#fff8e6] to-[#fffdf5] px-6 py-12 shadow-[inset_0_0_0_1px_#f0d48a,0_30px_60px_-36px_rgba(176,125,0,0.55)] sm:px-10 sm:py-14 lg:py-16">
        <div aria-hidden="true" className="blog-hero-dots absolute inset-0 -z-10 opacity-70" />
        <div aria-hidden="true" className="blog-hero-blob -z-10 -right-16 -top-20 h-64 w-64 bg-[#efb000]/25" />
        <div aria-hidden="true" className="blog-hero-blob -z-10 -bottom-24 -left-16 h-64 w-64 bg-[#f8bb18]/20" style={{ animationDelay: "-6s" }} />

        <div className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-12 lg:gap-20">
          {COLUMNS.map((col, index) => (
            <div key={col.title} className="contents">
              {index > 0 && <span aria-hidden="true" className="h-px w-24 bg-[#e6cf8f] sm:h-[110px] sm:w-px" />}
              <div
                className={`reveal-on-scroll ${col.reveal} flex flex-1 flex-col items-center gap-6 text-center`}
                style={{ transitionDelay: `${150 + index * 120}ms` }}
              >
                <h2 className="text-[28px] font-bold tracking-[-0.015em] text-[#1f1f1f] sm:text-[32px] lg:text-[38px]">{col.title}</h2>
                <Link href="/contact-us/" data-request-demo="" className="blog-btn blog-btn-gold min-w-[160px] px-[30px]">
                  {col.cta}
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
