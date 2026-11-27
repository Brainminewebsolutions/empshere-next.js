/* --------------------------------------------------------------------
   Backup: "Our Inception & Milestones" timeline from the About Us page.
   Hidden on request, to be added back later.

   To add it back, in app/about-us/page.jsx:
     1. import InceptionMilestones from "@/components/about/InceptionMilestones";
     2. place <InceptionMilestones /> where the section should appear
        (it was between the "our-story" and "leadership" sections).

   It must be rendered inside the About page's ".about-page" wrapper, which
   supplies the shared styles (container, section headings, pill badge,
   scroll reveal) and the observer that animates it in.
   -------------------------------------------------------------------- */
import {
  CheckCircle,
  Factory,
  Fingerprint,
  Flag,
  Plant,
  ShieldCheck,
  Sparkle,
  TrendUp,
  UsersThree,
} from "@phosphor-icons/react/ssr";

const INCEPTION_MILESTONES = [
  {
    year: "2015",
    icon: Flag,
    title: "Inception in Pune",
    subtitle: "The Foundation of emSphere",
    description:
      "Established in Pune, Maharashtra. Born out of direct ground-level observations of the massive gap between manufacturing plant registers, contract labour management regulations, and legacy ERP systems.",
    highlight: "Incorporated with a mission to digitalize industrial workforces",
  },
  {
    year: "2017",
    icon: Fingerprint,
    title: "Hardware-Native Access",
    subtitle: "Turnstile & Biometric Integration",
    description:
      "Pioneered direct firmware integration with facial biometric terminals and tripod turnstiles, establishing real-time statutory compliance blocking at physical factory access points.",
    highlight: "Zero-latency shop-floor access control",
  },
  {
    year: "2019",
    icon: Factory,
    title: "Multi-Plant Expansion",
    subtitle: "Industrial Manufacturing Scale",
    description:
      "Scaled deployments across 50+ major industrial plants for manufacturing titans including Varroc Excellence (28+ plants) and Yazaki (7 plants, 12,000+ workers).",
    highlight: "End-to-end CLMS & biometric rollouts nationwide",
  },
  {
    year: "2021",
    icon: ShieldCheck,
    title: "ISO 27001 & Cloud Suite",
    subtitle: "Gold Standard Security & Cloud Scaling",
    description:
      "Achieved ISO/IEC 27001:2022 certification. Launched the high-availability multi-tenant cloud edition while preserving robust on-premise industrial gateways for remote manufacturing hubs.",
    highlight: "Bank-grade data security & high uptime SLA",
  },
  {
    year: "2023",
    icon: UsersThree,
    title: "40,000+ Workforce Scale",
    subtitle: "Enterprise Governance with Mahindra & Nerolac",
    description:
      "Selected by Mahindra & Mahindra (Auto & Farm Sector) to govern 40,000+ contract labourers across multiple locations. Streamlined Yashaswi’s 65,000+ employees across 500+ client sites.",
    highlight: "Massive scale industrial compliance governance",
  },
  {
    year: "2025–2026",
    icon: Sparkle,
    title: "AI-Native Workforce Suite",
    subtitle: "Surpassing 2,000,000+ Satisfied Users",
    description:
      "Introduced predictive headcount planning, AI anomaly detection, smart mobile self-service apps, and the unified emPay payroll engine, powering over 2 million daily workforce interactions.",
    highlight: "Next-gen intelligent workforce management platform",
  },
];

const MILESTONES_CSS = `
/* ==========================================================================
   HONO-inspired Inception & Milestones Timeline (2015-2026)
   ========================================================================== */
.about-page .inceptionSection {
  padding: 96px 0 104px;
  background:
    radial-gradient(circle at 12% 18%, rgba(239, 176, 0, 0.08) 0, transparent 38%),
    radial-gradient(circle at 88% 82%, rgba(239, 176, 0, 0.08) 0, transparent 40%),
    linear-gradient(180deg, #FFFFFA 0%, #FFF9E6 50%, #FFFFFA 100%);
  border-bottom: 1px solid #f0f0dc;
  position: relative;
  overflow: hidden;
}

/* Milestone tree: a gold trunk down the middle, a node per year, and the
   milestone cards branching off alternately to the left and right. */
.about-page .milestoneTree {
  --node-size: 58px;
  --branch-gap: 44px;
  position: relative;
  max-width: 1120px;
  margin: 56px auto 0;
  padding: 0;
  list-style: none;
}

.about-page .milestoneTrunk {
  position: absolute;
  top: 28px;
  bottom: 28px;
  left: 50%;
  width: 4px;
  margin-left: -2px;
  border-radius: 4px;
  background: rgba(239, 176, 0, 0.16);
  overflow: hidden;
}

.about-page .milestoneTrunkFill {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #ffd34d 0%, #EFB000 55%, #d69e00 100%);
  transform: scaleY(0);
  transform-origin: top center;
  transition: transform 2.2s cubic-bezier(0.65, 0, 0.35, 1);
}

.about-page .milestoneTrunk.reveal-visible .milestoneTrunkFill {
  transform: scaleY(1);
}

.about-page .milestoneRoot,
.about-page .milestoneTip {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
}

.about-page .milestoneRoot {
  margin-bottom: 36px;
}

.about-page .milestoneTip {
  margin-top: 8px;
}

.about-page .milestoneCap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 999px;
  background: #EFB000;
  color: #ffffff;
  font-family: var(--font-label);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  box-shadow: 0 10px 24px -10px rgba(214, 158, 0, 0.7);
}

.about-page .milestoneTip .milestoneCap {
  background: #ffffff;
  color: #9c6c00;
  border: 1.5px solid rgba(239, 176, 0, 0.55);
  box-shadow: 0 8px 20px -12px rgba(214, 158, 0, 0.6);
}

.about-page .milestoneCap svg {
  font-size: 16px;
}

.about-page .milestoneBranch {
  position: relative;
  display: grid;
  grid-template-columns: 1fr calc(var(--node-size) + var(--branch-gap) * 2) 1fr;
  align-items: center;
  margin-bottom: 30px;
}

.about-page .milestoneBranch:last-of-type {
  margin-bottom: 36px;
}

.about-page .milestoneNode {
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
  position: relative;
  z-index: 1;
  width: var(--node-size);
  height: var(--node-size);
  border-radius: 50%;
  background: #ffffff;
  border: 3px solid #EFB000;
  color: #d69e00;
  display: grid;
  place-items: center;
  font-size: 24px;
  box-shadow: 0 0 0 6px #FFF6D9, 0 10px 22px -8px rgba(214, 158, 0, 0.55);
  transition: background 0.35s ease, color 0.35s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Soft pulsing ring around each node. */
.about-page .milestoneNode::after {
  content: "";
  position: absolute;
  inset: -9px;
  border-radius: 50%;
  border: 2px solid rgba(239, 176, 0, 0.45);
  opacity: 0;
  animation: milestonePulse 2.8s ease-out infinite;
}

.about-page .milestoneBranch:nth-of-type(even) .milestoneNode::after {
  animation-delay: 1.4s;
}

@keyframes milestonePulse {
  0% {
    transform: scale(0.85);
    opacity: 0.9;
  }
  100% {
    transform: scale(1.45);
    opacity: 0;
  }
}

.about-page .milestoneCard {
  grid-row: 1;
  position: relative;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(239, 176, 0, 0.22);
  padding: 26px 26px 24px;
  box-shadow: 0 6px 22px -10px rgba(122, 92, 0, 0.18);
  display: flex;
  flex-direction: column;
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s ease,
    opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-page .milestoneBranchLeft .milestoneCard {
  grid-column: 1;
}

.about-page .milestoneBranchRight .milestoneCard {
  grid-column: 3;
}

/* Branch connector from the card to the trunk node. */
.about-page .milestoneCard::before {
  content: "";
  position: absolute;
  top: 50%;
  width: var(--branch-gap);
  height: 2px;
  margin-top: -1px;
  background: repeating-linear-gradient(90deg, #EFB000 0 6px, transparent 6px 11px);
}

.about-page .milestoneBranchLeft .milestoneCard::before {
  left: 100%;
}

.about-page .milestoneBranchRight .milestoneCard::before {
  right: 100%;
}

/* Gold accent bar that sweeps in along the top on hover. */
.about-page .milestoneCard::after {
  content: "";
  position: absolute;
  top: -1px;
  left: 18px;
  right: 18px;
  height: 3px;
  border-radius: 0 0 3px 3px;
  background: linear-gradient(90deg, #ffd34d, #EFB000);
  transform: scaleX(0.18);
  transform-origin: left center;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-page .milestoneBranch:hover .milestoneCard {
  transform: translateY(-6px);
  border-color: rgba(239, 176, 0, 0.6);
  box-shadow: 0 22px 44px -18px rgba(122, 92, 0, 0.32);
}

.about-page .milestoneBranch:hover .milestoneCard::after {
  transform: scaleX(1);
}

.about-page .milestoneBranch:hover .milestoneNode {
  background: #EFB000;
  color: #ffffff;
  transform: scale(1.1) rotate(-6deg);
}

.about-page .milestoneHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.about-page .milestoneYear {
  font-family: var(--font-heading);
  font-size: 28px;
  font-weight: 800;
  color: #d69e00;
  line-height: 1;
  letter-spacing: -0.01em;
}

.about-page .milestoneBadge {
  background: #FFF4CC;
  color: #8f6200;
  font-family: var(--font-label);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 999px;
  white-space: nowrap;
}

.about-page .milestoneTitle {
  font-size: 19px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px;
  line-height: 1.3;
}

.about-page .milestoneSubtitle {
  font-family: var(--font-label);
  font-size: 13.5px;
  font-weight: 600;
  color: #9c6c00;
  margin: 0 0 12px;
}

.about-page .milestoneDesc {
  font-size: 14.5px;
  line-height: 1.65;
  color: var(--text-64);
  margin: 0 0 16px;
}

.about-page .milestoneHighlight {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #FFF9E6;
  border: 1px solid rgba(239, 176, 0, 0.25);
  padding: 10px 12px;
  border-radius: 10px;
  font-family: var(--font-label);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.45;
  color: #7a5400;
}

.about-page .milestoneHighlight svg {
  flex-shrink: 0;
  margin-top: 1px;
  font-size: 16px;
  color: #EFB000;
}

/* Tablets and phones: trunk moves to the left edge, every card branches
   to the right of it. */
@media (max-width: 860px) {
  .about-page .milestoneTree {
    --node-size: 46px;
    --branch-gap: 18px;
  }

  .about-page .milestoneTrunk {
    left: calc(var(--node-size) / 2);
  }

  .about-page .milestoneRoot,
  .about-page .milestoneTip {
    justify-content: flex-start;
  }

  .about-page .milestoneBranch {
    grid-template-columns: calc(var(--node-size) + var(--branch-gap)) 1fr;
    align-items: start;
    margin-bottom: 22px;
  }

  .about-page .milestoneNode {
    grid-column: 1;
    justify-self: start;
    margin-top: 22px;
    font-size: 20px;
    box-shadow: 0 0 0 5px #FFF6D9, 0 8px 18px -8px rgba(214, 158, 0, 0.55);
  }

  .about-page .milestoneBranchLeft .milestoneCard,
  .about-page .milestoneBranchRight .milestoneCard {
    grid-column: 2;
  }

  .about-page .milestoneBranchLeft .milestoneCard::before,
  .about-page .milestoneBranchRight .milestoneCard::before {
    left: auto;
    right: 100%;
    top: calc(22px + var(--node-size) / 2);
  }

  /* Phones get the slide-up reveal instead of the sideways one. */
  .about-page .milestoneCard.reveal-fade-left,
  .about-page .milestoneCard.reveal-fade-right {
    transform: translateY(28px);
  }

  .about-page .milestoneCard.reveal-visible {
    transform: none;
  }
}

@media (max-width: 480px) {
  .about-page .milestoneCard {
    padding: 20px 18px 18px;
  }

  .about-page .milestoneYear {
    font-size: 24px;
  }

  .about-page .milestoneTitle {
    font-size: 17px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-page .milestoneTrunkFill {
    transform: none;
    transition: none;
  }

  .about-page .milestoneNode::after {
    animation: none;
  }
}
`;

export default function InceptionMilestones() {
  return (
    <>
      <style>{MILESTONES_CSS}</style>

    <section className="inceptionSection" id="inception">
      <div className="container">
        <div className="sectionHead reveal-on-scroll reveal-fade-up">
          <div className="pillBadge">
            <span className="pillBadgeDot" />
            Our Inception & Milestones
          </div>
          <h2 className="sectionTitle">From Inception to a Nationwide Footprint</h2>
          <p className="sectionSubtitle">
            Over a decade of continuous innovation, scaling from shop-floor problem solving in Pune to governing millions of workforce punches across India.
          </p>
        </div>

        <ol className="milestoneTree">
          <span className="milestoneTrunk reveal-on-scroll" aria-hidden="true">
            <span className="milestoneTrunkFill" />
          </span>

          <li className="milestoneRoot reveal-on-scroll reveal-zoom-in" aria-hidden="true">
            <span className="milestoneCap">
              <Plant weight="fill" />
              Where it began
            </span>
          </li>

          {INCEPTION_MILESTONES.map((milestone, index) => {
            const side = index % 2 === 0 ? "Left" : "Right";
            return (
              <li key={milestone.year} className={`milestoneBranch milestoneBranch${side}`}>
                <span
                  className="milestoneNode reveal-on-scroll reveal-zoom-in"
                  style={{ transitionDelay: "120ms" }}
                  aria-hidden="true"
                >
                  <milestone.icon weight="duotone" />
                </span>
                <article
                  className={`milestoneCard reveal-on-scroll ${
                    side === "Left" ? "reveal-fade-right" : "reveal-fade-left"
                  }`}
                >
                  <div className="milestoneHeader">
                    <span className="milestoneYear">{milestone.year}</span>
                    <span className="milestoneBadge">Milestone</span>
                  </div>
                  <h3 className="milestoneTitle">{milestone.title}</h3>
                  <span className="milestoneSubtitle">{milestone.subtitle}</span>
                  <p className="milestoneDesc">{milestone.description}</p>
                  <div className="milestoneHighlight">
                    <CheckCircle weight="fill" aria-hidden="true" />
                    {milestone.highlight}
                  </div>
                </article>
              </li>
            );
          })}

          <li className="milestoneTip reveal-on-scroll reveal-zoom-in" aria-hidden="true">
            <span className="milestoneCap">
              <TrendUp weight="bold" />
              And still growing
            </span>
          </li>
        </ol>
      </div>
    </section>
    </>
  );
}
