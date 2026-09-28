import React from "react";

export default function VisitorSecurityVector() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] select-none py-2 lg:max-w-none">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_48%,rgba(0,119,194,0.18),rgba(248,187,24,0.14)_50%,transparent_72%)] blur-2xl"
      />

      {/* Main SVG Vector Artwork */}
      <div className="group relative">
        <svg
          viewBox="0 0 620 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-[1.01]"
          aria-label="Professional vector illustration of Emsphere workplace security visitor management with automated access control, digital badge scanning, and central surveillance monitor"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="secPedestalGrad" x1="120" y1="370" x2="520" y2="460" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#f8fafc" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="secConsoleGrad" x1="180" y1="60" x2="480" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            <linearGradient id="secScreenHeaderGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0077c2" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <linearGradient id="secBadgeGrad" x1="20" y1="130" x2="190" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="85%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>

            <linearGradient id="secShieldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#009fe3" />
              <stop offset="60%" stopColor="#0077c2" />
              <stop offset="100%" stopColor="#004d80" />
            </linearGradient>

            <linearGradient id="secGoldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#f8bb18" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <linearGradient id="secBeamGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="secBarrierGlow" x1="470" y1="230" x2="570" y2="390" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#009fe3" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0077c2" stopOpacity="0.05" />
            </linearGradient>

            {/* Subtle Soft Shadows */}
            <filter id="secSoftShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0f172a" floodOpacity="0.08" />
            </filter>
            <filter id="secCardShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0077c2" floodOpacity="0.07" />
            </filter>
            <filter id="secGlowGreen" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="secGlowBlue" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Base Isometric Pedestal */}
          <g id="base-pedestal">
            {/* Ground ambient shadow */}
            <ellipse cx="310" cy="436" rx="250" ry="34" fill="#000000" fillOpacity="0.05" />
            <ellipse cx="310" cy="432" rx="210" ry="26" fill="#0077c2" fillOpacity="0.05" />

            {/* Pedestal Surface */}
            <path
              d="M100 404 C195 368, 425 368, 520 404 C552 418, 552 434, 520 448 C425 480, 195 480, 100 448 C68 434, 68 418, 100 404 Z"
              fill="url(#secPedestalGrad)"
              stroke="#cbd5e1"
              strokeWidth="1.2"
            />

            {/* Grid coordinate lines on pedestal */}
            <path d="M160 418 C245 388, 375 388, 460 418" stroke="#0077c2" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="4 3" />
            <path d="M135 432 C225 402, 395 402, 485 432" stroke="#0077c2" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="4 3" />

            {/* Floor Pulse Sensor Node */}
            <ellipse cx="310" cy="426" rx="28" ry="7.5" fill="#009fe3" fillOpacity="0.16" />
            <ellipse cx="310" cy="426" rx="14" ry="4" fill="#0077c2" fillOpacity="0.32" />
          </g>

          {/* 2. Central Security Surveillance Command Console */}
          <g id="central-console" filter="url(#secSoftShadow)">
            {/* Stand Base */}
            <ellipse cx="330" cy="384" rx="55" ry="12" fill="#334155" />
            <ellipse cx="330" cy="382" rx="46" ry="9" fill="#475569" />
            <path d="M323 382 L320 316 L340 316 L337 382 Z" fill="url(#secConsoleGrad)" />

            {/* Monitor Outer Chassis */}
            <rect x="185" y="70" width="295" height="242" rx="18" fill="url(#secConsoleGrad)" stroke="#1e293b" strokeWidth="3" />
            <rect x="187" y="72" width="291" height="238" rx="16" fill="none" stroke="#334155" strokeWidth="1" />

            {/* Screen Glass Inner */}
            <rect x="197" y="82" width="271" height="218" rx="10" fill="#0b1329" />

            {/* Screen Header Bar */}
            <rect x="197" y="82" width="271" height="30" rx="10" fill="url(#secScreenHeaderGrad)" />
            <rect x="197" y="102" width="271" height="10" fill="url(#secScreenHeaderGrad)" />
            
            {/* Window action dots */}
            <circle cx="213" cy="97" r="3.5" fill="#f87171" />
            <circle cx="224" cy="97" r="3.5" fill="#facc15" />
            <circle cx="235" cy="97" r="3.5" fill="#4ade80" />

            {/* Console Title */}
            <text x="252" y="101" fill="#ffffff" fontSize="9.5" fontWeight="800" letterSpacing="0.04em">
              EMSPHERE SECURITY HUB
            </text>

            {/* Live Status Badge on Screen Header */}
            <rect x="404" y="90" width="54" height="15" rx="7.5" fill="#042f2e" stroke="#14b8a6" strokeWidth="0.8" />
            <circle cx="413" cy="97.5" r="2.5" fill="#10b981" filter="url(#secGlowGreen)" />
            <text x="420" y="101" fill="#2dd4bf" fontSize="7.5" fontWeight="800" letterSpacing="0.03em">
              SECURE
            </text>

            {/* Main Video Surveillance / Facial Verification Feed */}
            <g id="screen-camera-feed">
              <rect x="207" y="122" width="154" height="114" rx="8" fill="#111c38" stroke="#1e293b" strokeWidth="1" />
              
              {/* Camera Grid Lines */}
              <line x1="207" y1="179" x2="361" y2="179" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="284" y1="122" x2="284" y2="236" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3 3" />
              
              {/* Surveillance Subject (Silhouette Face Mesh) */}
              <ellipse cx="284" cy="162" rx="18" ry="22" fill="#1e293b" />
              <path d="M260 206 C264 188, 304 188, 308 206 Z" fill="#1e293b" />
              
              {/* Biometric Face Target Reticle */}
              <path d="M262 148 L262 142 L268 142" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M306 148 L306 142 L300 142" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M262 178 L262 184 L268 184" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M306 178 L306 184 L300 184" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="284" cy="162" r="14" stroke="#009fe3" strokeWidth="1" strokeDasharray="2 2" />

              {/* Verified Green Access Stamp */}
              <rect x="221" y="208" width="126" height="19" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
              <path d="M231 217.5 L234 220.5 L240 214.5" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <text x="246" y="221" fill="#a7f3d0" fontSize="8" fontWeight="800" letterSpacing="0.04em">
                IDENTITY VERIFIED
              </text>

              {/* Camera metadata tag */}
              <text x="213" y="133" fill="#64748b" fontSize="7" fontWeight="700">CAM-01 · MAIN LOBBY</text>
            </g>

            {/* Screen Right Column: Real-time Security Metrics */}
            <g id="screen-stats-column">
              {/* Stat Card 1: Active Visitors */}
              <rect x="371" y="122" width="87" height="52" rx="6" fill="#111c38" stroke="#1e293b" strokeWidth="1" />
              <text x="379" y="135" fill="#94a3b8" fontSize="7" fontWeight="700">INSIDE FACILITY</text>
              <text x="379" y="157" fill="#ffffff" fontSize="19" fontWeight="900">108</text>
              <rect x="428" y="143" width="22" height="12" rx="3" fill="#065f46" />
              <text x="432" y="152" fill="#34d399" fontSize="7" fontWeight="800">LIVE</text>

              {/* Stat Card 2: Security Status */}
              <rect x="371" y="180" width="87" height="56" rx="6" fill="#111c38" stroke="#1e293b" strokeWidth="1" />
              <text x="379" y="193" fill="#94a3b8" fontSize="7" fontWeight="700">SECURITY ALERTS</text>
              <text x="379" y="216" fill="#f8bb18" fontSize="19" fontWeight="900">0</text>
              <text x="395" y="215" fill="#10b981" fontSize="8" fontWeight="800">· 100% Safe</text>
            </g>

            {/* Screen Bottom Bar: Access Log Feed */}
            <g id="screen-bottom-logs">
              <rect x="207" y="244" width="251" height="46" rx="6" fill="#111c38" stroke="#1e293b" strokeWidth="1" />
              
              {/* Row 1 */}
              <circle cx="218" cy="258" r="3" fill="#10b981" />
              <text x="227" y="261" fill="#f1f5f9" fontSize="8" fontWeight="700">Marcus Vance (Acme Corp)</text>
              <text x="345" y="261" fill="#64748b" fontSize="7.5" fontWeight="600">Pass #8041</text>
              <text x="408" y="261" fill="#34d399" fontSize="7.5" fontWeight="800">IN 10:45 AM</text>

              <line x1="213" y1="267" x2="450" y2="267" stroke="#1e293b" strokeWidth="0.8" />

              {/* Row 2 */}
              <circle cx="218" cy="277" r="3" fill="#009fe3" />
              <text x="227" y="280" fill="#f1f5f9" fontSize="8" fontWeight="700">Sarah Jenkins (Tech Sol.)</text>
              <text x="345" y="280" fill="#64748b" fontSize="7.5" fontWeight="600">Pass #8042</text>
              <text x="408" y="280" fill="#38bdf8" fontSize="7.5" fontWeight="800">IN 10:48 AM</text>
            </g>

            {/* Specular Screen Glass Highlight */}
            <path
              d="M197 82 L345 82 L225 300 L197 300 Z"
              fill="linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 100%)"
              pointerEvents="none"
            />
          </g>

          {/* 3. Left Element: Floating Digital Visitor Smart Badge (E-Pass) */}
          <g id="digital-badge" filter="url(#secCardShadow)" className="transition-transform duration-300 group-hover:-translate-y-1.5">
            {/* Lanyard Strap / Clip */}
            <path d="M105 105 L125 138 L115 138 Z" fill="#0077c2" />
            <rect x="110" y="132" width="10" height="10" rx="2" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
            <circle cx="115" cy="137" r="2" fill="#334155" />

            {/* Badge Body */}
            <rect x="32" y="140" width="166" height="240" rx="16" fill="url(#secBadgeGrad)" stroke="#cbd5e1" strokeWidth="1.2" />

            {/* Badge Header with Emsphere Blue Accent */}
            <path d="M32 156 C32 147, 39 140, 48 140 L182 140 C191 140, 198 147, 198 156 L198 184 L32 184 Z" fill="url(#secScreenHeaderGrad)" />
            
            {/* Logo Text on Badge */}
            <text x="50" y="162" fill="#ffffff" fontSize="12" fontWeight="900" letterSpacing="0.02em">
              emsphere
            </text>
            <text x="115" y="162" fill="#f8bb18" fontSize="7.5" fontWeight="800">
              CONNECT
            </text>
            <text x="50" y="174" fill="#bae6fd" fontSize="7" fontWeight="700" letterSpacing="0.06em">
              OFFICIAL VISITOR PASS
            </text>

            {/* Gold Security Chip Hologram */}
            <rect x="156" y="196" width="28" height="22" rx="4" fill="url(#secGoldGrad)" stroke="#b45309" strokeWidth="0.8" />
            <path d="M156 207 L184 207 M170 196 L170 218" stroke="#78350f" strokeWidth="0.6" strokeOpacity="0.6" />

            {/* Visitor Avatar Frame */}
            <rect x="48" y="196" width="46" height="52" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
            <ellipse cx="71" cy="216" rx="12" ry="12" fill="#0284c7" />
            <path d="M55 244 C57 232, 85 232, 87 244 Z" fill="#0284c7" />
            
            {/* Verified Green Badge Dot */}
            <circle cx="90" cy="242" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.2" />
            <path d="M88 242 L90 244 L93 240.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Visitor Info */}
            <text x="48" y="266" fill="#0f172a" fontSize="11" fontWeight="800">
              Sarah Jenkins
            </text>
            <text x="48" y="277" fill="#64748b" fontSize="8" fontWeight="600">
              Tech Solutions Inc.
            </text>

            <rect x="48" y="284" width="70" height="13" rx="3" fill="#f1f5f9" />
            <text x="53" y="293" fill="#334155" fontSize="7" fontWeight="700">
              HOST: HR DEPT
            </text>

            {/* QR Code Section */}
            <g id="badge-qr">
              <rect x="48" y="304" width="62" height="62" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
              
              {/* QR Pattern Representation */}
              {/* Corner 1 */}
              <rect x="53" y="309" width="16" height="16" rx="2" fill="#0077c2" />
              <rect x="56" y="312" width="10" height="10" rx="1" fill="#ffffff" />
              <rect x="58" y="314" width="6" height="6" fill="#0077c2" />

              {/* Corner 2 */}
              <rect x="89" y="309" width="16" height="16" rx="2" fill="#0077c2" />
              <rect x="92" y="312" width="10" height="10" rx="1" fill="#ffffff" />
              <rect x="94" y="314" width="6" height="6" fill="#0077c2" />

              {/* Corner 3 */}
              <rect x="53" y="345" width="16" height="16" rx="2" fill="#0077c2" />
              <rect x="56" y="348" width="10" height="10" rx="1" fill="#ffffff" />
              <rect x="58" y="350" width="6" height="6" fill="#0077c2" />

              {/* Micro dots */}
              <rect x="74" y="312" width="4" height="4" fill="#0077c2" />
              <rect x="81" y="312" width="4" height="4" fill="#0077c2" />
              <rect x="74" y="324" width="4" height="8" fill="#0077c2" />
              <rect x="82" y="328" width="5" height="5" fill="#0077c2" />
              <rect x="74" y="345" width="6" height="4" fill="#0077c2" />
              <rect x="84" y="345" width="5" height="7" fill="#0077c2" />
              <rect x="93" y="330" width="8" height="4" fill="#0077c2" />

              {/* Laser Scanning Beam over QR */}
              <rect x="48" y="332" width="62" height="6" fill="url(#secBeamGrad)" />
              <line x1="48" y1="335" x2="110" y2="335" stroke="#10b981" strokeWidth="1.5" filter="url(#secGlowGreen)" />
            </g>

            {/* QR Side Badges */}
            <g id="badge-meta">
              <text x="116" y="320" fill="#059669" fontSize="8" fontWeight="800">
                ACTIVE PASS
              </text>
              <text x="116" y="332" fill="#64748b" fontSize="7" fontWeight="600">
                Valid: 28 Sep
              </text>
              <text x="116" y="342" fill="#64748b" fontSize="7" fontWeight="600">
                09:00 - 18:00
              </text>
              <rect x="116" y="350" width="56" height="14" rx="4" fill="#dcfce7" stroke="#86efac" strokeWidth="0.8" />
              <text x="122" y="360" fill="#166534" fontSize="7" fontWeight="800">
                FLOOR 1 - 4
              </text>
            </g>
          </g>

          {/* 4. Right Element: Smart IoT Automated Turnstile / Access Barrier */}
          <g id="turnstile-barrier" filter="url(#secSoftShadow)">
            {/* Barrier Main Pedestal Post */}
            <rect x="495" y="240" width="58" height="152" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
            <rect x="499" y="244" width="50" height="144" rx="10" fill="url(#secConsoleGrad)" />

            {/* Glass Wing Barrier Panel (Open State) */}
            <path
              d="M495 285 L445 240 L445 355 L495 375 Z"
              fill="url(#secBarrierGlow)"
              stroke="#009fe3"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            {/* Barrier Wing LED highlight edge */}
            <line x1="445" y1="240" x2="445" y2="355" stroke="#38bdf8" strokeWidth="2.5" filter="url(#secGlowBlue)" />

            {/* Turnstile Top Scanner Screen */}
            <rect x="504" y="252" width="40" height="28" rx="6" fill="#0b1329" stroke="#0077c2" strokeWidth="1" />
            
            {/* Scanning RFID/NFC Symbol on reader */}
            <path d="M518 266 A6 6 0 0 1 530 266" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M520 269 A3.5 3.5 0 0 1 528 269" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <circle cx="524" cy="272" r="1.5" fill="#10b981" />

            {/* Turnstile Status Indicator Lights */}
            <rect x="504" y="292" width="40" height="18" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="0.8" />
            <circle cx="512" cy="301" r="3" fill="#10b981" filter="url(#secGlowGreen)" />
            <text x="519" y="303.5" fill="#a7f3d0" fontSize="7" fontWeight="800">
              OPEN
            </text>

            {/* Floating Tag: Touchless Entry */}
            <g id="touchless-tag" filter="url(#secCardShadow)" className="transition-transform duration-300 group-hover:translate-x-1">
              <rect x="472" y="196" width="118" height="34" rx="8" fill="#ffffff" stroke="#bae6fd" strokeWidth="1.2" />
              <circle cx="490" cy="213" r="9" fill="#e0f2fe" />
              <path d="M486 213 L489 216 L495 210" stroke="#0077c2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="506" y="210" fill="#0f172a" fontSize="8" fontWeight="800">
                Touchless Entry
              </text>
              <text x="506" y="221" fill="#0284c7" fontSize="7" fontWeight="700">
                Instant Turnstile Pass
              </text>
            </g>
          </g>

          {/* 5. Top Center Accent: 3D Cyber Security Shield */}
          <g id="security-shield" filter="url(#secSoftShadow)" className="transition-transform duration-300 group-hover:-translate-y-2">
            {/* Shield Backing Glow */}
            <ellipse cx="330" cy="50" rx="38" ry="14" fill="#0077c2" fillOpacity="0.22" filter="url(#secGlowBlue)" />

            {/* Shield Body */}
            <path
              d="M330 18 C353 18, 370 24, 370 24 C370 48, 363 72, 330 86 C297 72, 290 48, 290 24 C290 24, 307 18, 330 18 Z"
              fill="url(#secShieldGrad)"
              stroke="url(#secGoldGrad)"
              strokeWidth="2.2"
            />
            {/* Inner Shield highlight */}
            <path
              d="M330 24 C348 24, 362 28, 362 28 C362 47, 356 66, 330 78 C304 66, 298 47, 298 28 C298 28, 312 24, 330 24 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />

            {/* Shield Security Emblem (Lock + Check) */}
            {/* Shackle */}
            <path d="M324 42 V38 C324 34.7, 326.7 32, 330 32 C333.3 32, 336 34.7, 336 38 V42" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            {/* Lock Body */}
            <rect x="320" y="42" width="20" height="16" rx="3.5" fill="#f8bb18" stroke="#d97706" strokeWidth="1" />
            <circle cx="330" cy="49" r="2.2" fill="#78350f" />
            <path d="M330 51 V54" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" />

            {/* Floating Shield Pill */}
            <rect x="382" y="32" width="134" height="26" rx="13" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" filter="url(#secCardShadow)" />
            <circle cx="396" cy="45" r="5" fill="#10b981" />
            <path d="M394 45 L395.5 46.5 L398.5 43.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="406" y="48" fill="#0f172a" fontSize="8" fontWeight="800">
              Intruder Restriction · 100%
            </text>
          </g>

          {/* 6. Top Left Accent: Host Notification Cloud */}
          <g id="host-notification" filter="url(#secCardShadow)" className="transition-transform duration-300 group-hover:-translate-y-1">
            <rect x="18" y="58" width="144" height="34" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            
            {/* Notification Bell / Message Icon */}
            <circle cx="36" cy="75" r="10" fill="#eff6ff" />
            <path
              d="M36 69 C33.5 69, 32 71, 32 73.5 C32 76.5, 30.5 77.5, 30.5 77.5 H41.5 C41.5 77.5, 40 76.5, 40 73.5 C40 71, 38.5 69, 36 69 Z"
              fill="#0077c2"
            />
            <circle cx="36" cy="79.5" r="1.5" fill="#0077c2" />
            <circle cx="42" cy="69" r="3" fill="#f8bb18" stroke="#ffffff" strokeWidth="1" />

            <text x="52" y="72" fill="#0f172a" fontSize="8" fontWeight="800">
              Host Instant Ping
            </text>
            <text x="52" y="81" fill="#64748b" fontSize="7" fontWeight="600">
              SMS & WhatsApp Alert Sent
            </text>
          </g>

          {/* 7. Bottom Metric Floating Chip: Emergency Evacuation Headcount */}
          <g id="evacuation-tag" filter="url(#secCardShadow)" className="transition-transform duration-300 group-hover:translate-y-1">
            <rect x="175" y="400" width="260" height="30" rx="15" fill="#ffffff" stroke="#bae6fd" strokeWidth="1.2" />
            <circle cx="193" cy="415" r="6.5" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
            <path d="M190 415 L192 417 L196 413" stroke="#059669" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <text x="206" y="418.5" fill="#0f172a" fontSize="8.5" fontWeight="800">
              Real-Time Emergency Evacuation Roll Call
            </text>
            <rect x="396" y="407" width="28" height="16" rx="4" fill="#0284c7" />
            <text x="402" y="418" fill="#ffffff" fontSize="7.5" fontWeight="800">
              LIVE
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
