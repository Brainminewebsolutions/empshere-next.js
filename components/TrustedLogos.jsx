/* "Trusted By Leading Organizations" logo marquee, matching the homepage
   section. Styles are scoped under ".trusted-logos" so the component can be
   dropped into any page without colliding with page-level CSS. */

import logoMahindra from "@/app/images/homeimages/logo-mahindra.png";
import logoCapgemini from "@/app/images/homeimages/logo-capgemini.png";
import logoMercedesBenz from "@/app/images/homeimages/logo-mercedes-benz.png";
import logoHaier from "@/app/images/homeimages/logo-haier.png";
import logoCastrol from "@/app/images/homeimages/logo-castrol.png";
import logoApolloTyres from "@/app/images/homeimages/logo-apollo-tyres.png";
import logoLtDefence from "@/app/images/homeimages/logo-lt-defence.png";
import logoZf from "@/app/images/homeimages/logo-zf.png";
import logoGarware from "@/app/images/homeimages/logo-garware-polyester.png";
import logoVarroc from "@/app/images/homeimages/logo-varroc-excellence.png";
import logoTataAutocomp from "@/app/images/homeimages/logo-tata-autocomp.png";
import logoVishay from "@/app/images/homeimages/logo-vishay.png";
import logoNayara from "@/app/images/homeimages/logo-nayara-energy.png";
import logoKirloskar from "@/app/images/homeimages/logo-kirloskar.png";
import logoKansaiNerolac from "@/app/images/homeimages/logo-kansai-nerolac.png";
import logoAndhraPaper from "@/app/images/homeimages/logo-andhra-paper-limited.png";
import logoDow from "@/app/images/homeimages/logo-dow.png";

const TRUSTED_LOGOS = [
  { src: logoLtDefence, alt: "L&T Defence", className: "trustedLogo--ltDefence" },
  { src: logoAndhraPaper, alt: "Andhra Paper Limited", className: "trustedLogo--andhraPaper" },
  { src: logoZf, alt: "ZF", className: "trustedLogo--zf" },
  { src: logoVarroc, alt: "Varroc Excellence", className: "trustedLogo--varroc" },
  { src: logoGarware, alt: "Garware Polyester Limited", className: "trustedLogo--garware" },
  { src: logoTataAutocomp, alt: "Tata Autocomp", className: "trustedLogo--tataAutocomp" },
  { src: logoMahindra, alt: "Mahindra", className: "trustedLogo--mahindra" },
  { src: logoCapgemini, alt: "Capgemini", className: "trustedLogo--capgemini" },
  { src: logoMercedesBenz, alt: "Mercedes-Benz", className: "trustedLogo--mercedes" },
  { src: logoDow, alt: "Dow", className: "trustedLogo--dow" },
  { src: logoVishay, alt: "Vishay", className: "trustedLogo--vishay" },
  { src: logoNayara, alt: "Nayara Energy", className: "trustedLogo--nayara" },
  { src: logoHaier, alt: "Haier", className: "trustedLogo--haier" },
  { src: logoKirloskar, alt: "Kirloskar", className: "trustedLogo--kirloskar" },
  { src: logoCastrol, alt: "Castrol", className: "trustedLogo--castrol" },
  { src: logoKansaiNerolac, alt: "Kansai Nerolac Paints Limited", className: "trustedLogo--kansaiNerolac" },
  { src: logoApolloTyres, alt: "Apollo Tyres", className: "trustedLogo--apollo" },
];

// Doubled for an even count so the alternating top/bottom stagger loops seamlessly.
const TRUSTED_CAROUSEL_ITEMS = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS];

const CSS = `
.trusted-logos {
  background: #FFFFFA;
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
  animation: trustedLogosScrollRight 48s linear infinite;
}
.trusted-logos .trustedMarqueeRow:hover .trustedMarqueeTrack {
  animation-play-state: paused;
}
.trusted-logos .trustedMarqueeGroup {
  display: flex;
  align-items: stretch;
  height: 124px;
  flex-shrink: 0;
  gap: 24px;
  padding-right: 24px;
}
.trusted-logos .trustedLogoWrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 52px;
  flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.trusted-logos .trustedLogoWrap--bottom { align-self: flex-end; }
.trusted-logos .trustedLogoWrap--top { align-self: flex-start; }
.trusted-logos .trustedLogo {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
  -webkit-user-drag: none;
}
.trusted-logos .trustedLogo--haier { max-height: 30px; max-width: 110px; }
.trusted-logos .trustedLogo--apollo { max-height: 32px; max-width: 115px; }
.trusted-logos .trustedLogo--capgemini { max-height: 30px; max-width: 120px; }
.trusted-logos .trustedLogo--castrol { max-height: 32px; max-width: 115px; }
.trusted-logos .trustedLogo--ltDefence { max-height: 32px; max-width: 125px; }
.trusted-logos .trustedLogo--dow { max-height: 36px; max-width: 115px; }
.trusted-logos .trustedLogo--kansaiNerolac { max-height: 36px; max-width: 115px; }
.trusted-logos .trustedLogo--garware { max-height: 38px; max-width: 110px; }
.trusted-logos .trustedLogo--mahindra { max-height: 38px; max-width: 112px; }
.trusted-logos .trustedLogo--kirloskar { max-height: 38px; max-width: 105px; }
.trusted-logos .trustedLogo--andhraPaper { max-height: 40px; max-width: 100px; }
.trusted-logos .trustedLogo--mercedes { max-height: 42px; max-width: 110px; }
.trusted-logos .trustedLogo--tataAutocomp { max-height: 46px; max-width: 96px; }
.trusted-logos .trustedLogo--nayara { max-height: 48px; max-width: 78px; }
.trusted-logos .trustedLogo--vishay { max-height: 46px; max-width: 72px; }
.trusted-logos .trustedLogo--zf { max-height: 46px; max-width: 54px; }
.trusted-logos .trustedLogo--varroc { max-height: 48px; max-width: 58px; }
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
  .trusted-logos { padding: 38px 0 42px; }
  .trusted-logos .trustedTitle { font-size: 20px; margin-bottom: 20px; }
  .trusted-logos .trustedMarqueeRow { padding: 4px 0; }
  .trusted-logos .trustedMarqueeGroup { height: 104px; gap: 18px; padding-right: 18px; }
  .trusted-logos .trustedLogoWrap { width: 104px; height: 44px; }
  .trusted-logos .trustedLogo { max-height: 100%; max-width: 100%; }
  .trusted-logos .trustedMarqueeTrack { animation-duration: 40s; }
}
@media (max-width: 480px) {
  .trusted-logos { padding: 30px 0 34px; }
  .trusted-logos .trustedTitle { font-size: 18px; margin-bottom: 16px; }
  .trusted-logos .trustedMarqueeRow { padding: 3px 0; }
  .trusted-logos .trustedMarqueeGroup { height: 86px; gap: 14px; padding-right: 14px; }
  .trusted-logos .trustedLogoWrap { width: 86px; height: 36px; }
  .trusted-logos .trustedMarqueeTrack { animation-duration: 32s; }
}
@media (prefers-reduced-motion: reduce) {
  .trusted-logos .trustedMarqueeTrack { animation: none; }
}
`;

function LogoGroup({ hidden = false, keyPrefix }) {
  return (
    <div className="trustedMarqueeGroup" aria-hidden={hidden || undefined}>
      {TRUSTED_CAROUSEL_ITEMS.map((logo, index) => (
        <div
          key={`${keyPrefix}-${index}`}
          className={`trustedLogoWrap ${index % 2 === 1 ? "trustedLogoWrap--top" : "trustedLogoWrap--bottom"}`}
        >
          <img
            className={`trustedLogo ${logo.className}`}
            src={logo.src.src}
            alt={hidden ? "" : logo.alt}
            width={logo.src.width}
            height={logo.src.height}
            loading="lazy"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

export default function TrustedLogos({ title = "Trusted By Leading Organizations", className = "" }) {
  return (
    <section className={`trusted-logos ${className}`} aria-labelledby="trusted-logos-heading">
      <style>{CSS}</style>
      <h2 id="trusted-logos-heading" className="trustedTitle reveal-on-scroll reveal-fade-up">
        {title}
      </h2>
      <div className="trustedMarqueeWrapper reveal-on-scroll reveal-fade-up">
        <div className="trustedMarqueeRow" aria-label="Trusted client logos">
          <div className="trustedMarqueeTrack">
            <LogoGroup keyPrefix="trusted-a" />
            <LogoGroup keyPrefix="trusted-b" hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
