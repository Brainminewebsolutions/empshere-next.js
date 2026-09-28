"use client";

function UsersGroupIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.003.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.232.75.75 0 0 0 .364-.63v-.12a5.625 5.625 0 0 0-5.188-5.615Z" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  );
}

function ClockAlertIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
    </svg>
  );
}

export default function HeadcountHeroVector() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] select-none py-4 sm:py-6 lg:max-w-none">
      {/* Ambient warm radial glow backdrop matching emCount page theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_48%,rgba(248,187,24,0.26),rgba(0,119,194,0.15)_50%,transparent_72%)] blur-2xl"
      />

      {/* Main Vector Stage */}
      <div className="group relative">
        <svg
          viewBox="0 0 600 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.012]"
          aria-label="Clean professional vector illustration of emCount headcount software with live multi-floor occupancy console, real-time safety roll call, and biometric zone sensors"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="hcPedestalGrad" x1="120" y1="360" x2="480" y2="460" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#f8fafc" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="hcChassisGrad" x1="120" y1="50" x2="480" y2="390" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="hcScreenGrad" x1="140" y1="70" x2="460" y2="370" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0b1329" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#132247" />
            </linearGradient>

            <linearGradient id="hcPrimaryGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0077c2" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <linearGradient id="hcCardDarkGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.98" />
            </linearGradient>

            {/* Pulsing beacon glow filter */}
            <filter id="beaconGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Base Isometric Pedestal */}
          <g id="hc-pedestal">
            {/* Ambient ground shadow */}
            <ellipse cx="300" cy="438" rx="235" ry="38" fill="#000000" fillOpacity="0.07" />
            <ellipse cx="300" cy="432" rx="200" ry="30" fill="#0077c2" fillOpacity="0.06" />

            {/* Perspective Isometric Base Plate */}
            <path d="M125 408 L300 443 L475 408 L300 373 Z" fill="url(#hcPedestalGrad)" stroke="#cbd5e1" strokeWidth="1.2" />
            {/* Base thickness bevel */}
            <path d="M125 408 L125 415 L300 450 L475 420 L475 408 L300 443 Z" fill="#cbd5e1" />
          </g>

          {/* 2. Radar Pulse Rings (Live Premises Scanning) */}
          <g id="hc-radar-rings">
            <ellipse cx="300" cy="385" rx="160" ry="24" stroke="#0077c2" strokeOpacity="0.25" strokeDasharray="6 4" strokeWidth="1.5" />
            <ellipse cx="300" cy="385" rx="105" ry="16" stroke="#0fb880" strokeOpacity="0.35" strokeWidth="1.2" />
          </g>

          {/* 3. Central Tablet Command Chassis */}
          <g id="hc-main-tablet">
            {/* Backing Depth Shadow */}
            <rect x="138" y="58" width="324" height="332" rx="24" fill="#000000" fillOpacity="0.18" />
            
            {/* Outer Metallic Bezel */}
            <rect x="136" y="54" width="324" height="332" rx="24" fill="url(#hcChassisGrad)" stroke="#334155" strokeWidth="2" />
            
            {/* Screen Display Surface */}
            <rect x="148" y="66" width="300" height="308" rx="16" fill="url(#hcScreenGrad)" stroke="#1e293b" strokeWidth="1.5" />

            {/* Top App Header inside Screen */}
            <g transform="translate(162, 80)">
              <rect x="0" y="0" width="272" height="28" rx="7" fill="#1e293b" fillOpacity="0.75" />
              
              {/* Live Status Beacon with animated pulse */}
              <circle cx="14" cy="14" r="4.5" fill="#10b981" filter="url(#beaconGlow)" />
              <circle cx="14" cy="14" r="8" stroke="#10b981" strokeOpacity="0.5" strokeWidth="1.2">
                <animate attributeName="r" values="4.5;9;4.5" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
              </circle>
              
              <text x="28" y="17.5" fill="#e2e8f0" fontSize="10" fontWeight="700" letterSpacing="0.05em" fontFamily="Inter, system-ui, sans-serif">
                LIVE PREMISES MONITOR
              </text>
              <text x="258" y="17.5" textAnchor="end" fill="#38bdf8" fontSize="9.5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                ZONE: ALL FLOORS
              </text>
            </g>

            {/* Main KPI Counter Card inside Screen */}
            <g transform="translate(162, 118)">
              <rect x="0" y="0" width="272" height="92" rx="12" fill="url(#hcCardDarkGrad)" stroke="#334155" strokeWidth="1.2" />
              
              {/* Glow accent stripe on left */}
              <path d="M0 12 Q0 0 12 0 L14 0 L14 92 L12 92 Q0 92 0 80 Z" fill="url(#hcPrimaryGrad)" />

              <text x="26" y="24" fill="#94a3b8" fontSize="9.5" fontWeight="700" letterSpacing="0.04em" fontFamily="Inter, system-ui, sans-serif">
                TOTAL ACTIVE HEADCOUNT
              </text>
              
              {/* Big Live Number */}
              <text x="26" y="60" fill="#ffffff" fontSize="36" fontWeight="900" letterSpacing="-0.02em" fontFamily="Inter, system-ui, sans-serif">
                1,428
              </text>
              <text x="140" y="44" fill="#10b981" fontSize="10.5" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
                ● 100% IN SAFE ZONES
              </text>
              <text x="140" y="60" fill="#64748b" fontSize="9.5" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
                Capacity: 74% • Nominal
              </text>

              {/* Progress Bar Track */}
              <rect x="26" y="73" width="220" height="6" rx="3" fill="#334155" />
              <rect x="26" y="73" width="165" height="6" rx="3" fill="url(#hcPrimaryGrad)" />
            </g>

            {/* 3 Floor-wise Live Breakdown Cards */}
            <g transform="translate(162, 220)">
              {/* Floor 1 Card */}
              <g transform="translate(0, 0)">
                <rect x="0" y="0" width="86" height="74" rx="9" fill="#1e293b" fillOpacity="0.8" stroke="#334155" strokeWidth="1" />
                <circle cx="14" cy="14" r="3.5" fill="#10b981" />
                <text x="22" y="16.5" fill="#94a3b8" fontSize="8" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">SHOP FLOOR</text>
                <text x="12" y="42" fill="#ffffff" fontSize="19" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">684</text>
                <text x="12" y="58" fill="#38bdf8" fontSize="8.5" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Shift A + B</text>
                <rect x="12" y="64" width="62" height="3" rx="1.5" fill="#0284c7" />
              </g>

              {/* Floor 2 Card */}
              <g transform="translate(93, 0)">
                <rect x="0" y="0" width="86" height="74" rx="9" fill="#1e293b" fillOpacity="0.8" stroke="#334155" strokeWidth="1" />
                <circle cx="14" cy="14" r="3.5" fill="#10b981" />
                <text x="22" y="16.5" fill="#94a3b8" fontSize="8" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">R&amp;D / LABS</text>
                <text x="12" y="42" fill="#ffffff" fontSize="19" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">412</text>
                <text x="12" y="58" fill="#facc15" fontSize="8.5" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Access Clean</text>
                <rect x="12" y="64" width="62" height="3" rx="1.5" fill="#eab308" />
              </g>

              {/* Floor 3 Card */}
              <g transform="translate(186, 0)">
                <rect x="0" y="0" width="86" height="74" rx="9" fill="#1e293b" fillOpacity="0.8" stroke="#334155" strokeWidth="1" />
                <circle cx="14" cy="14" r="3.5" fill="#10b981" />
                <text x="22" y="16.5" fill="#94a3b8" fontSize="8" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">ADMIN / CORPS</text>
                <text x="12" y="42" fill="#ffffff" fontSize="19" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">332</text>
                <text x="12" y="58" fill="#10b981" fontSize="8.5" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">All Accounted</text>
                <rect x="12" y="64" width="62" height="3" rx="1.5" fill="#10b981" />
              </g>
            </g>

            {/* Bottom Safety Banner inside Tablet */}
            <g transform="translate(162, 304)">
              <rect x="0" y="0" width="272" height="38" rx="8" fill="#0f2538" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 2" />
              <circle cx="18" cy="19" r="8" fill="#0284c7" fillOpacity="0.25" />
              
              {/* Shield check icon */}
              <path d="M18 13 L23 15.5 V19 C23 22 18 24 18 24 C18 24 13 22 13 19 V15.5 Z" fill="#38bdf8" />
              <path d="M16 18.5 L17.5 20 L20.5 17" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

              <text x="34" y="18" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                EMERGENCY EVACUATION READY
              </text>
              <text x="34" y="29" fill="#94a3b8" fontSize="8" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">
                Auto muster roll generation synced to turnstiles
              </text>
            </g>
          </g>

          {/* 4. Network Connecting Lines with Floating Zone Nodes */}
          {/* Node Left (Shop Floor Worker Pod) */}
          <g transform="translate(68, 205)">
            <path d="M55 25 C95 25, 115 40, 136 50" stroke="#0077c2" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
            <circle cx="30" cy="25" r="26" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <circle cx="30" cy="25" r="22" fill="#eff6ff" />
            {/* Factory / Shop floor icon */}
            <path d="M22 30 V22 L27 25 V22 L32 25 V20 L38 23 V30 Z" fill="#0077c2" />
            <circle cx="48" cy="12" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
          </g>

          {/* Node Right (Engineering / R&D Pod) */}
          <g transform="translate(475, 165)">
            <path d="M-15 40 C-55 40, -85 60, -115 70" stroke="#f8bb18" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
            <circle cx="30" cy="25" r="26" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <circle cx="30" cy="25" r="22" fill="#fffbeb" />
            {/* Tech Gear icon */}
            <circle cx="30" cy="25" r="8" fill="#f8bb18" />
            <circle cx="30" cy="25" r="4" fill="#ffffff" />
            <circle cx="48" cy="12" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
          </g>

          {/* Node Bottom Right (Safety Muster Point Pod) */}
          <g transform="translate(465, 315)">
            <path d="M-10 10 C-50 10, -70 20, -105 30" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
            <circle cx="30" cy="25" r="26" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <circle cx="30" cy="25" r="22" fill="#ecfdf5" />
            {/* Shield icon */}
            <path d="M30 15 L38 18 V24 C38 29 30 32 30 32 C30 32 22 29 22 24 V18 Z" fill="#10b981" />
            <path d="M27 23 L29 25 L34 20" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="48" cy="12" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
          </g>
        </svg>

        {/* Floating Badge 1 (Top-Left): 1,428 On-Premises with Real-time Biometric Sync */}
        <div
          className="payroll-float absolute -left-2 top-[5%] sm:-left-6 sm:top-[5%] flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-white/85 bg-white/95 px-3 py-2 sm:px-4 sm:py-2.5 shadow-[0_14px_32px_-10px_rgba(0,0,0,0.16),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:scale-105"
        >
          <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#0077c2] text-white shadow-sm">
            <UsersGroupIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </span>
          <div>
            <p className="text-xs sm:text-[14px] font-bold text-[#0f172a] leading-tight">
              1,428 On-Premises
            </p>
            <p className="text-[10px] sm:text-[11.5px] font-medium text-[#64748b]">
              100% Real-time Biometric Sync
            </p>
          </div>
        </div>

        {/* Floating Badge 2 (Bottom-Left): Evacuation Roll-Call */}
        <div
          className="payroll-float absolute left-2 bottom-[2%] sm:left-4 sm:bottom-[3%] flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-white/85 bg-white/95 px-3 py-2 sm:px-4 sm:py-2.5 shadow-[0_14px_32px_-10px_rgba(0,0,0,0.16),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:scale-105"
          style={{ animationDelay: "-2.5s" }}
        >
          <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#0fb880] text-white shadow-sm">
            <ShieldCheckIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </span>
          <div>
            <p className="text-xs sm:text-[14px] font-bold text-[#0f172a] leading-tight">
              Evacuation Roll-Call
            </p>
            <p className="text-[10px] sm:text-[11.5px] font-medium text-[#64748b]">
              Automated 1-Click Print Ready
            </p>
          </div>
        </div>

        {/* Floating Badge 3 (Top-Right): Zero Red-Zone Breaches */}
        <div
          className="payroll-float absolute -right-2 top-[10%] sm:-right-5 sm:top-[10%] flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-white/85 bg-white/95 px-3 py-2 sm:px-4 sm:py-2.5 shadow-[0_14px_32px_-10px_rgba(0,0,0,0.16),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:scale-105"
          style={{ animationDelay: "-1.5s" }}
        >
          <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#f8bb18] text-white shadow-sm">
            <ClockAlertIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </span>
          <div>
            <p className="text-xs sm:text-[14px] font-bold text-[#0f172a] leading-tight">
              Zero Red-Zone Breaches
            </p>
            <p className="text-[10px] sm:text-[11.5px] font-medium text-[#64748b]">
              SMS &amp; Email Alerts Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
