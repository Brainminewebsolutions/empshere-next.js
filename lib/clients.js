/* Single source of truth for client logos. Used by the "Trusted By Leading
   Organizations" marquee (home, About, product pages) and the Clients page grid.

   `scale` nudges optical weight for logos that read too heavy (solid colour
   blocks) or too light (thin wordmarks) at the marquee's computed size. */

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

// New clients 2025-26
import logoApsnp from "@/app/images/clients/logo-apsnp.webp";
import logoBasf from "@/app/images/clients/logo-basf.webp";
import logoBdr from "@/app/images/clients/logo-bdr-pharmaceuticals.webp";
import logoBharatSeats from "@/app/images/clients/logo-bharat-seats.webp";
import logoBioradMedisys from "@/app/images/clients/logo-biorad-medisys.png";
import logoBptp from "@/app/images/clients/logo-bptp.webp";
import logoCentrient from "@/app/images/clients/logo-centrient-pharmaceuticals.png";
import logoCummins from "@/app/images/clients/logo-cummins.png";
import logoDhl from "@/app/images/clients/logo-dhl.png";
import logoEjot from "@/app/images/clients/logo-ejot-octaqon.webp";
import logoEka from "@/app/images/clients/logo-eka-mobility.webp";
import logoEnzene from "@/app/images/clients/logo-enzene.webp";
import logoFiltrum from "@/app/images/clients/logo-filtrum.png";
import logoFinolex from "@/app/images/clients/logo-finolex.webp";
import logoFlipkart from "@/app/images/clients/logo-flipkart.png";
import logoFoseco from "@/app/images/clients/logo-foseco.webp";
import logoGabriel from "@/app/images/clients/logo-gabriel-india.webp";
import logoHbl from "@/app/images/clients/logo-hbl.webp";
import logoInteva from "@/app/images/clients/logo-inteva-products.png";
import logoJkCement from "@/app/images/clients/logo-jk-cement.png";
import logoKirloskarFerrous from "@/app/images/clients/logo-kirloskar-ferrous.webp";
import logoLincDigital from "@/app/images/clients/logo-linc-digital.webp";
import logoMahindraElectric from "@/app/images/clients/logo-mahindra-electric.png";
import logoMaxion from "@/app/images/clients/logo-maxion-wheels.png";
import logoMedanta from "@/app/images/clients/logo-medanta.webp";
import logoMylan from "@/app/images/clients/logo-mylan.png";
import logoNipro from "@/app/images/clients/logo-nipro.png";
import logoNissanChemical from "@/app/images/clients/logo-nissan-chemical.webp";
import logoNuvoco from "@/app/images/clients/logo-nuvoco.webp";
import logoOpmobility from "@/app/images/clients/logo-opmobility.png";
import logoPari from "@/app/images/clients/logo-pari.webp";
import logoPcbl from "@/app/images/clients/logo-pcbl-chemical.webp";
import logoPremierEnergies from "@/app/images/clients/logo-premier-energies.webp";
import logoRashmi from "@/app/images/clients/logo-rashmi-group.png";
import logoRatnamani from "@/app/images/clients/logo-ratnamani.png";
import logoRelianceFoundation from "@/app/images/clients/logo-reliance-foundation.png";
import logoShyamMetalics from "@/app/images/clients/logo-shyam-metalics.webp";
import logoSilicon from "@/app/images/clients/logo-silicon-secure-systems.png";
import logoSkipper from "@/app/images/clients/logo-skipper.png";
import logoSpin from "@/app/images/clients/logo-sp-institute-neurosciences.webp";
import logoSteelStrips from "@/app/images/clients/logo-steel-strips-wheels.png";
import logoStellar from "@/app/images/clients/logo-stellar-ecoenergy.png";
import logoTaural from "@/app/images/clients/logo-taural-india.png";
import logoTdsg from "@/app/images/clients/logo-tdsg.png";
import logoTvs from "@/app/images/clients/logo-tvs-motor.png";
import logoVpFire from "@/app/images/clients/logo-vp-fire.png";
import logoWipro from "@/app/images/clients/logo-wipro.png";
import logoZyeta from "@/app/images/clients/logo-zyeta.webp";

// Ordered so well-known brands are spread evenly across both marquee rows.
export const CLIENTS = [
  { name: "Mahindra & Mahindra", logo: logoMahindra, category: "Automotive & Farm Equipment", segment: "Automotive" },
  { name: "Mercedes-Benz", logo: logoMercedesBenz, category: "Luxury Automotive", segment: "Automotive", scale: 1.15 },
  { name: "JK Cement", logo: logoJkCement, category: "Cement & Building Materials", segment: "Manufacturing" },
  { name: "Flipkart", logo: logoFlipkart, category: "E-commerce", segment: "Technology & Services" },
  { name: "BASF", logo: logoBasf, category: "Chemicals", segment: "Chemical & Energy" },
  { name: "Capgemini", logo: logoCapgemini, category: "IT & Consulting", segment: "Technology & Services" },
  { name: "TVS Motor", logo: logoTvs, category: "Two & Three Wheelers", segment: "Automotive" },
  { name: "Cummins", logo: logoCummins, category: "Engines & Power Systems", segment: "Heavy Engineering" },
  { name: "Tata AutoComp", logo: logoTataAutocomp, category: "Automotive Components", segment: "Automotive", scale: 1.1 },
  { name: "Mylan", logo: logoMylan, category: "Pharmaceuticals", segment: "Pharma & Healthcare" },
  { name: "Castrol", logo: logoCastrol, category: "Industrial Lubricants", segment: "Chemical & Energy" },
  { name: "Wipro", logo: logoWipro, category: "IT Services", segment: "Technology & Services" },
  { name: "ZF Group", logo: logoZf, category: "Mobility Technology", segment: "Automotive" },
  { name: "Nuvoco Vistas", logo: logoNuvoco, category: "Cement & Building Materials", segment: "Manufacturing" },
  { name: "L&T Defence", logo: logoLtDefence, category: "Heavy Engineering & Defence", segment: "Heavy Engineering" },
  { name: "Medanta", logo: logoMedanta, category: "Hospitals & Healthcare", segment: "Pharma & Healthcare", scale: 0.85 },
  { name: "Haier", logo: logoHaier, category: "Consumer Electronics", segment: "Technology & Services" },
  { name: "Gabriel India", logo: logoGabriel, category: "Ride Control Systems", segment: "Automotive" },
  { name: "Nayara Energy", logo: logoNayara, category: "Energy & Petrochemicals", segment: "Chemical & Energy" },
  { name: "Reliance Foundation", logo: logoRelianceFoundation, category: "Foundation & Social Impact", segment: "Technology & Services" },
  { name: "Varroc Excellence", logo: logoVarroc, category: "Automotive Components", segment: "Automotive" },
  { name: "Shyam Metalics", logo: logoShyamMetalics, category: "Metals & Steel", segment: "Heavy Engineering", scale: 0.85 },
  { name: "DHL", logo: logoDhl, category: "Logistics", segment: "Technology & Services" },
  { name: "Kansai Nerolac", logo: logoKansaiNerolac, category: "Paints & Coatings", segment: "Chemical & Energy" },
  { name: "Mahindra Electric", logo: logoMahindraElectric, category: "Electric Vehicles", segment: "Automotive" },
  { name: "Vishay", logo: logoVishay, category: "Semiconductors & Components", segment: "Technology & Services" },
  { name: "Finolex", logo: logoFinolex, category: "Pipes & Cables", segment: "Manufacturing", scale: 0.85 },
  { name: "Kirloskar", logo: logoKirloskar, category: "Engines & Industrial", segment: "Heavy Engineering" },
  { name: "Nipro", logo: logoNipro, category: "Medical Devices", segment: "Pharma & Healthcare" },
  { name: "Apollo Tyres", logo: logoApolloTyres, category: "Tyre Manufacturing", segment: "Automotive" },
  { name: "PCBL Chemical", logo: logoPcbl, category: "Speciality Chemicals", segment: "Chemical & Energy" },
  { name: "Maxion Wheels", logo: logoMaxion, category: "Automotive Wheels", segment: "Automotive" },
  { name: "Dow Chemical", logo: logoDow, category: "Chemicals & Materials", segment: "Chemical & Energy" },
  { name: "Premier Energies", logo: logoPremierEnergies, category: "Solar Energy", segment: "Chemical & Energy" },
  { name: "Inteva Products", logo: logoInteva, category: "Automotive Systems", segment: "Automotive" },
  { name: "Garware Polyester", logo: logoGarware, category: "Polyester Films", segment: "Manufacturing" },
  { name: "Nissan Chemical", logo: logoNissanChemical, category: "Chemicals", segment: "Chemical & Energy" },
  { name: "Skipper Limited", logo: logoSkipper, category: "Power Transmission Structures", segment: "Heavy Engineering" },
  { name: "Centrient Pharmaceuticals", logo: logoCentrient, category: "Pharmaceuticals", segment: "Pharma & Healthcare", scale: 1.15 },
  { name: "OPmobility", logo: logoOpmobility, category: "Mobility Solutions", segment: "Automotive" },
  { name: "Andhra Paper Limited", logo: logoAndhraPaper, category: "Paper & Packaging", segment: "Manufacturing" },
  { name: "Ratnamani Metals & Tubes", logo: logoRatnamani, category: "Metal Tubes & Pipes", segment: "Heavy Engineering" },
  { name: "Enzene Biosciences", logo: logoEnzene, category: "Biotechnology", segment: "Pharma & Healthcare" },
  { name: "Bharat Seats", logo: logoBharatSeats, category: "Automotive Seating", segment: "Automotive" },
  { name: "Rashmi Group", logo: logoRashmi, category: "Steel & DI Pipes", segment: "Heavy Engineering" },
  { name: "EKA Mobility", logo: logoEka, category: "Electric Vehicles", segment: "Automotive", scale: 0.85 },
  { name: "BDR Pharmaceuticals", logo: logoBdr, category: "Pharmaceuticals", segment: "Pharma & Healthcare" },
  { name: "Kirloskar Ferrous", logo: logoKirloskarFerrous, category: "Iron Castings", segment: "Heavy Engineering" },
  { name: "HBL Engineering", logo: logoHbl, category: "Engineering & Electronics", segment: "Heavy Engineering" },
  { name: "Steel Strips Wheels", logo: logoSteelStrips, category: "Automotive Wheels", segment: "Automotive" },
  { name: "TDSG", logo: logoTdsg, category: "Lithium-ion Batteries", segment: "Chemical & Energy", scale: 0.85 },
  { name: "Foseco", logo: logoFoseco, category: "Foundry Solutions", segment: "Heavy Engineering" },
  { name: "Taural India", logo: logoTaural, category: "Aluminium Castings", segment: "Automotive" },
  { name: "Biorad Medisys", logo: logoBioradMedisys, category: "Medical Devices", segment: "Pharma & Healthcare" },
  { name: "Filtrum", logo: logoFiltrum, category: "Filtration Technology", segment: "Manufacturing" },
  { name: "BPTP", logo: logoBptp, category: "Real Estate", segment: "Technology & Services" },
  { name: "VP Fire", logo: logoVpFire, category: "Fire Safety Services", segment: "Technology & Services" },
  { name: "EJOT Octaqon", logo: logoEjot, category: "Fastening Systems", segment: "Manufacturing", scale: 1.15 },
  { name: "Linc Digital", logo: logoLincDigital, category: "Digital Systems", segment: "Technology & Services" },
  { name: "SP Institute of Neurosciences", logo: logoSpin, category: "Healthcare", segment: "Pharma & Healthcare" },
  { name: "Zyeta", logo: logoZyeta, category: "Workplace Design & Build", segment: "Technology & Services" },
  { name: "Silicon Secure Systems", logo: logoSilicon, category: "Security Systems", segment: "Technology & Services" },
  { name: "Stellar Ecoenergy", logo: logoStellar, category: "Renewable Energy", segment: "Chemical & Energy" },
  { name: "APSNP Technologies", logo: logoApsnp, category: "Technology", segment: "Technology & Services", scale: 1.15 },
  { name: "PARI", logo: logoPari, category: "Robotics & Automation", segment: "Manufacturing" },
];

/* Size a logo by aspect ratio so wide wordmarks and square marks carry
   similar visual weight inside a maxWidth × maxHeight slot: square logos get
   the full height, wider ones trade height for width, capped so long
   wordmarks don't overflow. Logo files must be tightly cropped. */
export function fitLogo(logo, { maxWidth, maxHeight, scale = 1 }) {
  const ratio = logo.width / logo.height;
  let height = Math.min(maxHeight, maxHeight * ratio ** -0.4) * scale;
  let width = height * ratio;
  if (width > maxWidth) {
    width = maxWidth;
    height = width / ratio;
  }
  return { width: Math.round(width), height: Math.round(height) };
}

export function logoDisplaySize({ logo, scale }) {
  return fitLogo(logo, { maxWidth: 124, maxHeight: 46, scale });
}
