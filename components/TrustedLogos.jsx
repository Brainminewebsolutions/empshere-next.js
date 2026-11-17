/* "Trusted By Leading Organizations" logo marquee, shared by the home, About
   and product pages. Logos come from lib/clients.js and sit in a single
   zig-zag row (alternating top/bottom) that scrolls right in an infinite loop.
   Styles are scoped under ".trusted-logos" so the component can be dropped
   into any page without colliding with page-level CSS. */

import { CLIENTS, logoDisplaySize } from "@/lib/clients";

// The zig-zag only loops seamlessly with an even count; repeat an odd list so
// the last logo of one group and the first of the next never share a level.
const MARQUEE_ITEMS = CLIENTS.length % 2 === 0 ? CLIENTS : [...CLIENTS, ...CLIENTS];
const SECONDS_PER_LOGO = 1.5; // constant scroll speed however many logos there are

const CSS = `
.trusted-logos {
  --logo-scale: 1.3;
  background: #FFFFFA;
  box-shadow: inset 0 0 0 1px rgba(172, 172, 172, 0.1);
  padding: 50px 0 56px;
  overflow: hidden;
}
.trusted-logos .trustedTitle {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #4c4c4c;
  margin: 0 0 28px;
  padding: 0 16px;
}
.trusted-logos .trustedTitle.trustedTitleWithSub { margin-bottom: 6px; }
.trusted-logos .trustedSubtitle {
  text-align: center;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.64);
  margin: 0 0 24px;
  padding: 0 16px;
}
.trusted-logos .trustedMarqueeWrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 10px 0;
  mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
}
.trusted-logos .trustedMarqueeRow {
  display: flex;
  overflow: hidden;
  user-select: none;
  width: 100%;
  padding: 6px 0;
}
.trusted-logos .trustedMarqueeTrack {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: trustedLogosScrollRight var(--duration, 100s) linear infinite;
}
.trusted-logos .trustedMarqueeRow:hover .trustedMarqueeTrack {
  animation-play-state: paused;
}
.trusted-logos .trustedMarqueeGroup {
  display: flex;
  align-items: stretch;
  height: calc(124px * var(--logo-scale));
  flex-shrink: 0;
  gap: calc(24px * var(--logo-scale));
  padding-right: calc(24px * var(--logo-scale));
}
.trusted-logos .trustedLogoWrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(128px * var(--logo-scale));
  height: calc(52px * var(--logo-scale));
  flex-shrink: 0;
}
.trusted-logos .trustedLogoWrap--bottom { align-self: flex-end; }
.trusted-logos .trustedLogoWrap--top { align-self: flex-start; }
.trusted-logos .trustedLogo {
  display: block;
  width: calc(var(--w) * var(--logo-scale));
  height: calc(var(--h) * var(--logo-scale));
  object-fit: contain;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
  -webkit-user-drag: none;
}
.trusted-logos .trustedLogoWrap:hover { z-index: 10; }
.trusted-logos .trustedLogoWrap:hover .trustedLogo {
  transform: scale(1.1);
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.12));
}
@keyframes trustedLogosScrollRight {
  0% { transform: translate3d(-50%, 0, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
@media (max-width: 768px) {
  .trusted-logos { --logo-scale: 1.1; padding: 38px 0 42px; }
  .trusted-logos .trustedTitle { font-size: 20px; margin-bottom: 20px; }
  .trusted-logos .trustedMarqueeRow { padding: 4px 0; }
}
@media (max-width: 480px) {
  .trusted-logos { --logo-scale: 0.9; padding: 30px 0 34px; }
  .trusted-logos .trustedTitle { font-size: 18px; margin-bottom: 16px; }
  .trusted-logos .trustedMarqueeRow { padding: 3px 0; }
}
@media (prefers-reduced-motion: reduce) {
  .trusted-logos .trustedMarqueeTrack { animation: none; }
}
`;

function LogoGroup({ hidden = false }) {
  return (
    <div className="trustedMarqueeGroup" aria-hidden={hidden || undefined}>
      {MARQUEE_ITEMS.map((client, index) => {
        const { width, height } = logoDisplaySize(client);
        return (
          <div
            key={index}
            className={`trustedLogoWrap ${index % 2 === 1 ? "trustedLogoWrap--top" : "trustedLogoWrap--bottom"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
            <img
              className="trustedLogo"
              src={client.logo.src}
              alt={`${client.name} logo`}
              width={client.logo.width}
              height={client.logo.height}
              style={{ "--w": `${width}px`, "--h": `${height}px` }}
              loading="lazy"
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function TrustedLogos({ title = "Trusted By Leading Organizations", subtitle, id, className = "" }) {
  return (
    <section id={id} className={`trusted-logos ${className}`} aria-labelledby="trusted-logos-heading">
      <style>{CSS}</style>
      <h2 id="trusted-logos-heading" className={`trustedTitle reveal-on-scroll reveal-fade-up${subtitle ? " trustedTitleWithSub" : ""}`}>
        {title}
      </h2>
      {subtitle && <p className="trustedSubtitle reveal-on-scroll reveal-fade-up">{subtitle}</p>}
      <div className="trustedMarqueeWrapper reveal-on-scroll reveal-fade-up">
        <div className="trustedMarqueeRow" aria-label="Trusted client logos">
          <div
            className="trustedMarqueeTrack"
            style={{ "--duration": `${MARQUEE_ITEMS.length * SECONDS_PER_LOGO}s` }}
          >
            <LogoGroup />
            <LogoGroup hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
