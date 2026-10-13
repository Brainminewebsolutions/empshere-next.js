"use client";

import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const fontInter = "font-[family-name:var(--font-inter)]";

const PRODUCTS = [
  "emHRMS (Human Resource Management System)",
  "Contract Labour Management System (CLMS)",
  "emPay Management Software",
  "emWorkforce (Attendance & Leave System)",
  "emVisit (Visitor Management System)",
  "emMeal (Canteen Management System)",
  "emCount (Emergency Headcount System)",
  "General Inquiry / Consultation",
];

const COMPANY_SIZES = [
  "1 – 100 employees",
  "101 – 500 employees",
  "501 – 1,000 employees",
  "1,001 – 5,000 employees",
  "5,000+ employees",
];

const inputClass = `w-full rounded-[9px] border border-[#dddddd] bg-white px-3.5 py-2.5 text-sm text-[#1f1f1f] placeholder:text-black/35 hover:border-[#bcd8ee] focus:border-[#0077c2] focus:outline-none focus:ring-4 focus:ring-[#0077c2]/12 transition-all ${fontInter}`;
const selectClass = `w-full rounded-[9px] border border-[#dddddd] bg-white px-3.5 py-2.5 text-sm text-[#1f1f1f] focus:border-[#0077c2] focus:outline-none focus:ring-4 focus:ring-[#0077c2]/12 transition-all ${fontInter}`;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    product: PRODUCTS[0],
    companySize: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate reliable submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  if (submitted) {
    return (
      <div className={`relative overflow-hidden rounded-2xl border border-[#EFB000]/30 bg-white p-8 sm:p-10 text-center shadow-[inset_0_0_0_1px_#e5e5e5,0_12px_28px_-12px_rgba(0,0,0,0.1)] ${fontInter}`}>
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-[#EFB000]" />
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d1f4e3] text-[#0b8f63] mb-4 shadow-sm">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#1f1f1f]">Thank You for Reaching Out!</h3>
        <p className="mt-2 text-sm text-black/60 max-w-md mx-auto leading-relaxed">
          We have received your inquiry. One of our enterprise consultants will contact you within 24 business hours to discuss your requirements.
        </p>
        <button
          type="button"
          onClick={() => {
            setFormData({
              fullName: "",
              email: "",
              phone: "",
              company: "",
              product: PRODUCTS[0],
              companySize: "",
              message: "",
            });
            setSubmitted(false);
          }}
          className={`mt-6 inline-flex items-center justify-center rounded-[9px] bg-[#EFB000] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#d99e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.45)] cursor-pointer ${fontInter}`}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 md:p-10 shadow-[inset_0_0_0_1px_#e5e5e5,0_12px_28px_-12px_rgba(0,0,0,0.1)] ${inter.variable} ${fontInter}`}
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-[#EFB000]" />
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1f1f1f] tracking-tight sm:text-[1.65rem]">
            Request a Demo or Callback
          </h2>
          <p className="mt-1 text-sm text-black/60 leading-normal">
            Fill in your details below and our team will get in touch shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-[13px] font-semibold text-[#1f1f1f] mb-1.5">
              Full Name <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Rajesh Sharma"
              className={inputClass}
            />
          </div>

          {/* Work Email */}
          <div>
            <label htmlFor="email" className="block text-[13px] font-semibold text-[#1f1f1f] mb-1.5">
              Work Email <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className={inputClass}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-[13px] font-semibold text-[#1f1f1f] mb-1.5">
              Mobile / Phone <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className={inputClass}
            />
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="company" className="block text-[13px] font-semibold text-[#1f1f1f] mb-1.5">
              Company Name <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Acme Industries Ltd."
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Product of Interest */}
          <div>
            <label htmlFor="product" className="block text-[13px] font-semibold text-[#1f1f1f] mb-1.5">
              Product / Solution <span className="text-[#ef4444]">*</span>
            </label>
            <select
              id="product"
              name="product"
              required
              value={formData.product}
              onChange={handleChange}
              className={selectClass}
            >
              {PRODUCTS.map((prod) => (
                <option key={prod} value={prod}>
                  {prod}
                </option>
              ))}
            </select>
          </div>

          {/* Company Size */}
          <div>
            <label htmlFor="companySize" className="block text-[13px] font-semibold text-[#1f1f1f] mb-1.5">
              Workforce / Employee Size
            </label>
            <select
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Select workforce size...</option>
              {COMPANY_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Requirements / Message */}
        <div>
          <label htmlFor="message" className="block text-[13px] font-semibold text-[#1f1f1f] mb-1.5">
            Your Requirements / Questions
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your organization's requirements, current challenges, or preferred demo timings..."
            className={`w-full rounded-[9px] border border-[#dddddd] px-3.5 py-2.5 text-sm text-[#1f1f1f] placeholder:text-black/35 hover:border-[#bcd8ee] focus:border-[#0077c2] focus:outline-none focus:ring-4 focus:ring-[#0077c2]/12 transition-all resize-y ${fontInter}`}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`group/btn inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-[9px] bg-[#EFB000] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EFB000] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer ${fontInter}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Processing Request...
              </>
            ) : (
              <>
                Submit Inquiry
                <svg className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
          <p className="mt-3 text-xs text-black/50">
            We value your privacy. Your information is kept strictly confidential and never shared with third parties.
          </p>
        </div>
      </div>
    </form>
  );
}
