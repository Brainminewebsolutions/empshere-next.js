import BackToTop from "@/components/BackToTop";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import PhosphorIconTile from "@/components/PhosphorIconTile";
import { Buildings, Clock, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/ssr";

export const metadata = {
  title: "Contact Us | Emsphere Technologies - HRMS & Workforce Management",
  description:
    "Get in touch with Emsphere Technologies. Schedule a product demo, request pricing, or speak with our workforce management consultants in Pune, Delhi, or Bangalore.",
  alternates: {
    canonical: "https://www.emsphere.com/contact-us/",
  },
  openGraph: {
    title: "Contact Us | Emsphere Technologies - HRMS & Workforce Management",
    description:
      "Get in touch with Emsphere Technologies. Schedule a product demo, request pricing, or speak with our workforce management consultants in Pune, Delhi, or Bangalore.",
    url: "https://www.emsphere.com/contact-us/",
    type: "website",
  },
};

const OFFICES = [
  {
    city: "Pune",
    badge: "Head Office",
    address: "2nd Floor, Sapphire Chambers, Above Axis Bank, Baner Road, Baner, Pune, Maharashtra – 411045",
    phones: ["020-27292732", "020-27292733", "+91-7798981534"],
    icon: Buildings,
  },
  {
    city: "Delhi",
    badge: "Branch Office",
    address: "Plot No. 11, 1st Floor, Sector 12A, Dwarka, Near Dwarka Metro Station, New Delhi – 110075",
    phones: ["+91-9823185585", "+91-7798981117"],
    icon: MapPin,
  },
  {
    city: "Bengaluru",
    badge: "Branch Office",
    address: "Aarya Center, Opposite 8th Block Post Office, Near Ganesh Temple, Koramangala, Bengaluru, Karnataka – 560095",
    phones: ["+91-9922412060", "+91-7798981117"],
    icon: MapPin,
  },
];

const HIGHLIGHTS = [
  {
    title: "15+ Years",
    desc: "Domain leadership across HR tech and labour operations",
  },
  {
    title: "500+ Clients",
    desc: "Trusted by Fortune 500 and enterprise manufacturing brands",
  },
  {
    title: "2,000,000+",
    desc: "Active workers and employees managed across India",
  },
  {
    title: "ISO 27001",
    desc: "Certified data confidentiality and bank-grade security",
  },
];

export default function ContactUsPage() {
  return (
    <main className="animated-page min-h-screen bg-slate-50/50 font-[family-name:var(--font-geist-sans)]">
      <ScrollReveal root=".animated-page" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0b78c2_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10 text-center">
          <div className="reveal-on-scroll reveal-fade-down inline-flex items-center gap-2 rounded-full bg-brand-blue/20 border border-brand-blue/30 px-4 py-1.5 text-xs sm:text-sm font-semibold text-sky-300 mb-6">
            <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
            Let&apos;s Start a Conversation
          </div>

          <h1 className="reveal-on-scroll reveal-fade-up text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Connect With Our <span className="text-brand-gold">HR Tech &amp; Workforce</span> Specialists
          </h1>

          <p
            className="reveal-on-scroll reveal-fade-up mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
            style={{ transitionDelay: "120ms" }}
          >
            Have questions about our enterprise HRMS, CLMS, or payroll solutions? Schedule a consultation or reach out to our team at any of our offices.
          </p>
        </div>
      </section>

      {/* Main Interaction Section */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Contact Form */}
            <div className="reveal-on-scroll reveal-fade-right lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right: Contact Information & Office Locations */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Touch Card */}
              <div className="reveal-on-scroll reveal-fade-left rounded-2xl border border-black/5 bg-white p-6 sm:p-7 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.07)] space-y-5 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Direct Inquiries &amp; Support
                </h3>

                <div className="space-y-4 text-sm">
                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <PhosphorIconTile icon={EnvelopeSimple} className="mt-0.5 h-9 w-9 rounded-lg" iconClassName="h-5 w-5" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sales &amp; Demos</div>
                      <a href="mailto:sales@emsphere.com" className="font-semibold text-slate-800 hover:text-brand-blue transition-colors">
                        sales@emsphere.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <PhosphorIconTile icon={Phone} className="mt-0.5 h-9 w-9 rounded-lg" iconClassName="h-5 w-5" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Contact Numbers</div>
                      <div className="flex flex-col gap-0.5 font-medium text-slate-800">
                        <a href="tel:+917798981117" className="hover:text-brand-blue transition-colors">+91 7798981117</a>
                        <a href="tel:+917798981534" className="hover:text-brand-blue transition-colors">+91 7798981534</a>
                        <span className="text-xs text-slate-500">Board: 020-27292732 / 33</span>
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3.5">
                    <PhosphorIconTile icon={Clock} className="mt-0.5 h-9 w-9 rounded-lg" iconClassName="h-5 w-5" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Working Hours</div>
                      <div className="font-medium text-slate-800">Monday – Friday: 9:00 AM – 6:00 PM IST</div>
                      <div className="text-xs text-slate-500">Excluding National &amp; Public Holidays</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Locations */}
              <div className="space-y-4">
                <h3 className="reveal-on-scroll reveal-fade-up text-sm font-bold uppercase tracking-wider text-slate-500 px-1">
                  Our Presence Across India
                </h3>

                {OFFICES.map((office, index) => (
                  <div
                    key={office.city}
                    className="reveal-on-scroll reveal-fade-left rounded-xl border border-black/5 bg-white p-5 shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-md hover:border-brand-blue/30"
                    style={{ transitionDelay: `${80 + index * 90}ms` }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <PhosphorIconTile icon={office.icon} className="h-8 w-8 rounded-lg" iconClassName="h-[18px] w-[18px]" />
                        <h4 className="font-bold text-slate-900">{office.city}</h4>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                        {office.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {office.address}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-brand-blue pt-2 border-t border-slate-100">
                      {office.phones.map((phone) => (
                        <a key={phone} href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="hover:underline">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Highlights Section */}
      <section className="border-t border-slate-200/80 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {HIGHLIGHTS.map((item, index) => (
              <div
                key={item.title}
                className="reveal-on-scroll reveal-fade-up space-y-1.5 transition-[transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-blue">
                  {item.title}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-600 max-w-[200px] mx-auto leading-normal">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BackToTop />
    </main>
  );
}
