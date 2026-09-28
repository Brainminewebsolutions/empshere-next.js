"use client";

import { useState } from "react";

const PRODUCTS = [
  "emHRMS (Human Resource Management System)",
  "Contract Labour Management System (CLMS)",
  "emPayroll Management Software",
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

const fontGeist = "font-[family-name:var(--font-geist-sans)]";
const inputClass = `w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all ${fontGeist}`;
const selectClass = `w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all ${fontGeist}`;

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
      <div className={`rounded-2xl border border-emerald-200 bg-emerald-50/80 p-8 sm:p-10 text-center shadow-sm ${fontGeist}`}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900">Thank You for Reaching Out!</h3>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
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
          className={`mt-6 inline-flex items-center justify-center rounded-lg bg-white border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:bg-slate-50 cursor-pointer ${fontGeist}`}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`rounded-2xl border border-black/5 bg-white p-6 sm:p-8 md:p-10 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.07)] ${fontGeist}`}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Request a Demo or Callback</h2>
          <p className="mt-1 text-sm text-slate-500 leading-normal">
            Fill in your details below and our team will get in touch shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
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
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Work Email <span className="text-red-500">*</span>
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
            <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Mobile / Phone <span className="text-red-500">*</span>
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
            <label htmlFor="company" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Company Name <span className="text-red-500">*</span>
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
            <label htmlFor="product" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Product / Solution <span className="text-red-500">*</span>
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
            <label htmlFor="companySize" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
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
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Your Requirements / Questions
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your organization's requirements, current challenges, or preferred demo timings..."
            className={`w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all resize-y ${fontGeist}`}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-brand-gold px-8 py-3.5 text-base font-semibold text-slate-950 transition-all duration-200 hover:bg-brand-gold-dark hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer ${fontGeist}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Processing Request...
              </>
            ) : (
              <>
                Submit Inquiry
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
          <p className="mt-3 text-xs text-slate-400">
            We value your privacy. Your information is kept strictly confidential and never shared with third parties.
          </p>
        </div>
      </div>
    </form>
  );
}
