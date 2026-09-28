import Image from "next/image";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import ScrollReveal from "@/components/ScrollReveal";
import logoMahindra from "../images/homeimages/logo-mahindra.png";
import logoCapgemini from "../images/homeimages/logo-capgemini.png";
import logoMercedesBenz from "../images/homeimages/logo-mercedes-benz.png";
import logoHaier from "../images/homeimages/logo-haier.png";
import logoCastrol from "../images/homeimages/logo-castrol.png";
import logoApolloTyres from "../images/homeimages/logo-apollo-tyres.png";
import logoLtDefence from "../images/homeimages/logo-lt-defence.png";
import logoZf from "../images/homeimages/logo-zf.png";
import logoGarware from "../images/homeimages/logo-garware-polyester.png";
import logoVarroc from "../images/homeimages/logo-varroc-excellence.png";
import logoTataAutocomp from "../images/homeimages/logo-tata-autocomp.png";
import logoVishay from "../images/homeimages/logo-vishay.png";
import logoNayara from "../images/homeimages/logo-nayara-energy.png";
import logoKirloskar from "../images/homeimages/logo-kirloskar.png";
import logoKansaiNerolac from "../images/homeimages/logo-kansai-nerolac.png";
import logoAndhraPaper from "../images/homeimages/logo-andhra-paper-limited.png";
import logoDow from "../images/homeimages/logo-dow.png";

export const metadata = {
  title: "Our Clients - Brands Who Believed in Us | Emsphere Technologies",
  description:
    "Discover the leading enterprises that trust Emsphere Technologies for workforce management, contract labour compliance, and HR automation.",
};

const CLIENTS = [
  { name: "Mahindra & Mahindra", logo: logoMahindra, category: "Automotive & Manufacturing" },
  { name: "Capgemini", logo: logoCapgemini, category: "IT & Consulting" },
  { name: "Mercedes-Benz", logo: logoMercedesBenz, category: "Luxury Automotive" },
  { name: "Haier", logo: logoHaier, category: "Consumer Electronics" },
  { name: "Castrol", logo: logoCastrol, category: "Industrial Lubricants" },
  { name: "Apollo Tyres", logo: logoApolloTyres, category: "Manufacturing" },
  { name: "L&T Defence", logo: logoLtDefence, category: "Heavy Engineering & Defence" },
  { name: "ZF Group", logo: logoZf, category: "Mobility Technology" },
  { name: "Garware Polyester", logo: logoGarware, category: "Polyester Films & Tech" },
  { name: "Varroc Excellence", logo: logoVarroc, category: "Automotive Components" },
  { name: "Tata AutoComp", logo: logoTataAutocomp, category: "Automotive Solutions" },
  { name: "Vishay", logo: logoVishay, category: "Semiconductors & Components" },
  { name: "Nayara Energy", logo: logoNayara, category: "Energy & Petrochemicals" },
  { name: "Kirloskar", logo: logoKirloskar, category: "Engines & Industrial" },
  { name: "Kansai Nerolac", logo: logoKansaiNerolac, category: "Paints & Coatings" },
  { name: "Andhra Paper Limited", logo: logoAndhraPaper, category: "Paper & Packaging" },
  { name: "Dow Chemical", logo: logoDow, category: "Chemicals & Materials" },
];

export default function ClientsPage() {
  return (
    <main className="animated-page min-h-screen bg-slate-50/50">
      <ScrollReveal root=".animated-page" />

      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 py-16 sm:py-24 text-white text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0b78c2_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <p className="reveal-on-scroll reveal-fade-down text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-gold">
            Brands Who Believed In Us
          </p>
          <h1 className="reveal-on-scroll reveal-fade-up mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Our Clients &amp; Partners
          </h1>
          <p
            className="reveal-on-scroll reveal-fade-up mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto"
            style={{ transitionDelay: "120ms" }}
          >
            Proud to partner with 500+ leading enterprises across diverse industries, empowering their workforce and operations with reliable HR &amp; compliance technology.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {CLIENTS.map((client, index) => (
              <div
                key={client.name}
                className="reveal-on-scroll reveal-fade-up group flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.12)] hover:border-brand-blue/40 text-center"
                style={{ transitionDelay: `${(index % 8) * 60}ms` }}
              >
                <div className="flex h-20 w-full items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="max-h-14 max-w-[160px] object-contain transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-800 group-hover:text-brand-blue transition-colors">
                  {client.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {client.category}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="reveal-on-scroll reveal-zoom-in mt-16 rounded-2xl bg-white border border-slate-200/80 p-8 sm:p-12 text-center shadow-sm max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900">
              Join the growing network of industry leaders
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Transform your workforce management, contractor governance, and payroll operations.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-lg bg-brand-gold px-7 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-brand-gold-dark hover:shadow-lg active:translate-y-0"
              >
                Connect With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      <BackToTop />
    </main>
  );
}
