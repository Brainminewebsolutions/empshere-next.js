import Image from "next/image";
import Link from "next/link";

const PRODUCT_LINKS = [
  { label: "emHRMS", href: "/products/emhrms" },
  { label: "emCLMS", href: "/products/emclms" },
  { label: "emPayroll", href: "/products/empayroll" },
  { label: "emWorkForce", href: "/products/emworkforce" },
  { label: "emVisit", href: "/products/emvisit" },
  { label: "emMeal", href: "/products/emmeal" },
];

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Clients", href: "/clients" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

const SOLUTION_LINKS = [
  { label: "Onboarding & Gatepass", href: "/solutions/onboarding-gatepass" },
  { label: "Contract Labour Management", href: "/solutions/contract-labour-management" },
  { label: "Workforce Management", href: "/solutions/workforce-management" },
  { label: "Visitor Management", href: "/solutions/visitor-management" },
  { label: "Canteen Management", href: "/solutions/canteen-management" },
];

function FooterColumn({ title, links, className = "" }) {
  return (
    <div className={className}>
      <h3 className="text-sm font-bold uppercase tracking-[0.7px] text-black">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="nav-underline inline-block text-sm text-black/80 transition-colors hover:text-black"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-brand-gold">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-center sm:grid-cols-2 sm:gap-10 sm:text-left lg:grid-cols-4 lg:gap-8">
          <div className="col-span-2 flex justify-center sm:col-span-1 sm:justify-start">
            <Image
              src="/universal-images/footer/emsphere-social-certification-badges.webp"
              alt="Emsphere Technologies is ISO 27001:2022 and SOC 2 Type I & Type II certified. Follow us on LinkedIn, Facebook and Twitter."
              width={367}
              height={368}
              className="h-auto w-full max-w-[220px] sm:max-w-[260px]"
            />
          </div>

          <FooterColumn title="Products" links={PRODUCT_LINKS} className="col-span-1" />
          <FooterColumn title="Company" links={COMPANY_LINKS} className="col-span-1" />
          <FooterColumn title="Solutions" links={SOLUTION_LINKS} className="col-span-2 sm:col-span-1" />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/15 pt-6 text-xs text-black/80 sm:flex-row">
          <p>&copy; 2026 Emsphere - All Rights Reserved</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="nav-underline inline-block hover:text-black">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="nav-underline inline-block hover:text-black">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
