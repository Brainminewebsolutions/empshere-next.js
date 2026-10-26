"use client";

import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";

// Self-hosted by next/font (no request to Google Fonts at runtime).
const instrumentSans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fontVariables = `${instrumentSans.variable} ${inter.variable}`;


function HomeIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5h-4v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.167 10h11.666M10.833 5l5 5-5 5" />
    </svg>
  );
}

const NOT_FOUND_CSS = `
@keyframes notFoundEntrance {
  0% {
    opacity: 0;
    transform: translateY(18px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes sphereFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-9px) rotate(4deg);
  }
}

@keyframes ringSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes ambientGlow {
  0%, 100% {
    transform: scale(1) translate(0, 0);
    opacity: 0.55;
  }
  50% {
    transform: scale(1.15) translate(14px, -12px);
    opacity: 0.85;
  }
}

.emsphere-not-found {
  --blue: #0077c2;
  --blue-dark: #0061af;
  --blue-light: #e6f4fd;
  --gold: #efb000;
  --gold-dark: #d69e00;
  --gold-light: #fff8e4;
  --navy: #02183f;
  --text-primary: #1f2937;
  --text-secondary: #4b5563;
  --text-muted: #6b7280;
  --font-heading: var(--font-instrument-sans), "Instrument Sans", system-ui, sans-serif;
  --font-label: var(--font-inter), "Inter", system-ui, sans-serif;

  font-family: var(--font-heading);
  position: relative;
  flex: 1;
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%);
  overflow: hidden;
  padding: 56px 24px;
}

.not-found-glow-gold {
  position: absolute;
  top: 15%;
  left: 14%;
  width: 340px;
  height: 340px;
  background: radial-gradient(circle, rgba(239, 176, 0, 0.16) 0%, rgba(239, 176, 0, 0) 70%);
  border-radius: 50%;
  pointer-events: none;
  filter: blur(45px);
  animation: ambientGlow 8s ease-in-out infinite;
}

.not-found-glow-blue {
  position: absolute;
  bottom: 12%;
  right: 14%;
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, rgba(0, 119, 194, 0.14) 0%, rgba(0, 119, 194, 0) 70%);
  border-radius: 50%;
  pointer-events: none;
  filter: blur(50px);
  animation: ambientGlow 9s ease-in-out infinite reverse;
}

.not-found-card {
  position: relative;
  z-index: 2;
  max-width: 660px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: notFoundEntrance 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.not-found-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--gold-light);
  border: 1px solid rgba(239, 176, 0, 0.45);
  color: #a06e00;
  padding: 6px 16px;
  border-radius: 9999px;
  font-family: var(--font-label);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 22px;
}

.not-found-badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 8px var(--gold);
}

.not-found-hero-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 18px;
  user-select: none;
}

.not-found-digit {
  font-family: var(--font-heading);
  font-size: 132px;
  font-weight: 800;
  line-height: 1;
  color: var(--navy);
  letter-spacing: -0.04em;
  text-shadow: 0 8px 24px rgba(2, 24, 63, 0.08);
}

.not-found-sphere-wrap {
  position: relative;
  width: 112px;
  height: 112px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: sphereFloat 4.5s ease-in-out infinite;
}

.not-found-sphere-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.not-found-title {
  font-size: 34px;
  font-weight: 700;
  color: var(--navy);
  margin: 0 0 12px;
  line-height: 1.25;
}

.not-found-desc {
  font-size: 16.5px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 0 34px;
  max-width: 520px;
}

.not-found-cta-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 0;
  width: 100%;
}

.not-found-btn-home {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--gold);
  color: #ffffff;
  padding: 13px 28px;
  border-radius: 9px;
  font-family: var(--font-label);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.01em;
  box-shadow: 0 8px 20px -4px rgba(239, 176, 0, 0.45);
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease, box-shadow 0.22s ease;
}

.not-found-btn-home:hover {
  background: var(--gold-dark);
  transform: translateY(-2px);
  box-shadow: 0 12px 26px -4px rgba(239, 176, 0, 0.55);
}

.not-found-btn-home:active {
  transform: translateY(0);
}

.not-found-btn-home svg {
  width: 17px;
  height: 17px;
  transition: transform 0.2s ease;
}

.not-found-btn-home:hover svg {
  transform: scale(1.1);
}

.not-found-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #ffffff;
  color: var(--gold);
  border: 1.5px solid var(--gold);
  padding: 12px 24px;
  border-radius: 9px;
  font-family: var(--font-label);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.not-found-btn-secondary:hover {
  background: #fffdf5;
  border-color: var(--gold-dark);
  color: var(--gold-dark);
  transform: translateY(-2px);
}

.not-found-btn-secondary:active {
  transform: translateY(0);
}

.not-found-btn-secondary svg {
  width: 15px;
  height: 15px;
  transition: transform 0.2s ease;
}

.not-found-btn-secondary:hover svg {
  transform: translateX(3px);
}

@media (max-width: 640px) {
  .emsphere-not-found {
    padding: 44px 20px;
  }
  .not-found-digit {
    font-size: 90px;
  }
  .not-found-sphere-wrap {
    width: 76px;
    height: 76px;
  }
  .not-found-title {
    font-size: 26px;
  }
  .not-found-desc {
    font-size: 15px;
  }
  .not-found-cta-group {
    flex-direction: column;
    width: 100%;
  }
  .not-found-btn-home,
  .not-found-btn-secondary {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .not-found-card,
  .not-found-sphere-wrap,
  .not-found-glow-gold,
  .not-found-glow-blue {
    animation: none !important;
    transition: none !important;
  }
}
`;

export default function NotFound() {
  return (
    <main className={`emsphere-not-found ${fontVariables}`}>
      <title>404 - Page Not Found | Emsphere Technologies</title>
      <meta name="robots" content="noindex, follow" />
      <style>{NOT_FOUND_CSS}</style>

      {/* Decorative ambient glowing accents */}
      <div className="not-found-glow-gold" aria-hidden="true" />
      <div className="not-found-glow-blue" aria-hidden="true" />

      <div className="not-found-card">
        {/* Top Status Pill */}
        <div className="not-found-badge">
          <span className="not-found-badge-dot" />
          <span>Error 404 • Page Not Found</span>
        </div>

        {/* 404 Hero Display with animated emSphere central globe */}
        <div className="not-found-hero-row" aria-label="404 Error">
          <span className="not-found-digit">4</span>
          <div className="not-found-sphere-wrap">
            <svg
              className="not-found-sphere-svg"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="sphereGrad" cx="38%" cy="38%" r="62%">
                  <stop offset="0%" stopColor="#ffd85e" />
                  <stop offset="50%" stopColor="#efb000" />
                  <stop offset="100%" stopColor="#d69e00" />
                </radialGradient>
                <linearGradient id="orbitGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0077c2" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#02183f" stopOpacity="0.35" />
                </linearGradient>
              </defs>

              {/* Dashed outer orbit ring */}
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="#efb000"
                strokeWidth="1.5"
                strokeDasharray="5 5"
                opacity="0.35"
              />

              {/* Tilted orbital ring 1 (blue) */}
              <ellipse
                cx="60"
                cy="60"
                rx="52"
                ry="22"
                transform="rotate(-28 60 60)"
                stroke="url(#orbitGradBlue)"
                strokeWidth="2.5"
              />

              {/* Glowing emSphere sphere */}
              <circle cx="60" cy="60" r="32" fill="url(#sphereGrad)" />

              {/* Specular glass reflection */}
              <circle cx="51" cy="51" r="10" fill="#ffffff" opacity="0.4" />

              {/* Tilted orbital ring 2 (gold/white highlight) */}
              <ellipse
                cx="60"
                cy="60"
                rx="46"
                ry="18"
                transform="rotate(35 60 60)"
                stroke="#ffffff"
                strokeWidth="1.8"
                opacity="0.75"
              />

              {/* Orbiting connect node */}
              <circle
                cx="95"
                cy="42"
                r="4.5"
                fill="#0077c2"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="not-found-digit">4</span>
        </div>

        {/* Message */}
        <h1 className="not-found-title">Oops! Page Not Found</h1>
        <p className="not-found-desc">
          The page you are looking for might have been moved, renamed, or is temporarily
          unavailable. Let&apos;s get you back to where you need to be.
        </p>

        {/* CTA Buttons */}
        <div className="not-found-cta-group">
          <Link href="/" className="not-found-btn-home">
            <HomeIcon />
            <span>Go to Home</span>
          </Link>
          <Link href="/contact-us" className="not-found-btn-secondary">
            <span>Contact Us</span>
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </main>
  );
}
