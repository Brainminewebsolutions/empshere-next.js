"use client";

/* --------------------------------------------------------------------
   "Serving the HR and Industrial Relations" product showcase, saved from
   the home page so it can be reused: product name + description on the
   left, product tabs, prev/next arrows and the emHRMS dashboard screenshot
   on the right. Self-contained: styles are scoped under .homeDashboard.
   -------------------------------------------------------------------- */

import { useState } from "react";
import {
  ForkKnife,
  HardHat,
  IdentificationBadge,
  Money,
  UserCheck,
  UsersThree,
} from "@phosphor-icons/react/ssr";
import emhrmsDashboard from "@/app/images/homeimages/emhrms-dashboard-screenshot.png";

const SHOWCASE_PRODUCTS = [
  {
    id: "emHRMS",
    name: "emHRMS",
    desc: "emHRMS can manage a life cycle of an employee and\nhelps to automate all the HR Process in the company.\nIt can reduce the day to day work effort by 40%.",
    ctaLink: "/human-resource-management-system",
    icon: UsersThree,
  },
  {
    id: "emCLMS",
    name: "emCLMS",
    desc: "emContract Labour management software is an end to end system covering all aspects of labour management.",
    ctaLink: "/contract-labour-management-system-software",
    icon: HardHat,
  },
  {
    id: "emPayroll",
    name: "emPay",
    desc: "emPay helps organizations to manage the complete payroll activities.",
    ctaLink: "/payroll-management-solution",
    icon: Money,
  },
  {
    id: "emWorkForce",
    name: "emWorkForce",
    desc: "Manage your employee life cycle from onboarding \nto exit, publish letters and more.",
    ctaLink: "/workforce-management-system",
    icon: UserCheck,
  },
  {
    id: "emVisit",
    name: "emVisit",
    desc: "emVisit is a fully automated and comprehensive cloud based visitor management system software.",
    ctaLink: "/visitor-management-system",
    icon: IdentificationBadge,
  },
  {
    id: "emMeal",
    name: "emMeal",
    desc: "emMeal help you orchestrate a quick and efficient operation to cover a large section of employees in a\nsystematic and hassle-free manner",
    ctaLink: "/canteen-management-system",
    icon: ForkKnife,
  },
];

function ArrowRightIcon(props) {
  return (
    <svg viewBox="0 0 15 12" fill="none" aria-hidden="true" {...props}>
      <path
        d="M14.86 6.315c.09-.087.14-.204.14-.327c0-.122-.05-.239-.14-.326L9.115.124a.5.5 0 0 0-.69.724L13.02 5.53H.5a.5.5 0 0 0 0 1h12.52l-4.595 4.68a.5.5 0 0 0 .69.723z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronIcon({ direction = "left", ...props }) {
  return (
    <svg
      viewBox="0 0 6 11"
      fill="none"
      aria-hidden="true"
      style={{ transform: direction === "right" ? "scaleX(-1)" : undefined }}
      {...props}
    >
      <path
        d="M5.5 10.3 1 5.5 5.5.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const HOME_DASHBOARD_CSS = `
.homeDashboard {
  --gold: #efb000;
  --gold-dark: #d69e00;
  --text: #000000;
  --text-64: rgba(0, 0, 0, 0.64);
  --font-heading: "Instrument Sans", system-ui, sans-serif;
  --font-label: "Inter", system-ui, sans-serif;
  background: #FFFFFA;
  padding: 88px 0;
  width: 100%;
  font-family: var(--font-heading);
  color: var(--text);
}

.homeDashboard .hdContainer {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

.homeDashboard .hdGrid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 56px;
  align-items: start;
}

.homeDashboard .hdLeft,
.homeDashboard .hdRight {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.homeDashboard .hdTitle {
  font-size: 34px;
  font-weight: 600;
  line-height: 1.25;
  margin: 0 0 54px;
  white-space: pre-line;
}

@keyframes hdFadeInProduct {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.homeDashboard .hdInfo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  animation: hdFadeInProduct 0.25s ease-out;
}

.homeDashboard .hdIcon {
  width: 65px;
  height: 65px;
  border-radius: 7px;
  background: var(--gold);
  color: #ffffff;
  font-size: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.homeDashboard .hdProductName {
  font-size: 34px;
  font-weight: 600;
  margin: 0;
}

.homeDashboard .hdDesc {
  font-size: 17px;
  line-height: 1.65;
  color: var(--text-64);
  margin: 0;
  white-space: pre-line;
  min-height: 84px;
}

.homeDashboard .hdButton {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  padding: 13px 26px;
  background: var(--gold);
  font-family: var(--font-label);
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease;
}

.homeDashboard .hdButton:hover {
  background: var(--gold-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 18px -4px rgba(239, 176, 0, 0.45);
}

.homeDashboard .hdButton svg {
  width: 15px;
  height: 15px;
  transition: transform 0.2s ease;
}

.homeDashboard .hdButton:hover svg {
  transform: translateX(3px);
}

.homeDashboard .hdArrowsRow {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 14px;
}

.homeDashboard .hdArrow {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #c7c7c7;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.homeDashboard .hdArrow:hover {
  background: #f7f7f7;
  border-color: #999999;
  transform: scale(1.04);
}

.homeDashboard .hdArrow:active {
  transform: scale(0.96);
}

.homeDashboard .hdArrow svg {
  width: 7px;
  height: 12px;
}

.homeDashboard .hdTabs {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  margin-bottom: 24px;
}

.homeDashboard .hdTab {
  border: none;
  cursor: pointer;
  border-radius: 7px;
  padding: 10px 4px;
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 600;
  background: #ffffff;
  box-shadow: inset 0 0 0 1px #dcdcdc;
  color: var(--text);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.homeDashboard .hdTab:hover {
  background: #f7f7f7;
  transform: translateY(-2px);
}

.homeDashboard .hdTabActive,
.homeDashboard .hdTabActive:hover {
  background: #02183f;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(2, 24, 63, 0.3);
  transform: translateY(-2px);
}

.homeDashboard .hdScreenshotWrap {
  background: #ffffff;
  box-shadow: inset 0 0 0 1px #e2e8f0, 0px 4px 16px -6px rgba(0, 0, 0, 0.08);
  border-radius: 11px;
  padding: 8px;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.homeDashboard .hdScreenshotWrap:hover {
  transform: translateY(-4px);
  box-shadow: inset 0 0 0 1px var(--gold), 0px 12px 28px -8px rgba(0, 0, 0, 0.14);
}

.homeDashboard .hdScreenshot {
  width: 100%;
  height: auto;
  border-radius: 6px;
  display: block;
}

@media (max-width: 1080px) {
  .homeDashboard .hdContainer {
    padding: 0 20px;
  }

  .homeDashboard .hdGrid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .homeDashboard {
    padding: 48px 0;
  }

  .homeDashboard .hdContainer {
    padding: 0 16px;
  }

  .homeDashboard .hdTitle {
    font-size: 24px;
    margin-bottom: 16px;
    white-space: normal;
    text-align: center;
  }

  .homeDashboard .hdInfo {
    align-items: center;
    text-align: center;
  }

  .homeDashboard .hdProductName {
    font-size: 24px;
  }

  .homeDashboard .hdDesc {
    font-size: 14.5px;
    line-height: 1.55;
    min-height: auto;
    white-space: normal;
  }

  .homeDashboard .hdArrow {
    width: 40px;
    height: 40px;
  }

  .homeDashboard .hdTabs {
    display: flex;
    overflow-x: auto;
    gap: 8px;
    padding-bottom: 8px;
    scrollbar-width: none;
  }

  .homeDashboard .hdTabs::-webkit-scrollbar {
    display: none;
  }

  .homeDashboard .hdTab {
    padding: 8px 14px;
    font-size: 13.5px;
    flex-shrink: 0;
  }

  .homeDashboard .hdScreenshotWrap {
    padding: 6px;
    border-radius: 8px;
  }
}
`;

export default function HomeDashboard({ title = "Serving the HR and \nIndustrial Relations" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = SHOWCASE_PRODUCTS[activeIndex];
  const ProductIcon = activeProduct.icon;
  const count = SHOWCASE_PRODUCTS.length;

  return (
    <section className="homeDashboard">
      <style>{HOME_DASHBOARD_CSS}</style>
      <div className="hdContainer">
        <div className="hdGrid">
          <div className="hdLeft">
            <h2 className="hdTitle">{title}</h2>

            <div className="hdInfo" key={activeProduct.id}>
              <span className="hdIcon" aria-hidden="true">
                <ProductIcon weight="fill" />
              </span>
              <h3 className="hdProductName">{activeProduct.name}</h3>
              <p className="hdDesc">{activeProduct.desc}</p>
              <a className="hdButton" href={activeProduct.ctaLink}>
                KNOW MORE
                <ArrowRightIcon />
              </a>
            </div>
          </div>

          <div className="hdRight">
            <div className="hdArrowsRow">
              <button
                type="button"
                className="hdArrow"
                aria-label="Previous product"
                onClick={() => setActiveIndex((i) => (i - 1 + count) % count)}
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                className="hdArrow"
                aria-label="Next product"
                onClick={() => setActiveIndex((i) => (i + 1) % count)}
              >
                <ChevronIcon direction="right" />
              </button>
            </div>

            <div className="hdTabs">
              {SHOWCASE_PRODUCTS.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  className={`hdTab ${index === activeIndex ? "hdTabActive" : ""}`}
                  onClick={() => setActiveIndex(index)}
                >
                  {product.name}
                </button>
              ))}
            </div>

            <div className="hdScreenshotWrap">
              <img
                className="hdScreenshot"
                src={emhrmsDashboard.src}
                alt="emHRMS dashboard showing employee lifecycle and HR process automation"
                width={emhrmsDashboard.width}
                height={emhrmsDashboard.height}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
