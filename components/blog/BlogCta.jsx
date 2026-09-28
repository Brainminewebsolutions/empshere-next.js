import Link from "next/link";

/* The home page's closing "Ready to talk? / Want to know more?" band. */

export default function BlogCta() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[88px]">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-center gap-10 px-5 sm:flex-row sm:gap-12 lg:gap-20">
        <div className="reveal-on-scroll reveal-fade-right flex flex-1 flex-col items-center gap-6 text-center">
          <h2 className="text-[28px] font-semibold tracking-[-0.01em] sm:text-[32px] lg:text-[38px]">Ready to talk?</h2>
          <Link href="/contact-us/" className="blog-btn blog-btn-blue min-w-[145px] px-[30px]">
            Talk to Sales
          </Link>
        </div>
        <span aria-hidden="true" className="h-[2px] w-24 bg-[#8b8a8a]/40 sm:h-[120px] sm:w-[2px]" />
        <div className="reveal-on-scroll reveal-fade-left flex flex-1 flex-col items-center gap-6 text-center">
          <h2 className="text-[28px] font-semibold tracking-[-0.01em] sm:text-[32px] lg:text-[38px]">Want to know more?</h2>
          <Link href="/contact-us/" className="blog-btn blog-btn-blue min-w-[145px] px-[30px]">
            Book Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
