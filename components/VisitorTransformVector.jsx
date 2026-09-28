import React from "react";

export default function VisitorTransformVector() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] select-none py-2 lg:max-w-none">
      {/* Ambient background glow matching Emsphere amber & brand blue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_48%,rgba(248,187,24,0.18),rgba(0,119,194,0.14)_50%,transparent_72%)] blur-2xl"
      />

      {/* Main Vector Artwork */}
      <div className="group relative">
        <svg
          viewBox="0 0 600 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-[1.01]"
          aria-label="Professional vector illustration of Emsphere smart visitor management digital transformation with touchless reception kiosk, instant mobile pass, and cloud security integration"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="tfPedestalGrad" x1="100" y1="290" x2="500" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#f8fafc" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="tfDeskCounter" x1="110" y1="170" x2="380" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            <linearGradient id="tfBlueGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#009fe3" />
              <stop offset="100%" stopColor="#0077c2" />
            </linearGradient>

            <linearGradient id="tfGoldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#f8bb18" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <linearGradient id="tfScreenGrad" x1="150" y1="90" x2="350" y2="240" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            <linearGradient id="tfPhoneBody" x1="380" y1="110" x2="510" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#090e17" />
            </linearGradient>

            {/* Soft Shadow Filters */}
            <filter id="tfSoftShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.07" />
            </filter>
            <filter id="tfCardShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#0077c2" floodOpacity="0.06" />
            </filter>
            <filter id="tfGreenGlow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Base Isometric Pedestal */}
          <g id="tf-base">
            <ellipse cx="300" cy="356" rx="250" ry="32" fill="#000000" fillOpacity="0.04" />
            <ellipse cx="300" cy="352" rx="210" ry="24" fill="#0077c2" fillOpacity="0.04" />

            {/* Platform Surface */}
            <path
              d="M90 326 C190 292, 410 292, 510 326 C540 338, 540 354, 510 368 C410 398, 190 398, 90 368 C60 354, 60 338, 90 326 Z"
              fill="url(#tfPedestalGrad)"
              stroke="#cbd5e1"
              strokeWidth="1.2"
            />
            {/* Tech grid contour */}
            <path d="M150 338 C238 310, 362 310, 450 338" stroke="#0077c2" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="4 3" />
            <path d="M125 352 C218 324, 382 324, 475 352" stroke="#0077c2" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 3" />
          </g>

          {/* 2. Modern Smart Reception Counter Desk */}
          <g id="reception-desk" filter="url(#tfSoftShadow)">
            {/* Desk Base Stand */}
            <path
              d="M125 210 C125 200, 136 192, 152 192 L348 192 C364 192, 375 200, 375 210 L365 322 C365 332, 352 338, 335 338 L165 338 C148 338, 135 332, 135 322 Z"
              fill="url(#tfDeskCounter)"
              stroke="#cbd5e1"
              strokeWidth="1.4"
            />
            
            {/* Front Decorative Accent Panel */}
            <path
              d="M148 220 L352 220 L344 310 L156 310 Z"
              fill="#ffffff"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
            {/* Accent Glowing Blue Trim */}
            <path d="M148 220 L352 220" stroke="#0077c2" strokeWidth="3" strokeLinecap="round" />
            
            {/* Emsphere Emblem Badge on Front Counter */}
            <rect x="205" y="250" width="90" height="28" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <text x="214" y="265" fill="#0077c2" fontSize="9" fontWeight="900" letterSpacing="0.02em">
              emsphere
            </text>
            <text x="264" y="265" fill="#f8bb18" fontSize="6.5" fontWeight="800">
              CONNECT
            </text>
            <text x="226" y="274" fill="#64748b" fontSize="5.5" fontWeight="700">
              SMART RECEPTION
            </text>

            {/* Counter Desktop Top Surface */}
            <ellipse cx="250" cy="196" rx="118" ry="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
          </g>

          {/* 3. Reception Self-Check-in Tablet Kiosk */}
          <g id="kiosk-terminal" filter="url(#tfSoftShadow)">
            {/* Tablet Stand */}
            <ellipse cx="240" cy="196" rx="26" ry="6" fill="#64748b" />
            <path d="M236 194 L233 152 L247 152 L244 194 Z" fill="#94a3b8" />

            {/* Tablet Outer Body */}
            <rect x="150" y="78" width="180" height="120" rx="12" fill="url(#tfScreenGrad)" stroke="#1e293b" strokeWidth="2.5" />
            <rect x="152" y="80" width="176" height="116" rx="10" fill="none" stroke="#334155" strokeWidth="1" />

            {/* Screen Glass */}
            <rect x="158" y="86" width="164" height="104" rx="8" fill="#0b1329" />

            {/* Screen Header Bar */}
            <rect x="158" y="86" width="164" height="22" rx="6" fill="url(#tfBlueGrad)" />
            <circle cx="169" cy="97" r="2.5" fill="#ffffff" fillOpacity="0.8" />
            <text x="176" y="100.5" fill="#ffffff" fontSize="7.5" fontWeight="800" letterSpacing="0.04em">
              VISITOR SELF CHECK-IN
            </text>
            <rect x="286" y="91" width="30" height="12" rx="3" fill="#065f46" />
            <text x="291" y="99.5" fill="#34d399" fontSize="6.5" fontWeight="800">READY</text>

            {/* Tablet UI: Welcome & QR Scanner Window */}
            <text x="172" y="120" fill="#f8fafc" fontSize="8.5" fontWeight="800">Welcome to Emsphere HQ</text>
            <text x="172" y="129" fill="#94a3b8" fontSize="6.5" fontWeight="600">Scan QR Code or Tap to Register</text>

            {/* QR Scan Target Frame on Screen */}
            <rect x="170" y="136" width="46" height="46" rx="4" fill="#111c38" stroke="#1e293b" strokeWidth="1" />
            
            {/* Target Corners */}
            <path d="M173 144 L173 139 L178 139" stroke="#009fe3" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M213 144 L213 139 L208 139" stroke="#009fe3" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M173 174 L173 179 L178 179" stroke="#009fe3" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M213 174 L213 179 L208 179" stroke="#009fe3" strokeWidth="1.5" strokeLinecap="round" />

            {/* Micro QR Icon inside frame */}
            <rect x="181" y="147" width="24" height="24" rx="2" fill="#ffffff" />
            <rect x="184" y="150" width="7" height="7" fill="#0077c2" />
            <rect x="195" y="150" width="7" height="7" fill="#0077c2" />
            <rect x="184" y="161" width="7" height="7" fill="#0077c2" />
            <rect x="193" y="161" width="4" height="4" fill="#0077c2" />

            {/* Laser Scan Line */}
            <line x1="170" y1="158" x2="216" y2="158" stroke="#10b981" strokeWidth="1.5" filter="url(#tfGreenGlow)" />

            {/* Screen Action Button 1: "I have an E-Pass" */}
            <rect x="226" y="138" width="88" height="19" rx="4" fill="#0077c2" />
            <text x="236" y="150.5" fill="#ffffff" fontSize="7" fontWeight="800">
              I have an E-Pass →
            </text>

            {/* Screen Action Button 2: "New Visitor" */}
            <rect x="226" y="162" width="88" height="19" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
            <text x="236" y="174.5" fill="#cbd5e1" fontSize="7" fontWeight="700">
              New Visitor Check-in
            </text>
          </g>

          {/* 4. Automated Visitor Badge Printer (Right of Counter) */}
          <g id="badge-printer" filter="url(#tfSoftShadow)">
            {/* Printer Body */}
            <rect x="314" y="156" width="46" height="38" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <ellipse cx="337" cy="156" rx="23" ry="5" fill="#334155" />
            
            {/* Status LED */}
            <circle cx="350" cy="166" r="2" fill="#10b981" filter="url(#tfGreenGlow)" />

            {/* Dispensing Slot */}
            <rect x="322" y="172" width="30" height="3" rx="1.5" fill="#090e17" />

            {/* Fresh Printed Badge Emerging */}
            <g id="printed-badge" filter="url(#tfCardShadow)">
              <rect x="324" y="174" width="26" height="36" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
              <rect x="324" y="174" width="26" height="8" rx="2" fill="#0077c2" />
              <rect x="327" y="185" width="8" height="9" rx="1" fill="#e0f2fe" />
              <rect x="337" y="186" width="10" height="2" fill="#0f172a" />
              <rect x="337" y="190" width="7" height="2" fill="#64748b" />
              {/* Barcode lines */}
              <line x1="327" y1="198" x2="327" y2="205" stroke="#0f172a" strokeWidth="1" />
              <line x1="330" y1="198" x2="330" y2="205" stroke="#0f172a" strokeWidth="0.8" />
              <line x1="333" y1="198" x2="333" y2="205" stroke="#0f172a" strokeWidth="1.2" />
              <line x1="336" y1="198" x2="336" y2="205" stroke="#0f172a" strokeWidth="0.8" />
              <line x1="339" y1="198" x2="339" y2="205" stroke="#0f172a" strokeWidth="1" />
              <line x1="342" y1="198" x2="342" y2="205" stroke="#0f172a" strokeWidth="1.4" />
              <line x1="345" y1="198" x2="345" y2="205" stroke="#0f172a" strokeWidth="0.8" />
            </g>
          </g>

          {/* 5. Mobile E-Pass Smartphone (Floating on Right in 3D) */}
          <g id="mobile-pass-phone" filter="url(#tfSoftShadow)" className="transition-transform duration-300 group-hover:-translate-y-1.5">
            {/* Phone Body */}
            <rect x="390" y="112" width="122" height="232" rx="22" fill="url(#tfPhoneBody)" stroke="#334155" strokeWidth="2.5" />
            
            {/* Phone Screen */}
            <rect x="396" y="118" width="110" height="220" rx="18" fill="#f8fafc" />

            {/* Dynamic Island */}
            <rect x="434" y="123" width="34" height="8" rx="4" fill="#090e17" />
            <circle cx="462" cy="127" r="1.5" fill="#0284c7" />

            {/* Phone App Content: Digital Visitor Pass */}
            <rect x="402" y="138" width="98" height="44" rx="10" fill="url(#tfBlueGrad)" />
            <text x="410" y="152" fill="#ffffff" fontSize="7.5" fontWeight="900">emsphere</text>
            <text x="454" y="152" fill="#f8bb18" fontSize="5.5" fontWeight="800">CONNECT</text>
            <text x="410" y="162" fill="#bae6fd" fontSize="6" fontWeight="700">DIGITAL VISITOR PASS</text>

            <rect x="410" y="168" width="46" height="9" rx="3" fill="#0369a1" />
            <text x="414" y="175" fill="#e0f2fe" fontSize="5.5" fontWeight="800">PASS #EMS-8042</text>

            {/* Verified Badge */}
            <g id="phone-verified">
              <rect x="402" y="188" width="98" height="32" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="418" cy="204" r="10" fill="#e0f2fe" />
              <path d="M414 204 L417 207 L423 201" stroke="#0077c2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              
              <text x="433" y="201" fill="#0f172a" fontSize="7.5" fontWeight="800">Entry Approved</text>
              <text x="433" y="210" fill="#15803d" fontSize="6.5" fontWeight="700">● Validated Today</text>
            </g>

            {/* QR Code on Mobile */}
            <rect x="422" y="226" width="58" height="58" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="426" y="230" width="15" height="15" rx="2" fill="#0077c2" />
            <rect x="429" y="233" width="9" height="9" fill="#ffffff" />
            <rect x="431" y="235" width="5" height="5" fill="#0077c2" />

            <rect x="461" y="230" width="15" height="15" rx="2" fill="#0077c2" />
            <rect x="464" y="233" width="9" height="9" fill="#ffffff" />
            <rect x="466" y="235" width="5" height="5" fill="#0077c2" />

            <rect x="426" y="265" width="15" height="15" rx="2" fill="#0077c2" />
            <rect x="429" y="268" width="9" height="9" fill="#ffffff" />
            <rect x="431" y="270" width="5" height="5" fill="#0077c2" />

            <rect x="445" y="234" width="4" height="4" fill="#0077c2" />
            <rect x="452" y="234" width="4" height="7" fill="#0077c2" />
            <rect x="445" y="246" width="7" height="4" fill="#0077c2" />
            <rect x="455" y="248" width="5" height="5" fill="#0077c2" />
            <rect x="445" y="264" width="6" height="4" fill="#0077c2" />
            <rect x="455" y="262" width="4" height="8" fill="#0077c2" />

            <line x1="422" y1="252" x2="480" y2="252" stroke="#10b981" strokeWidth="1.5" filter="url(#tfGreenGlow)" />

            <rect x="418" y="291" width="66" height="16" rx="4" fill="#dcfce7" stroke="#86efac" strokeWidth="0.8" />
            <text x="424" y="302" fill="#166534" fontSize="6.5" fontWeight="800">
              SCAN AT TURNSTILE
            </text>

            <rect x="436" y="328" width="30" height="3" rx="1.5" fill="#090e17" />
          </g>

          {/* 6. Cloud Network Node (Top Center) */}
          <g id="cloud-network" filter="url(#tfCardShadow)" className="transition-transform duration-300 group-hover:-translate-y-1">
            {/* Connection Dotted Arcs */}
            <path d="M285 40 C285 20, 240 78, 240 78" stroke="#009fe3" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M305 40 C345 20, 425 70, 425 112" stroke="#009fe3" strokeWidth="1.2" strokeDasharray="3 3" />

            {/* Cloud Pill Badge */}
            <rect x="232" y="22" width="128" height="34" rx="17" fill="#ffffff" stroke="#bae6fd" strokeWidth="1.2" />
            
            {/* Cloud Icon */}
            <circle cx="252" cy="39" r="10" fill="#eff6ff" />
            <path
              d="M247 42 C245.3 42, 244 40.7, 244 39 C244 37.5, 245.1 36.3, 246.5 36.1 C247.1 34.3, 248.7 33, 250.7 33 C252.9 33, 254.7 34.6, 255 36.8 C256.1 37.1, 257 38.1, 257 39.3 C257 40.8, 255.8 42, 254.3 42 Z"
              fill="#0077c2"
            />
            <text x="268" y="36" fill="#0f172a" fontSize="8" fontWeight="800">
              Cloud Powered
            </text>
            <text x="268" y="46" fill="#0284c7" fontSize="7" fontWeight="700">
              Centralized Control
            </text>
          </g>

          {/* 7. Transformation Floating Badges */}
          {/* Badge Left: 15-Sec Check-in */}
          <g id="badge-fast" filter="url(#tfCardShadow)" className="transition-transform duration-300 group-hover:-translate-x-1">
            <rect x="20" y="105" width="126" height="36" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="38" cy="123" r="10" fill="#fef3c7" />
            {/* Bolt icon */}
            <path d="M38 116 L34 123 L38 123 L37 130 L42 122 L38 122 Z" fill="#d97706" />
            <text x="54" y="120" fill="#0f172a" fontSize="8" fontWeight="800">
              &lt; 15 Sec Check-in
            </text>
            <text x="54" y="130" fill="#64748b" fontSize="7" fontWeight="600">
              70% Less Wait Time
            </text>
          </g>

          {/* Badge Bottom Left: 100% Security */}
          <g id="badge-secure" filter="url(#tfCardShadow)" className="transition-transform duration-300 group-hover:translate-y-1">
            <rect x="25" y="250" width="128" height="36" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="43" cy="268" r="10" fill="#ecfdf5" />
            {/* Shield Icon */}
            <path d="M43 261 C46 261, 48 262, 48 262 C48 266, 47 270, 43 272 C39 270, 38 266, 38 262 C38 262, 40 261, 43 261 Z" fill="#059669" />
            <text x="59" y="265" fill="#0f172a" fontSize="8" fontWeight="800">
              100% Verified Entry
            </text>
            <text x="59" y="275" fill="#059669" fontSize="7" fontWeight="700">
              Zero Unauthorized Access
            </text>
          </g>

          {/* Badge Bottom Right: Live Demo Ready */}
          <g id="badge-demo" filter="url(#tfCardShadow)" className="transition-transform duration-300 group-hover:translate-x-1">
            <rect x="430" y="58" width="138" height="32" rx="16" fill="#ffffff" stroke="#bae6fd" strokeWidth="1.2" />
            <circle cx="446" cy="74" r="5" fill="#10b981" filter="url(#tfGreenGlow)" />
            <text x="457" y="77" fill="#0f172a" fontSize="8" fontWeight="800">
              Free 15-Min Live Demo
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
