"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function ChevronDownIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 8 CLMS Modules balanced in 2 equal columns of 4 items for pixel-perfect alignment and equal gaps
const CLMS_SUB_ITEMS = {
  col1: [
    {
      title: "CLMS-Onboarding-Gatepass-Management",
      href: "/product#clms-onboarding-gatepass",
    },
    {
      title: "CLMS-Attendance-Shift-Overtime-Management",
      href: "/product#clms-attendance-shift-overtime",
    },
    {
      title: "CLMS-Contractor-Portal",
      href: "/product#clms-contractor-portal",
    },
    {
      title: "CLMS-Contractor-Contract-Employee-Masters",
      href: "/product#clms-contractor-employee-masters",
    },
  ],
  col2: [
    {
      title: "CLMS-Compliances-Statutory-Reports",
      href: "/product#clms-compliances-statutory-reports",
    },
    {
      title: "CLMS-Realtime-Dashboards",
      href: "/product#clms-realtime-dashboards",
    },
    {
      title: "CLMS-Wages-Contractor-Billing",
      href: "/product#clms-wages-contractor-billing",
    },
    {
      title: "CLMS-Manpower-Planning",
      href: "/product#clms-manpower-planning",
    },
  ],
};

const ABOUT_SUB_ITEMS = {
  story: {
    title: "Our story",
    desc: "Our learning, vision and 360 suite",
    href: "/About-us",
  },
  rightCol: [
    {
      title: "Clients",
      desc: "Brands who believed in us",
      href: "/clients",
    },
    {
      title: "Testimonials",
      desc: "Brands who are elated with us",
      href: "/testimonials",
    },
  ],
};

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product", isMegaMenu: true },
  { label: "About Us", href: "/About-us", isAboutDropdown: true },
  { label: "Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCount, setOpenCount] = useState(0);

  // Desktop mega menu states
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  // Automatic dropdown state for Contract Labour Management Software
  const [isClmsOpen, setIsClmsOpen] = useState(false);

  // Mobile drawer accordion states
  const [isMobileProductOpen, setIsMobileProductOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isMobileClmsOpen, setIsMobileClmsOpen] = useState(false);

  // Hover timer refs
  const closeTimerRef = useRef(null);
  const megaMenuRef = useRef(null);
  const aboutTimerRef = useRef(null);
  const aboutMenuRef = useRef(null);

  // Keep menu open whenever the cursor is anywhere on the mega menu or trigger
  const handleMenuEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (aboutTimerRef.current) {
      clearTimeout(aboutTimerRef.current);
      aboutTimerRef.current = null;
    }
    setIsAboutOpen(false);
    setIsProductOpen(true);
  };

  // Only close when the cursor is physically moved apart from the entire menu
  const handleMenuLeave = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    // 240ms debounce grace period so the cursor can move freely inside the menu without flickering
    closeTimerRef.current = setTimeout(() => {
      setIsProductOpen(false);
      setIsClmsOpen(false);
    }, 240);
  };

  // About menu hover handlers
  const handleAboutEnter = () => {
    if (aboutTimerRef.current) {
      clearTimeout(aboutTimerRef.current);
      aboutTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsProductOpen(false);
    setIsClmsOpen(false);
    setIsAboutOpen(true);
  };

  const handleAboutLeave = () => {
    if (aboutTimerRef.current) {
      clearTimeout(aboutTimerRef.current);
    }
    aboutTimerRef.current = setTimeout(() => {
      setIsAboutOpen(false);
    }, 240);
  };

  // Hover on Contract Labour automatically opens its dropdown and keeps it open while on menu
  const handleClmsHover = () => {
    handleMenuEnter();
    setIsClmsOpen(true);
  };

  const toggleClmsClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsClmsOpen((prev) => !prev);
  };

  const openMobileMenu = () => {
    setOpenCount((count) => count + 1);
    setIsMenuOpen(true);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsProductOpen(false);
    setIsClmsOpen(false);
    setIsAboutOpen(false);
    setIsMobileProductOpen(false);
    setIsMobileAboutOpen(false);
    setIsMobileClmsOpen(false);
  };

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.lenis?.stop();
    } else {
      document.body.style.overflow = "";
      window.lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      window.lenis?.start();
    };
  }, [isMenuOpen]);

  // Click outside to close desktop menus
  useEffect(() => {
    function handleClickOutside(event) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setIsProductOpen(false);
        setIsClmsOpen(false);
      }
      if (aboutMenuRef.current && !aboutMenuRef.current.contains(event.target)) {
        setIsAboutOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        closeAllMenus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Fragment>
      <header className="sticky top-0 z-40 w-full border-b border-black/5 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="relative mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:h-[84px] md:h-[88px] sm:px-8 lg:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60 focus-visible:ring-offset-2"
            aria-label="Emsphere Technologies home"
          >
            <Image
              src="/universal-images/header/emsphere-technologies-logo.webp"
              alt="Emsphere Technologies - Seamless Connect logo"
              width={550}
              height={143}
              priority
              className="h-9 w-auto sm:h-10 md:h-11 lg:h-12"
            />
          </Link>

          {/* Desktop Primary Navigation with Equal Gaps */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-9">
              {NAV_LINKS.map((link) => {
                if (link.isMegaMenu) {
                  return (
                    <li
                      key={link.label}
                      ref={megaMenuRef}
                      className="static"
                      onMouseEnter={handleMenuEnter}
                      onMouseLeave={handleMenuLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setIsProductOpen((prev) => !prev)}
                        aria-expanded={isProductOpen}
                        className={`nav-underline inline-flex items-center gap-1.5 h-10 px-1 text-[16px] xl:text-[16.5px] font-semibold transition-colors focus-visible:outline-none ${
                          isProductOpen ? "text-brand-blue" : "text-black hover:text-brand-blue"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDownIcon
                          className={`h-4 w-4 transition-transform duration-250 ease-out ${
                            isProductOpen ? "rotate-180 text-brand-blue" : "text-slate-500"
                          }`}
                        />
                      </button>

                      {/* Desktop Mega Menu Dropdown Container */}
                      <div
                        onMouseEnter={handleMenuEnter}
                        onMouseLeave={handleMenuLeave}
                        className={`absolute left-1/2 top-full -translate-x-1/2 pt-2.5 z-50 w-full max-w-[960px] px-4 transition-all duration-250 ease-out ${
                          isProductOpen
                            ? "visible opacity-100 translate-y-0 pointer-events-auto"
                            : "invisible opacity-0 translate-y-2 pointer-events-none"
                        }`}
                      >
                        {/* Seamless invisible hover bridge between header bar and mega menu */}
                        <div className="absolute -top-4 left-0 right-0 h-6 content-['']" />

                        {/* Mega Menu White Card: Stays Rock-Solid While Cursor is Inside */}
                        <div
                          onMouseEnter={handleMenuEnter}
                          onMouseLeave={handleMenuLeave}
                          className="relative rounded-2xl border border-black/5 bg-white p-8 sm:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04)]"
                        >
                          {/* Two-Column Grid: Left Column & Right Column */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 sm:gap-x-16">
                            {/* LEFT COLUMN: 4 Products with Equal Vertical Gaps */}
                            <div className="flex flex-col space-y-6 sm:space-y-7">
                              {/* 1. emHRMS */}
                              <Link
                                href="/human-resource-management-system"
                                onMouseEnter={handleMenuEnter}
                                onClick={() => setIsProductOpen(false)}
                                className="group block focus-visible:outline-none"
                              >
                                <div className="text-[16px] font-semibold text-slate-900 transition-colors group-hover:text-brand-blue">
                                  emHRMS
                                </div>
                                <div className="mt-1 text-[13.5px] text-slate-500 leading-normal">
                                  Seamlessly connect across the enterprise
                                </div>
                              </Link>

                              {/* 2. Contract Labour Management Software (Hovering Drops Down) */}
                              <div
                                onMouseEnter={handleClmsHover}
                                className="relative select-none"
                              >
                                <div className="group flex items-center justify-between">
                                  <Link
                                    href="/contract-labour-management-system-software"
                                    onMouseEnter={handleMenuEnter}
                                    onClick={() => setIsProductOpen(false)}
                                    className="flex-1 focus-visible:outline-none"
                                  >
                                    <div
                                      className={`text-[16px] font-semibold transition-colors ${
                                        isClmsOpen
                                          ? "text-brand-blue"
                                          : "text-slate-900 group-hover:text-brand-blue"
                                      }`}
                                    >
                                      Contract Labour management Software
                                    </div>
                                    <div className="mt-1 text-[13.5px] text-slate-500 leading-normal">
                                      End-to-end contractor lifecycle, compliances & billing
                                    </div>
                                  </Link>
                                  <button
                                    type="button"
                                    onClick={toggleClmsClick}
                                    aria-label="Toggle Contract Labour modules"
                                    className="ml-3 shrink-0 rounded p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-brand-blue focus-visible:outline-none"
                                  >
                                    <ChevronDownIcon
                                      className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                                        isClmsOpen ? "rotate-180 text-brand-blue" : "text-brand-blue/80"
                                      }`}
                                    />
                                  </button>
                                </div>

                                {/* CLMS Nested Dropdown Sub-menu: 4x2 Symmetrical Grid for Equal Gaps & Perfect Alignment */}
                                <div
                                  onMouseEnter={handleMenuEnter}
                                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                                    isClmsOpen
                                      ? "grid-rows-[1fr] opacity-100 mt-3 pt-2 pb-1"
                                      : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
                                  }`}
                                >
                                  <div className="overflow-hidden">
                                    <div className="rounded-xl bg-slate-50/70 p-4 border border-slate-100">
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                                        {/* Left Sub-column (4 Items) */}
                                        <div className="flex flex-col space-y-2.5">
                                          {CLMS_SUB_ITEMS.col1.map((item) => (
                                            <Link
                                              key={item.title}
                                              href={item.href}
                                              onMouseEnter={handleMenuEnter}
                                              onClick={() => setIsProductOpen(false)}
                                              className="text-[13.5px] font-medium text-slate-700 transition-colors hover:text-brand-blue focus-visible:outline-none"
                                            >
                                              {item.title}
                                            </Link>
                                          ))}
                                        </div>

                                        {/* Right Sub-column (4 Items, Horizontally Aligned Row by Row) */}
                                        <div className="flex flex-col space-y-2.5">
                                          {CLMS_SUB_ITEMS.col2.map((item) => (
                                            <Link
                                              key={item.title}
                                              href={item.href}
                                              onMouseEnter={handleMenuEnter}
                                              onClick={() => setIsProductOpen(false)}
                                              className="text-[13.5px] font-medium text-slate-700 transition-colors hover:text-brand-blue focus-visible:outline-none"
                                            >
                                              {item.title}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* 3. emCount Emergency Headcount System */}
                              <Link
                                href="/headcount-management-software"
                                onMouseEnter={handleMenuEnter}
                                onClick={() => setIsProductOpen(false)}
                                className="group block focus-visible:outline-none"
                              >
                                <div className="text-[16px] font-semibold text-slate-900 transition-colors group-hover:text-brand-blue">
                                  emCount Emergency Headcount System
                                </div>
                                <div className="mt-1 text-[13.5px] text-slate-500 leading-normal">
                                  Be prepared for emergencies
                                </div>
                              </Link>

                              {/* 4. emMeal-Canteen Management System */}
                              <Link
                                href="/canteen-management-system"
                                onMouseEnter={handleMenuEnter}
                                onClick={() => setIsProductOpen(false)}
                                className="group block focus-visible:outline-none"
                              >
                                <div className="text-[16px] font-semibold text-slate-900 transition-colors group-hover:text-brand-blue">
                                  emMeal-Canteen Management System
                                </div>
                                <div className="mt-1 text-[13.5px] text-slate-500 leading-normal">
                                  Orchestrate efficient canteen operations
                                </div>
                              </Link>
                            </div>

                            {/* RIGHT COLUMN: Products with Identical Vertical Gaps */}
                            <div className="flex flex-col space-y-6 sm:space-y-7">
                              {/* 1. emPayroll Management Software */}
                              <Link
                                href="/payroll-management-solution"
                                onMouseEnter={handleMenuEnter}
                                onClick={() => setIsProductOpen(false)}
                                className="group block focus-visible:outline-none"
                              >
                                <div className="text-[16px] font-semibold text-slate-900 transition-colors group-hover:text-brand-blue">
                                  emPayroll Management Software
                                </div>
                                <div className="mt-1 text-[13.5px] text-slate-500 leading-normal">
                                  Manage Employee Information, Salary and Compliance
                                </div>
                              </Link>

                              {/* 2. emWorkforce – System */}
                              <Link
                                href="/workforce-management-system"
                                onMouseEnter={handleMenuEnter}
                                onClick={() => setIsProductOpen(false)}
                                className="group block focus-visible:outline-none"
                              >
                                <div className="text-[16px] font-semibold text-slate-900 transition-colors group-hover:text-brand-blue">
                                  emWorkforce – System
                                </div>
                                <div className="mt-1 text-[13.5px] text-slate-500 leading-normal">
                                  Manage workforce in multiple locations
                                </div>
                              </Link>

                              {/* 3. emVisit Visitor Management System */}
                              <Link
                                href="/visitor-management-system"
                                onMouseEnter={handleMenuEnter}
                                onClick={() => setIsProductOpen(false)}
                                className="group block focus-visible:outline-none"
                              >
                                <div className="text-[16px] font-semibold text-slate-900 transition-colors group-hover:text-brand-blue">
                                  emVisit Visitor Management System
                                </div>
                                <div className="mt-1 text-[13.5px] text-slate-500 leading-normal">
                                  Cloud based, automated system, integrate with hardware
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                if (link.isAboutDropdown) {
                  return (
                    <li
                      key={link.label}
                      ref={aboutMenuRef}
                      className="static"
                      onMouseEnter={handleAboutEnter}
                      onMouseLeave={handleAboutLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setIsAboutOpen((prev) => !prev)}
                        aria-expanded={isAboutOpen}
                        className={`nav-underline inline-flex items-center gap-1.5 h-10 px-1 text-[16px] xl:text-[16.5px] font-semibold transition-colors focus-visible:outline-none ${
                          isAboutOpen ? "text-brand-blue" : "text-black hover:text-brand-blue"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDownIcon
                          className={`h-4 w-4 transition-transform duration-250 ease-out ${
                            isAboutOpen ? "rotate-180 text-brand-blue" : "text-slate-500"
                          }`}
                        />
                      </button>

                      {/* Desktop About Us Dropdown Container */}
                      <div
                        onMouseEnter={handleAboutEnter}
                        onMouseLeave={handleAboutLeave}
                        className={`absolute left-1/2 top-full -translate-x-1/2 pt-2.5 z-50 w-full max-w-[580px] px-4 transition-all duration-250 ease-out ${
                          isAboutOpen
                            ? "visible opacity-100 translate-y-0 pointer-events-auto"
                            : "invisible opacity-0 translate-y-2 pointer-events-none"
                        }`}
                      >
                        {/* Seamless invisible hover bridge between header bar and dropdown */}
                        <div className="absolute -top-4 left-0 right-0 h-6 content-['']" />

                        {/* About Us Card */}
                        <div
                          onMouseEnter={handleAboutEnter}
                          onMouseLeave={handleAboutLeave}
                          className="relative rounded-2xl border border-black/5 bg-white p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04)]"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-stretch">
                            {/* Left Column: Our story (highlighted card box matching design) */}
                            <Link
                              href={ABOUT_SUB_ITEMS.story.href}
                              onMouseEnter={handleAboutEnter}
                              onClick={() => setIsAboutOpen(false)}
                              className="group flex flex-col justify-center rounded-xl bg-slate-50/80 p-5 sm:p-6 border border-slate-100/90 transition-all duration-200 hover:bg-slate-100/90 hover:border-brand-blue/20 focus-visible:outline-none"
                            >
                              <div className="text-[16px] font-semibold text-slate-900 transition-colors group-hover:text-brand-blue">
                                {ABOUT_SUB_ITEMS.story.title}
                              </div>
                              <div className="mt-1 text-[13.5px] text-slate-500 leading-normal">
                                {ABOUT_SUB_ITEMS.story.desc}
                              </div>
                            </Link>

                            {/* Right Column: Clients & Testimonials */}
                            <div className="flex flex-col justify-center space-y-5 px-1 sm:px-2">
                              {ABOUT_SUB_ITEMS.rightCol.map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  onMouseEnter={handleAboutEnter}
                                  onClick={() => setIsAboutOpen(false)}
                                  className="group block focus-visible:outline-none"
                                >
                                  <div className="text-[16px] font-semibold text-slate-900 transition-colors group-hover:text-brand-blue">
                                    {item.title}
                                  </div>
                                  <div className="mt-1 text-[13.5px] text-slate-500 leading-normal">
                                    {item.desc}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="nav-underline inline-flex items-center h-10 px-1 text-[16px] xl:text-[16.5px] font-semibold text-black transition-colors hover:text-brand-blue focus-visible:outline-none"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop "Get Started" CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-[6px] bg-brand-gold px-7 py-3 text-[16px] font-semibold text-white transition-all duration-200 hover:bg-brand-gold-dark hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => (isMenuOpen ? closeAllMenus() : openMobileMenu())}
            className="relative z-[60] inline-flex h-11 w-11 items-center justify-center rounded-md text-black transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60 lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 top-0 block h-0.5 w-6 rounded-full bg-black transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-0.5 w-6 rounded-full bg-black transition-opacity duration-200 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] block h-0.5 w-6 rounded-full bg-black transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        onClick={closeAllMenus}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Off-canvas mobile drawer */}
      <aside
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-y-0 right-0 z-[55] flex h-dvh w-[85%] max-w-[380px] flex-col bg-white shadow-2xl transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-black/5 px-5 sm:h-[84px]">
          <Image
            src="/universal-images/header/emsphere-technologies-logo.webp"
            alt="Emsphere Technologies - Seamless Connect logo"
            width={550}
            height={143}
            className="h-8 w-auto sm:h-9"
          />
          <button
            type="button"
            onClick={closeAllMenus}
            aria-label="Close menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-black transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M1 1L17 17M17 1L1 17"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav aria-label="Mobile primary" data-lenis-prevent className="flex-1 overflow-y-auto px-5 py-4">
          <ul key={openCount} className="flex flex-col">
            {NAV_LINKS.map((link, index) => {
              if (link.isMegaMenu) {
                return (
                  <li
                    key={link.label}
                    className="drawer-link border-b border-black/5 py-1"
                    style={{ animationDelay: `${index * 45 + 80}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => setIsMobileProductOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between py-3 text-base font-semibold text-black focus-visible:outline-none"
                    >
                      <span className={isMobileProductOpen ? "text-brand-blue" : ""}>
                        {link.label}
                      </span>
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isMobileProductOpen ? "rotate-180 text-brand-blue" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Mobile Product Accordion Content */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                        isMobileProductOpen
                          ? "grid-rows-[1fr] opacity-100 mb-3"
                          : "grid-rows-[0fr] opacity-0 mb-0 pointer-events-none"
                      }`}
                    >
                      <div className="overflow-hidden space-y-2 pl-3 border-l-2 border-brand-blue/30 text-[14px]">
                        {/* 1. emHRMS */}
                        <Link
                          href="/human-resource-management-system"
                          onClick={closeAllMenus}
                          className="block py-1.5 font-medium text-slate-800 hover:text-brand-blue"
                        >
                          emHRMS
                        </Link>

                        {/* 2. Contract Labour management Software */}
                        <div className="py-1">
                          <div className="flex w-full items-center justify-between py-1 font-medium text-slate-800">
                            <Link
                              href="/contract-labour-management-system-software"
                              onClick={closeAllMenus}
                              className="flex-1 hover:text-brand-blue"
                            >
                              <span className={isMobileClmsOpen ? "text-brand-blue" : ""}>
                                Contract Labour management Software
                              </span>
                            </Link>
                            <button
                              type="button"
                              onClick={() => setIsMobileClmsOpen((prev) => !prev)}
                              aria-label="Toggle Contract Labour sub-menu"
                              className="p-1 text-slate-400 hover:text-brand-blue focus-visible:outline-none"
                            >
                              <ChevronDownIcon
                                className={`h-3.5 w-3.5 transition-transform duration-300 ${
                                  isMobileClmsOpen ? "rotate-180 text-brand-blue" : "text-slate-400"
                                }`}
                              />
                            </button>
                          </div>

                          <div
                            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                              isMobileClmsOpen
                                ? "grid-rows-[1fr] opacity-100 mt-2 mb-2"
                                : "grid-rows-[0fr] opacity-0 mt-0 mb-0 pointer-events-none"
                            }`}
                          >
                            <div className="overflow-hidden pl-3 border-l border-slate-200 space-y-1.5 text-[13px] text-slate-700">
                              {[...CLMS_SUB_ITEMS.col1, ...CLMS_SUB_ITEMS.col2].map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  onClick={closeAllMenus}
                                  className="block py-1 hover:text-brand-blue"
                                >
                                  {item.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* 3. emPayroll */}
                        <Link
                          href="/payroll-management-solution"
                          onClick={closeAllMenus}
                          className="block py-1.5 font-medium text-slate-800 hover:text-brand-blue"
                        >
                          emPayroll Management Software
                        </Link>

                        {/* 4. emWorkforce */}
                        <Link
                          href="/workforce-management-system"
                          onClick={closeAllMenus}
                          className="block py-1.5 font-medium text-slate-800 hover:text-brand-blue"
                        >
                          emWorkforce – System
                        </Link>

                        {/* 5. emCount */}
                        <Link
                          href="/headcount-management-software"
                          onClick={closeAllMenus}
                          className="block py-1.5 font-medium text-slate-800 hover:text-brand-blue"
                        >
                          emCount Emergency Headcount System
                        </Link>

                        {/* 6. emVisit */}
                        <Link
                          href="/visitor-management-system"
                          onClick={closeAllMenus}
                          className="block py-1.5 font-medium text-slate-800 hover:text-brand-blue"
                        >
                          emVisit Visitor Management System
                        </Link>

                        {/* 7. emMeal */}
                        <Link
                          href="/canteen-management-system"
                          onClick={closeAllMenus}
                          className="block py-1.5 font-medium text-slate-800 hover:text-brand-blue"
                        >
                          emMeal-Canteen Management System
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              }

              if (link.isAboutDropdown) {
                return (
                  <li
                    key={link.label}
                    className="drawer-link border-b border-black/5 py-1"
                    style={{ animationDelay: `${index * 45 + 80}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => setIsMobileAboutOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between py-3 text-base font-semibold text-black focus-visible:outline-none"
                    >
                      <span className={isMobileAboutOpen ? "text-brand-blue" : ""}>
                        {link.label}
                      </span>
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isMobileAboutOpen ? "rotate-180 text-brand-blue" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Mobile About Accordion Content */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                        isMobileAboutOpen
                          ? "grid-rows-[1fr] opacity-100 mb-3"
                          : "grid-rows-[0fr] opacity-0 mb-0 pointer-events-none"
                      }`}
                    >
                      <div className="overflow-hidden space-y-2.5 pl-3 border-l-2 border-brand-blue/30 text-[14px]">
                        {/* 1. Our story */}
                        <Link
                          href={ABOUT_SUB_ITEMS.story.href}
                          onClick={closeAllMenus}
                          className="group block py-1"
                        >
                          <div className="font-semibold text-slate-900 group-hover:text-brand-blue">
                            {ABOUT_SUB_ITEMS.story.title}
                          </div>
                          <div className="text-[12.5px] text-slate-500">
                            {ABOUT_SUB_ITEMS.story.desc}
                          </div>
                        </Link>

                        {/* 2. Clients */}
                        <Link
                          href={ABOUT_SUB_ITEMS.rightCol[0].href}
                          onClick={closeAllMenus}
                          className="group block py-1"
                        >
                          <div className="font-semibold text-slate-900 group-hover:text-brand-blue">
                            {ABOUT_SUB_ITEMS.rightCol[0].title}
                          </div>
                          <div className="text-[12.5px] text-slate-500">
                            {ABOUT_SUB_ITEMS.rightCol[0].desc}
                          </div>
                        </Link>

                        {/* 3. Testimonials */}
                        <Link
                          href={ABOUT_SUB_ITEMS.rightCol[1].href}
                          onClick={closeAllMenus}
                          className="group block py-1"
                        >
                          <div className="font-semibold text-slate-900 group-hover:text-brand-blue">
                            {ABOUT_SUB_ITEMS.rightCol[1].title}
                          </div>
                          <div className="text-[12.5px] text-slate-500">
                            {ABOUT_SUB_ITEMS.rightCol[1].desc}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li
                  key={link.href}
                  className="drawer-link border-b border-black/5"
                  style={{ animationDelay: `${index * 45 + 80}ms` }}
                >
                  <Link
                    href={link.href}
                    onClick={closeAllMenus}
                    className="nav-underline block w-full py-3.5 text-base font-semibold text-black focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Footer CTA */}
        <div className="shrink-0 border-t border-black/5 px-5 py-5">
          <Link
            href="/contact-us"
            onClick={closeAllMenus}
            className="flex w-full items-center justify-center rounded-[5px] bg-brand-gold px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-brand-gold-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2"
          >
            Get Started
          </Link>
        </div>
      </aside>
    </Fragment>
  );
}
