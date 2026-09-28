function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 10.5l3.5 3.5 7.5-8" />
    </svg>
  );
}

export default function VisitorHeroVector() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] select-none py-4 sm:py-6 lg:max-w-none">
      {/* Ambient warm radial glow backdrop matching emSphere brand theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_48%,rgba(248,187,24,0.22),rgba(0,119,194,0.14)_50%,transparent_72%)] blur-2xl"
      />

      {/* Main Vector Stage */}
      <div className="group relative">
        <svg
          viewBox="0 0 580 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.012]"
          aria-label="Clean professional vector illustration of smart visitor management system with touchless QR check-in kiosk, digital visitor pass, turnstile access control, and live lobby security analytics"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="vmsPedestalGrad" x1="120" y1="360" x2="480" y2="460" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#f8fafc" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="vmsKioskBody" x1="160" y1="60" x2="420" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            <linearGradient id="vmsScreenHeader" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0077c2" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <linearGradient id="vmsPhoneBody" x1="60" y1="160" x2="200" y2="430" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="vmsScanBeam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="30%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="vmsTurnstileGlow" x1="420" y1="260" x2="520" y2="430" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>

            <linearGradient id="vmsBadgeHeaderGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f8bb18" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient id="vmsMetricGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0077c2" />
              <stop offset="100%" stopColor="#005a96" />
            </linearGradient>

            {/* Soft Drop Shadows */}
            <filter id="vmsSoftShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0f172a" floodOpacity="0.1" />
            </filter>
            <filter id="vmsCardShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0077c2" floodOpacity="0.08" />
            </filter>
            <filter id="vmsNeonGlow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
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
            <ellipse cx="290" cy="436" rx="230" ry="38" fill="#000000" fillOpacity="0.06" />
            <ellipse cx="290" cy="432" rx="195" ry="30" fill="#0077c2" fillOpacity="0.05" />

            {/* Pedestal Surface */}
            <path
              d="M95 404 C185 366, 395 366, 485 404 C514 418, 514 436, 485 450 C395 484, 185 484, 95 450 C66 436, 66 418, 95 404 Z"
              fill="url(#vmsPedestalGrad)"
              stroke="#cbd5e1"
              strokeWidth="1.2"
            />
            {/* Pedestal Depth rim */}
            <path
              d="M95 450 C185 484, 395 484, 485 450 L485 458 C395 492, 185 492, 95 458 Z"
              fill="#94a3b8"
              fillOpacity="0.35"
            />
          </g>

          {/* 2. Access Control Turnstile / Gate Pillar (Right side) */}
          <g id="turnstile-gate" transform="translate(420, 240)">
            {/* Barrier shadow */}
            <ellipse cx="48" cy="180" rx="38" ry="10" fill="#000000" fillOpacity="0.08" />

            {/* Turnstile Base & Pillar */}
            <rect x="22" y="55" width="52" height="125" rx="8" fill="#0f172a" />
            <rect x="25" y="58" width="46" height="119" rx="6" fill="#1e293b" />

            {/* Accent LED Stripe */}
            <line x1="28" y1="70" x2="68" y2="70" stroke="#0077c2" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="28" y1="76" x2="52" y2="76" stroke="#f8bb18" strokeWidth="2" strokeLinecap="round" />

            {/* Acrylic Optical Swing Arm / Gate Glass with Green Light */}
            <path
              d="M24 100 L-35 85 L-35 125 L24 140 Z"
              fill="url(#vmsTurnstileGlow)"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <circle cx="-35" cy="105" r="4" fill="#10b981" filter="url(#vmsNeonGlow)" />

            {/* Scanner / RFID Face Reader top cap */}
            <path d="M20 55 C20 42, 76 42, 76 55 Z" fill="#334155" />
            <rect x="34" y="32" width="28" height="23" rx="4" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.2" />
            <circle cx="48" cy="43.5" r="4" fill="#10b981" />
            {/* Gate Status Pill */}
            <rect x="20" y="88" width="56" height="15" rx="4" fill="#059669" />
            <text x="48" y="99" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
              GATE OPEN
            </text>
          </g>

          {/* 3. Main Central Reception Terminal / Touchscreen Kiosk */}
          <g id="kiosk-terminal" filter="url(#vmsSoftShadow)">
            {/* Kiosk Bezel & Chassis */}
            <rect x="175" y="48" width="275" height="346" rx="20" fill="url(#vmsKioskBody)" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="183" y="56" width="259" height="330" rx="14" fill="#ffffff" />

            {/* Top Device Camera Bar & Face Recognition Reticle */}
            <g transform="translate(183, 56)">
              <rect x="0" y="0" width="259" height="36" rx="14" fill="url(#vmsScreenHeader)" />
              <rect x="0" y="24" width="259" height="12" fill="url(#vmsScreenHeader)" />

              {/* Logo / Title in Top Bar */}
              <circle cx="18" cy="18" r="8" fill="#ffffff" fillOpacity="0.2" />
              <circle cx="18" cy="18" r="4.5" fill="#f8bb18" />
              <text x="32" y="21.5" fill="#ffffff" fontSize="9.5" fontWeight="800" letterSpacing="0.05em" fontFamily="Inter, system-ui, sans-serif">
                emVisit <tspan fill="#fef08a" fontWeight="600">| Smart Kiosk</tspan>
              </text>

              {/* Live Status indicator */}
              <circle cx="230" cy="18" r="4" fill="#4ade80" />
              <circle cx="230" cy="18" r="7" stroke="#4ade80" strokeWidth="1" strokeOpacity="0.6" />
              <text x="220" y="20.5" textAnchor="end" fill="#ffffff" fontSize="7.5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                ONLINE
              </text>
            </g>

            {/* Interactive Screen Sub-Header: Search & Camera Scanner */}
            <g transform="translate(196, 104)">
              <rect x="0" y="0" width="233" height="30" rx="7" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="16" cy="15" r="5" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
              <line x1="20" y1="19" x2="24" y2="23" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              <text x="30" y="18.5" fill="#64748b" fontSize="8.5" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">
                Tap badge, scan QR, or enter Phone No...
              </text>

              {/* Camera Lens Reticle */}
              <rect x="198" y="5" width="28" height="20" rx="4" fill="#0077c2" fillOpacity="0.1" stroke="#0077c2" strokeWidth="1" />
              <circle cx="212" cy="15" r="4" fill="#0077c2" />
            </g>

            {/* Main Digital Visitor Pass Card inside Kiosk */}
            <g transform="translate(196, 144)">
              {/* Badge Outer Shell with Gold Header */}
              <rect x="0" y="0" width="233" height="176" rx="12" fill="#ffffff" stroke="#f8bb18" strokeWidth="1.5" filter="url(#vmsCardShadow)" />

              {/* Gold Top Banner */}
              <path d="M0 12 C0 5.37 5.37 0 12 0 L221 0 C227.63 0 233 5.37 233 12 L233 34 L0 34 Z" fill="url(#vmsBadgeHeaderGrad)" />
              <text x="14" y="21" fill="#78350f" fontSize="9" fontWeight="900" letterSpacing="0.07em" fontFamily="Inter, system-ui, sans-serif">
                OFFICIAL VISITOR PASS
              </text>
              <rect x="160" y="8" width="62" height="18" rx="9" fill="#ffffff" />
              <circle cx="170" cy="17" r="3" fill="#10b981" />
              <text x="176" y="20" fill="#047857" fontSize="7.5" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
                VERIFIED
              </text>

              {/* Visitor Avatar & Bio */}
              <g transform="translate(14, 44)">
                {/* Avatar container */}
                <rect x="0" y="0" width="46" height="52" rx="7" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
                {/* Stylized Avatar Illustration */}
                <circle cx="23" cy="18" r="10" fill="#0077c2" />
                <path d="M10 44 C10 32, 36 32, 36 44 Z" fill="#1e293b" />
                {/* Lanyard Clip */}
                <rect x="18" y="-6" width="10" height="6" rx="2" fill="#94a3b8" />

                {/* Name & Details */}
                <text x="56" y="14" fill="#0f172a" fontSize="11" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
                  Rahul Sharma
                </text>
                <text x="56" y="26" fill="#0077c2" fontSize="8" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                  Apex Global Technologies
                </text>
                <text x="56" y="38" fill="#64748b" fontSize="7.5" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
                  Host: <tspan fill="#1e293b" fontWeight="700">Pooja Verma (HR Dept)</tspan>
                </text>
                <text x="56" y="49" fill="#64748b" fontSize="7" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">
                  Pass: <tspan fill="#f59e0b" fontWeight="800">#VMS-2026-981</tspan> • Floor 3
                </text>
              </g>

              {/* Horizontal Divider Line */}
              <line x1="14" y1="106" x2="219" y2="106" stroke="#f1f5f9" strokeWidth="1.5" />

              {/* Bottom Quick Badges: Time, Purpose, Security Clearance */}
              <g transform="translate(14, 114)">
                <rect x="0" y="0" width="64" height="24" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                <text x="32" y="10" textAnchor="middle" fill="#94a3b8" fontSize="6" fontWeight="700">TIME IN</text>
                <text x="32" y="20" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">10:30 AM</text>

                <rect x="70" y="0" width="66" height="24" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                <text x="103" y="10" textAnchor="middle" fill="#94a3b8" fontSize="6" fontWeight="700">PURPOSE</text>
                <text x="103" y="20" textAnchor="middle" fill="#0f172a" fontSize="7.5" fontWeight="800">Vendor Audit</text>

                <rect x="142" y="0" width="63" height="24" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                <text x="173.5" y="10" textAnchor="middle" fill="#94a3b8" fontSize="6" fontWeight="700">NDA STATUS</text>
                <text x="173.5" y="20" textAnchor="middle" fill="#059669" fontSize="8" fontWeight="800">SIGNED ✓</text>
              </g>

              {/* Instant Check-in Action Bar */}
              <g transform="translate(14, 145)">
                <rect x="0" y="0" width="205" height="23" rx="6" fill="#0077c2" />
                <path d="M78 11.5 L82 15.5 L90 7.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <text x="96" y="15" fill="#ffffff" fontSize="8.5" fontWeight="800" letterSpacing="0.03em" fontFamily="Inter, system-ui, sans-serif">
                  ACCESS GRANTED
                </text>
              </g>
            </g>

            {/* Bottom Screen Kiosk Controls */}
            <g transform="translate(196, 332)">
              <rect x="0" y="0" width="112" height="34" rx="7" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
              <text x="12" y="15" fill="#64748b" fontSize="7" fontWeight="700">BADGE PRINTING</text>
              <text x="12" y="27" fill="#10b981" fontSize="8" fontWeight="800">Auto-Dispensing • Tray 1</text>

              <rect x="121" y="0" width="112" height="34" rx="7" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
              <text x="133" y="15" fill="#64748b" fontSize="7" fontWeight="700">HOST NOTIFICATION</text>
              <text x="133" y="27" fill="#0284c7" fontSize="8" fontWeight="800">WhatsApp Alert Sent ✓</text>
            </g>
          </g>

          {/* 4. Contactless Smartphone with QR Pass (Left-Foreground Angle) */}
          <g id="mobile-qr-scanner" filter="url(#vmsSoftShadow)" transform="translate(58, 160)">
            {/* Phone Chassis */}
            <rect x="0" y="0" width="128" height="230" rx="18" fill="url(#vmsPhoneBody)" stroke="#475569" strokeWidth="1.8" />
            <rect x="4" y="4" width="120" height="222" rx="15" fill="#090d16" />

            {/* Camera punch hole / notch */}
            <circle cx="64" cy="14" r="3" fill="#1e293b" />
            <circle cx="64" cy="14" r="1.5" fill="#0077c2" />

            {/* Phone Screen Canvas */}
            <rect x="8" y="24" width="112" height="194" rx="10" fill="#ffffff" />

            {/* App Header */}
            <rect x="8" y="24" width="112" height="26" rx="10" fill="#0077c2" />
            <rect x="8" y="38" width="112" height="12" fill="#0077c2" />
            <text x="64" y="40" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="800" letterSpacing="0.04em" fontFamily="Inter, system-ui, sans-serif">
              TOUCHLESS E-PASS
            </text>

            {/* Sub-label */}
            <text x="64" y="60" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
              Scan at Entrance Gate
            </text>

            {/* High-Fidelity Vector QR Code Pattern */}
            <g transform="translate(26, 68)">
              {/* White background square with border */}
              <rect x="0" y="0" width="76" height="76" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />

              {/* QR Corner Anchor 1 (Top-Left) */}
              <rect x="6" y="6" width="18" height="18" rx="2" fill="#0f172a" />
              <rect x="9" y="9" width="12" height="12" fill="#ffffff" />
              <rect x="12" y="12" width="6" height="6" fill="#0077c2" />

              {/* QR Corner Anchor 2 (Top-Right) */}
              <rect x="52" y="6" width="18" height="18" rx="2" fill="#0f172a" />
              <rect x="55" y="9" width="12" height="12" fill="#ffffff" />
              <rect x="58" y="12" width="6" height="6" fill="#0077c2" />

              {/* QR Corner Anchor 3 (Bottom-Left) */}
              <rect x="6" y="52" width="18" height="18" rx="2" fill="#0f172a" />
              <rect x="9" y="55" width="12" height="12" fill="#ffffff" />
              <rect x="12" y="58" width="6" height="6" fill="#0077c2" />

              {/* Interior QR Data Bits */}
              <rect x="30" y="8" width="5" height="5" fill="#0f172a" />
              <rect x="39" y="8" width="5" height="5" fill="#0f172a" />
              <rect x="30" y="18" width="5" height="5" fill="#0f172a" />
              <rect x="42" y="18" width="4" height="4" fill="#0f172a" />
              <rect x="10" y="32" width="5" height="5" fill="#0f172a" />
              <rect x="20" y="32" width="5" height="5" fill="#0f172a" />
              <rect x="30" y="30" width="7" height="7" fill="#0077c2" />
              <rect x="40" y="30" width="6" height="6" fill="#0f172a" />
              <rect x="50" y="32" width="5" height="5" fill="#0f172a" />
              <rect x="62" y="32" width="5" height="5" fill="#0f172a" />
              <rect x="18" y="42" width="6" height="5" fill="#0f172a" />
              <rect x="32" y="42" width="5" height="5" fill="#0f172a" />
              <rect x="44" y="42" width="6" height="5" fill="#0f172a" />
              <rect x="56" y="42" width="6" height="5" fill="#0f172a" />
              <rect x="32" y="54" width="5" height="5" fill="#0f172a" />
              <rect x="42" y="54" width="5" height="5" fill="#0077c2" />
              <rect x="54" y="54" width="5" height="5" fill="#0f172a" />
              <rect x="34" y="64" width="6" height="5" fill="#0f172a" />
              <rect x="48" y="64" width="6" height="5" fill="#0f172a" />
              <rect x="60" y="64" width="6" height="5" fill="#0f172a" />

              {/* Laser Scanner Active Beam Line */}
              <line x1="2" y1="38" x2="74" y2="38" stroke="url(#vmsScanBeam)" strokeWidth="3" filter="url(#vmsNeonGlow)" />
            </g>

            {/* Mobile Pass Status Box */}
            <g transform="translate(16, 154)">
              <rect x="0" y="0" width="96" height="24" rx="6" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1" />
              <circle cx="12" cy="12" r="3.5" fill="#10b981" />
              <text x="22" y="15" fill="#065f46" fontSize="7" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
                ENTRY APPROVED
              </text>
            </g>

            <g transform="translate(16, 184)">
              <rect x="0" y="0" width="96" height="24" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
              <text x="48" y="11" textAnchor="middle" fill="#64748b" fontSize="6" fontWeight="700">EXPIRES TODAY</text>
              <text x="48" y="20" textAnchor="middle" fill="#0f172a" fontSize="7.5" fontWeight="800">06:00 PM</text>
            </g>
          </g>

          {/* 5. Live Reception Occupancy & Security Metrics HUD (Top-Right Floating Panel) */}
          <g id="metrics-hud" filter="url(#vmsSoftShadow)" transform="translate(395, 32)">
            <rect x="0" y="0" width="168" height="96" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" />

            {/* Header with blue badge */}
            <rect x="0" y="0" width="168" height="26" rx="12" fill="#0f172a" />
            <rect x="0" y="16" width="168" height="10" fill="#0f172a" />
            <circle cx="14" cy="13" r="3.5" fill="#10b981" filter="url(#vmsNeonGlow)" />
            <text x="24" y="16.5" fill="#ffffff" fontSize="8" fontWeight="800" letterSpacing="0.05em" fontFamily="Inter, system-ui, sans-serif">
              LIVE PREMISES AUDIT
            </text>

            {/* Stat Row 1: Visitors on-site */}
            <g transform="translate(12, 34)">
              <text x="0" y="12" fill="#64748b" fontSize="7.5" fontWeight="700">ACTIVE ON-SITE</text>
              <text x="144" y="13" textAnchor="end" fill="#0077c2" fontSize="13" fontWeight="900" fontFamily="Inter, system-ui, sans-serif">
                142
              </text>
              {/* Mini progress track */}
              <rect x="0" y="18" width="144" height="4" rx="2" fill="#f1f5f9" />
              <rect x="0" y="18" width="102" height="4" rx="2" fill="#0077c2" />
            </g>

            {/* Stat Row 2: Pre-registered & Checked In */}
            <g transform="translate(12, 64)">
              <rect x="0" y="0" width="68" height="24" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
              <text x="34" y="10" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="600">TODAY IN</text>
              <text x="34" y="20.5" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="800">186</text>

              <rect x="76" y="0" width="68" height="24" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
              <text x="110" y="10" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="600">PRE-BOOKED</text>
              <text x="110" y="20.5" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="800">24</text>
            </g>
          </g>
        </svg>

        {/* Floating Badge 1 (Top-Left): Touchless QR Check-in */}
        <div
          className="payroll-float absolute -left-2 top-[8%] sm:-left-4 sm:top-[9%] flex items-center gap-2 sm:gap-2.5 rounded-xl border border-white/80 bg-white/95 px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:scale-105"
        >
          <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-[#d1f4e3] text-[#0b8f63] shadow-sm">
            <CheckIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
          <span className="text-xs sm:text-[13.5px] font-semibold text-[#1f1f1f] whitespace-nowrap">
            Touchless QR Check-in
          </span>
        </div>

        {/* Floating Badge 2 (Bottom-Right): Host Alert via WhatsApp & SMS */}
        <div
          className="payroll-float absolute -right-1 bottom-[8%] sm:-right-4 sm:bottom-[9%] flex items-center gap-2 sm:gap-2.5 rounded-xl border border-white/80 bg-white/95 px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:scale-105"
          style={{ animationDelay: "-3s" }}
        >
          <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-[#fee6b1] text-[#b07d00] shadow-sm">
            <CheckIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
          <span className="text-xs sm:text-[13.5px] font-semibold text-[#1f1f1f] whitespace-nowrap">
            Host SMS & WhatsApp Alert
          </span>
        </div>
      </div>
    </div>
  );
}
