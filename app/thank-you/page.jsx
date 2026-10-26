import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import { ArrowRight, Check } from "@phosphor-icons/react/ssr";

// Where every lead form lands after a successful submission (components/LeadForm).
// Kept out of search results and the sitemap: it only makes sense after a form.
export const metadata = {
  title: { absolute: "Thank You - Emsphere" },
  description: "Thank you for contacting Emsphere Technologies. Our team will get in touch with you shortly.",
  keywords: null,
  alternates: { canonical: "https://www.emsphere.com/thank-you/" },
  robots: { index: false, follow: true },
};

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fontInstrument = "font-[family-name:var(--font-instrument-sans)]";
const fontInter = "font-[family-name:var(--font-inter)]";
const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";

export default function ThankYouPage() {
  return (
    <main
      className={`${instrumentSans.variable} ${inter.variable} relative isolate flex w-full flex-1 items-center justify-center overflow-hidden bg-[#FFFFFA] px-4 py-16 font-sans text-[#4c4c4c] md:py-24`}
    >
      {/* Same soft gold backdrop as the Contact page hero */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FFF8E1] via-[#FFFCF0] to-[#FFFFFA]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(rgba(239,176,0,0.28)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(180deg,#000_0%,transparent_75%)]"
      />
      <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#EFB000]/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -left-32 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#f8bb18]/15 blur-3xl" />

      <section
        aria-labelledby="thank-you-heading"
        className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white px-6 py-10 text-center shadow-[inset_0_0_0_1px_#e5e5e5,0_12px_28px_-12px_rgba(0,0,0,0.1)] motion-safe:animate-[thankYouIn_0.6s_cubic-bezier(0.16,1,0.3,1)_both] sm:px-12 sm:py-14"
      >
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-[#EFB000]" />

        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#d1f4e3] text-[#0b8f63] ring-8 ring-[#d1f4e3]/40">
          <Check weight="bold" aria-hidden="true" className="h-8 w-8" />
        </span>

        <p className={`${fontInter} mt-6 text-xs font-bold uppercase tracking-[0.14em] text-[#b07d00]`}>Submission received</p>
        <h1
          id="thank-you-heading"
          className={`${fontInstrument} mt-2 text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-[#1f1f1f] sm:text-4xl`}
        >
          Thank you!
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-black/60">
          We have received your details. Our team will get in touch with you shortly, usually within one business day.
        </p>

        <Link
          href="/"
          className={`group/btn mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#EFB000] px-7 py-3.5 ${fontInter} text-[15px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(239,176,0,0.8)] transition-[translate,background-color] duration-300 ${ease} hover:-translate-y-0.5 hover:bg-[#d99e00] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#efb000]/50 sm:w-auto`}
        >
          Go to Home
          <ArrowRight weight="bold" aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </Link>
      </section>

      <style>{`@keyframes thankYouIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }`}</style>
    </main>
  );
}
