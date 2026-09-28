import Image from "next/image";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import ScrollReveal from "@/components/ScrollReveal";
import StarIcon from "@/components/StarIcon";
import logoYazakiTestimonial from "../images/homeimages/logo-yazaki-testimonial.png";
import logoYashaswiTestimonial from "../images/homeimages/logo-yashaswi-testimonial.png";
import logoVarrocTestimonial from "../images/homeimages/logo-varroc-excellence-testimonial.png";
import logoVishayTestimonial from "../images/homeimages/logo-vishay-testimonial.png";
import logoNerolacTestimonial from "../images/homeimages/logo-nerolac-testimonial.png";
import logoReliableAutoTestimonial from "../images/homeimages/logo-reliable-auto-testimonial.png";

export const metadata = {
  title: "Client Testimonials - Brands Who Are Elated With Us | Emsphere Technologies",
  description:
    "Hear directly from HR leaders and enterprise executives about their journey with Emsphere's workforce and labour management software solutions.",
};

const TESTIMONIALS = [
  {
    company: "Yazaki",
    quote:
      "The best part was that emSphere provided end to end solution from Face biometric devices to the contract labour management software which helped us to have a single point of ownership for the entire process across 12000+ employees at 7 Plant locations.",
    name: "Mahesh Jadhav",
    role: "Sr HR Manager",
    logo: logoYazakiTestimonial,
    rating: 5,
  },
  {
    company: "Yashaswi",
    quote:
      "emSphere team has helped us streamline the entire Attendance & Payroll operations for all our 65K+employees across 500+ clients from diverse industry segments using their powerful adaptive configurations & streamlining the payroll across multiple pay cycles as per customer practices in a single centralized system.",
    name: "Vishwesh Kulkarni",
    role: "Chairman",
    logo: logoYashaswiTestimonial,
    rating: 5,
  },
  {
    company: "Varroc Excellence",
    quote:
      "emSphere emContract Labour management system empowered us to digitize end to end system from 120+ Biometric attendance, Manpower planning to Contractor billing & labour Analytics associated with it for dynamic contract labour workforce at our 28+ locations 20,000+ contract employees.",
    name: "Shrikrishna Khalse",
    role: "Lead Employee Relations",
    logo: logoVarrocTestimonial,
    rating: 5,
  },
  {
    company: "Vishay",
    quote:
      "We are using CLMS system for recording and monitoring of the statutory compliances for all service provider. It serves us the great help, not only for compliance monitoring but also in statutory audit, wherein we get the requisite information quickly on single button click. It reduced our manual work, automated the entire process and improved accuracy.",
    name: "Pramod Hore",
    role: "Manager HR-IR & Admin",
    logo: logoVishayTestimonial,
    rating: 5,
  },
  {
    company: "Nerolac",
    quote:
      "Kansai Nerolac Paints has been satisfied with Emsphere Technologies Pvt. Ltd's software services. Their staff demonstrated a thorough understanding of our demands from the start, delivering a tailored solution that exactly met our specifications. The program is reliable, user-friendly, and has considerably increased our operational efficiency.",
    name: "Mr Vivek Bhatwadekar",
    role: "General Manager, Head - Employee Relations",
    logo: logoNerolacTestimonial,
    rating: 5,
  },
  {
    company: "Reliable Autotech",
    quote:
      "Managing 1,200+ contract workers across Pune, Nashik & Dewas and PAN-India was complex. emSphere gave us a single, end-to-end system — from face-based turnstile access to attendance, contractor billing, and compliance. Automatic compliance blocking at the device level removes manual checks and risk.",
    name: "Operations Leadership",
    role: "Reliable Autotech",
    logo: logoReliableAutoTestimonial,
    rating: 5,
  },
];

export default function TestimonialsPage() {
  return (
    <main className="animated-page min-h-screen bg-slate-50/50">
      <ScrollReveal root=".animated-page" />

      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 py-16 sm:py-24 text-white text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0b78c2_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <p className="reveal-on-scroll reveal-fade-down text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-gold">
            Brands Who Are Elated With Us
          </p>
          <h1 className="reveal-on-scroll reveal-fade-up mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Client Testimonials
          </h1>
          <p
            className="reveal-on-scroll reveal-fade-up mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto"
            style={{ transitionDelay: "120ms" }}
          >
            Real stories from HR directors, plant heads, and compliance leaders who scaled their enterprise operations with emSphere.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={testimonial.company}
                className="reveal-on-scroll reveal-fade-up group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-8px_rgba(11,120,194,0.12)] hover:border-brand-blue/40"
                style={{ transitionDelay: `${(index % 3) * 120}ms` }}
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-brand-gold mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 fill-current transition-transform duration-200 group-hover:scale-110" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm leading-relaxed text-slate-700 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {testimonial.role} &middot; {testimonial.company}
                    </p>
                  </div>
                  {testimonial.logo && (
                    <div className="h-10 w-24 shrink-0 flex items-center justify-end">
                      <Image
                        src={testimonial.logo}
                        alt={`${testimonial.company} logo`}
                        className="max-h-9 max-w-full object-contain transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="reveal-on-scroll reveal-zoom-in mt-16 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-blue-dark p-8 sm:p-12 text-center text-white shadow-xl max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Ready to create your own success story?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-sky-100">
              Schedule a personalized walkthrough and explore how our modules fit your organization.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-lg bg-brand-gold px-8 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-brand-gold-dark hover:shadow-lg active:translate-y-0"
              >
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
      <BackToTop />
    </main>
  );
}
