import Image from "next/image";
import Link from "next/link";

const PRODUCT_LINKS = [
  { label: "emHRMS", href: "/human-resource-management-system" },
  { label: "emCLMS", href: "/contract-labour-management-system-software" },
  { label: "emPay", href: "/payroll-management-solution" },
  { label: "emWorkForce", href: "/workforce-management-system" },
  { label: "emVisit", href: "/visitor-management-system" },
  { label: "emMeal", href: "/canteen-management-system" },
  { label: "emCount", href: "/headcount-management-software" },
];

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Clients", href: "/our-clients" },
  { label: "Testimonials", href: "/testimonial" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Careers", href: "/careers" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const SOLUTION_LINKS = [
  { label: "Onboarding & Gatepass", href: "/clms-onboarding-gatepass-management" },
  { label: "Contract Labour Management", href: "/contract-labour-management-system-software" },
  { label: "Workforce Management", href: "/workforce-management-system" },
  { label: "Visitor Management", href: "/visitor-management-system" },
  { label: "Canteen Management", href: "/canteen-management-system" },
  { label: "Lift Integration", href: "/integrations" },
  { label: "Labour Management System Software", href: "/labour-management-system-software" },
];

function FooterColumn({ title, links, extra, className = "" }) {
  return (
    <div className={className}>
      <h3 className="text-sm font-bold uppercase tracking-[0.7px] text-black">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="nav-underline inline-block text-sm text-black/80 transition-colors hover:text-[#EFB000]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {extra}
    </div>
  );
}

function LinkedInIcon({ className = "h-8 w-8" }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="7" fill="#000000" />
      <path
        d="M12.5 31V16.5H8V31h4.5zM10.25 14.5c1.55 0 2.5-1.02 2.5-2.3-.03-1.3-.95-2.3-2.47-2.3-1.52 0-2.5 1-2.5 2.3 0 1.28.95 2.3 2.44 2.3h.03zM15 31h4.5v-8.1c0-.43.03-.86.16-1.17.36-.86 1.2-1.75 2.62-1.75 1.85 0 2.6 1.35 2.6 3.32V31h4.5v-8.68c0-4.65-2.48-6.8-5.8-6.8-2.72 0-3.92 1.5-4.58 2.54h.03V16.5H15c.06 1.3 0 14.5 0 14.5z"
        fill="#ffffff"
      />
    </svg>
  );
}

function FacebookIcon({ className = "h-8 w-8" }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#000000" />
      <path
        d="M22.2 32v-11h3.69l.55-4.29h-4.24V13.97c0-1.24.34-2.09 2.13-2.09h2.27V8.04c-.39-.05-1.74-.17-3.32-.17-3.28 0-5.53 2-5.53 5.68v3.16h-3.71v4.29h3.71V32h4.45z"
        fill="#ffffff"
      />
    </svg>
  );
}

function TwitterIcon({ className = "h-8 w-8" }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M36 10.5a14.7 14.7 0 0 1-4.23 1.16 7.37 7.37 0 0 0 3.24-4.08 14.7 14.7 0 0 1-4.68 1.79 7.38 7.38 0 0 0-12.56 6.73 20.9 20.9 0 0 1-15.2-7.7 7.38 7.38 0 0 0 2.28 9.85 7.3 7.3 0 0 1-3.34-.92v.09a7.38 7.38 0 0 0 5.92 7.23 7.4 7.4 0 0 1-3.33.13 7.38 7.38 0 0 0 6.89 5.12 14.8 14.8 0 0 1-9.16 3.16c-.6 0-1.18-.04-1.76-.1 13.55 8.68 30.13 1.35 30.13-17.75 0-.32-.01-.64-.02-.95A14.9 14.9 0 0 0 36 10.5z"
        fill="#000000"
      />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#EFB000]/25 bg-[#FFFFF0]">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-center sm:grid-cols-2 sm:gap-10 sm:text-left lg:grid-cols-4 lg:gap-8">
          <div className="col-span-2 flex flex-col items-center gap-5 sm:col-span-1 sm:items-start">
            <div className="flex w-full max-w-[210px] flex-col items-center gap-4 sm:max-w-[230px]">
              <Link
                href="/"
                className="flex w-full items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EFB000]/60 focus-visible:ring-offset-2"
                aria-label="Emsphere Technologies home"
              >
                <Image
                  src="/universal-images/header/emsphere-logo-400.webp"
                  alt="Emsphere Technologies - Seamless Connect logo"
                  width={400}
                  height={104}
                  className="h-9 w-auto sm:h-10 md:h-11 lg:h-12"
                />
              </Link>

              {/* Social Links - perfectly centered */}
              <div className="flex w-full items-center justify-center gap-4 py-1">
                <a
                  href="https://www.linkedin.com/company/emspheretechnologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Emsphere Technologies on LinkedIn"
                  className="inline-flex items-center justify-center transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EFB000]"
                >
                  <LinkedInIcon className="h-7 w-7 sm:h-8 sm:w-8" />
                </a>
                <a
                  href="https://www.facebook.com/emsphere"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Emsphere Technologies on Facebook"
                  className="inline-flex items-center justify-center transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EFB000]"
                >
                  <FacebookIcon className="h-7 w-7 sm:h-8 sm:w-8" />
                </a>
                <a
                  href="https://twitter.com/emspheretech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Emsphere Technologies on Twitter"
                  className="inline-flex items-center justify-center transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EFB000]"
                >
                  <TwitterIcon className="h-7 w-7 sm:h-8 sm:w-8" />
                </a>
              </div>

              {/* Certification Badges */}
              <div className="w-full">
                <Image
                  src="/universal-images/footer/emsphere-certification-badges.webp"
                  alt="Emsphere Technologies is ISO 27001:2022 and SOC 2 Type I & Type II certified"
                  width={308}
                  height={81}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>

          <FooterColumn title="Products" links={PRODUCT_LINKS} className="col-span-1" />
          <FooterColumn title="Company" links={COMPANY_LINKS} className="col-span-1" />
          <FooterColumn
            title="Solutions"
            links={SOLUTION_LINKS}
            className="col-span-2 sm:col-span-1"
            extra={
              <div className="mt-4 pt-3 border-t border-black/10">
                <p className="text-xs font-semibold text-black/70">For careers, contact:</p>
                <a
                  href="mailto:hr@emsphere.com"
                  className="nav-underline mt-0.5 inline-block text-sm font-medium text-black/90 transition-colors hover:text-[#EFB000]"
                >
                  hr@emsphere.com
                </a>
              </div>
            }
          />
        </div>

        <div className="mt-12 border-t border-black/15 pt-6 text-center text-xs text-black/80">
          <p>&copy; {year} Emsphere - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
