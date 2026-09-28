"use client";

function UsersGroupIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.003.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.232.75.75 0 0 0 .364-.63v-.12a5.625 5.625 0 0 0-5.188-5.615Z" />
    </svg>
  );
}

function ClockRosterIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
    </svg>
  );
}

function MapPinIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
  );
}

function CloudShieldIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  );
}

export default function WorkforceHeroVector() {
  return (
    <div className="relative mx-auto w-full max-w-[580px] select-none py-4 sm:py-6 lg:max-w-none">
      {/* Ambient warm radial glow backdrop matching emSphere brand theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_48%,rgba(248,187,24,0.25),rgba(0,119,194,0.16)_52%,transparent_74%)] blur-2xl"
      />

      {/* Main Vector Stage */}
      <div className="group relative">
        <svg
          viewBox="0 0 620 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.012]"
          aria-label="Clean professional vector illustration of emWorkforce enterprise scheduling console, mobile ESS GPS geofence app, and smart NFC ID access"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="wfmConsoleBg" x1="60" y1="40" x2="470" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>

            <linearGradient id="wfmBluePill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0077c2" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <linearGradient id="wfmEmeraldPill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0fb880" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            <linearGradient id="wfmGoldPill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8bb18" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient id="wfmPhoneChassis" x1="410" y1="90" x2="590" y2="430" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="wfmBadgeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f0f7ff" />
            </linearGradient>

            <linearGradient id="wfmGoldChip" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            <filter id="wfmDropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#003566" floodOpacity="0.12" />
            </filter>

            <filter id="wfmPhoneShadow" x="-30%" y="-20%" width="160%" height="140%">
              <feDropShadow dx="4" dy="24" stdDeviation="22" floodColor="#000000" floodOpacity="0.22" />
            </filter>
          </defs>

          {/* 1. Ground Pedestal / Elevation Shadow */}
          <ellipse cx="310" cy="452" rx="270" ry="24" fill="#000000" fillOpacity="0.06" />
          <ellipse cx="310" cy="448" rx="220" ry="18" fill="#0077c2" fillOpacity="0.05" />

          {/* 2. Main Enterprise Roster & Scheduling Console */}
          <g id="main-console" filter="url(#wfmDropShadow)">
            {/* Console Card Background */}
            <rect x="45" y="44" width="415" height="305" rx="16" fill="url(#wfmConsoleBg)" stroke="#e2e8f0" strokeWidth="1.2" />

            {/* Window Titlebar */}
            <path d="M45 60 Q45 44 61 44 L444 44 Q460 44 460 60 L460 78 L45 78 Z" fill="#ffffff" />
            <line x1="45" y1="78" x2="460" y2="78" stroke="#f1f5f9" strokeWidth="1.2" />

            {/* Window Controls */}
            <circle cx="64" cy="61" r="4.5" fill="#f87171" />
            <circle cx="78" cy="61" r="4.5" fill="#fbbf24" />
            <circle cx="92" cy="61" r="4.5" fill="#34d399" />

            {/* Window Title */}
            <text x="110" y="65" fill="#64748b" fontSize="10.5" fontFamily="Inter, system-ui, sans-serif">
              <tspan fill="#0077c2" fontWeight="800">emWorkForce</tspan> <tspan fill="#cbd5e1">|</tspan> <tspan fill="#0f172a" fontWeight="700">Enterprise Shift Scheduling</tspan>
            </text>

            {/* Live Status Pill */}
            <rect x="360" y="52" width="86" height="18" rx="5" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="0.8" />
            <circle cx="370" cy="61" r="3" fill="#10b981" />
            <text x="378" y="64" fill="#047857" fontSize="8" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
              12 HUBS LIVE
            </text>

            {/* Top KPI Metrics Banner inside Console */}
            <g transform="translate(62, 92)">
              <rect x="0" y="0" width="380" height="46" rx="9" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
              
              {/* Metric 1 */}
              <g transform="translate(14, 8)">
                <text x="0" y="10" fill="#64748b" fontSize="8" fontWeight="700" letterSpacing="0.04em" fontFamily="Inter, system-ui, sans-serif">TOTAL STAFF</text>
                <text x="0" y="26" fill="#0f172a" fontSize="15" fontWeight="900" fontFamily="Inter, system-ui, sans-serif">24,580</text>
                <text x="62" y="25" fill="#10b981" fontSize="8.5" fontWeight="700">● 98.6%</text>
              </g>

              <line x1="126" y1="8" x2="126" y2="38" stroke="#f1f5f9" strokeWidth="1.5" />

              {/* Metric 2 */}
              <g transform="translate(140, 8)">
                <text x="0" y="10" fill="#64748b" fontSize="8" fontWeight="700" letterSpacing="0.04em" fontFamily="Inter, system-ui, sans-serif">SHIFT COVERAGE</text>
                <text x="0" y="26" fill="#0077c2" fontSize="15" fontWeight="900" fontFamily="Inter, system-ui, sans-serif">99.4%</text>
                <text x="56" y="25" fill="#64748b" fontSize="8" fontWeight="600">Optimal</text>
              </g>

              <line x1="244" y1="8" x2="244" y2="38" stroke="#f1f5f9" strokeWidth="1.5" />

              {/* Metric 3 */}
              <g transform="translate(258, 8)">
                <text x="0" y="10" fill="#64748b" fontSize="8" fontWeight="700" letterSpacing="0.04em" fontFamily="Inter, system-ui, sans-serif">GEO-FENCE PUNCH</text>
                <text x="0" y="26" fill="#d97706" fontSize="15" fontWeight="900" fontFamily="Inter, system-ui, sans-serif">18,420</text>
                <text x="58" y="25" fill="#10b981" fontSize="8" fontWeight="700">Active</text>
              </g>
            </g>

            {/* Interactive Shift Timeline Grid */}
            <g transform="translate(62, 150)">
              <rect x="0" y="0" width="380" height="142" rx="9" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />

              {/* Timeline Column Headers */}
              <g transform="translate(12, 14)">
                <text x="0" y="0" fill="#64748b" fontSize="8" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">DEPARTMENT</text>
                <text x="110" y="0" fill="#94a3b8" fontSize="7.5" fontWeight="600">08:00</text>
                <text x="160" y="0" fill="#94a3b8" fontSize="7.5" fontWeight="600">12:00</text>
                <text x="210" y="0" fill="#94a3b8" fontSize="7.5" fontWeight="600">16:00</text>
                <text x="260" y="0" fill="#94a3b8" fontSize="7.5" fontWeight="600">20:00</text>
                <text x="310" y="0" fill="#94a3b8" fontSize="7.5" fontWeight="600">24:00</text>
              </g>

              {/* Grid Vertical Guidelines */}
              <line x1="126" y1="20" x2="126" y2="134" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="176" y1="20" x2="176" y2="134" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="226" y1="20" x2="226" y2="134" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="276" y1="20" x2="276" y2="134" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="326" y1="20" x2="326" y2="134" stroke="#f1f5f9" strokeDasharray="2 2" />

              {/* Row 1: Operations */}
              <g transform="translate(12, 28)">
                <rect x="0" y="0" width="86" height="26" rx="5" fill="#f8fafc" />
                <circle cx="10" cy="13" r="5" fill="#0077c2" fillOpacity="0.2" />
                <text x="10" y="15.5" textAnchor="middle" fill="#0077c2" fontSize="6.5" fontWeight="800">OP</text>
                <text x="20" y="16" fill="#1e293b" fontSize="8" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Production</text>
                
                {/* Shift Pill */}
                <rect x="94" y="2" width="118" height="22" rx="6" fill="url(#wfmBluePill)" />
                <text x="102" y="16" fill="#ffffff" fontSize="7.5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Shift A · Morning</text>
                <rect x="188" y="5" width="20" height="16" rx="3.5" fill="#ffffff" fillOpacity="0.25" />
                <text x="198" y="16" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="800">340</text>
              </g>

              {/* Row 2: Logistics */}
              <g transform="translate(12, 62)">
                <rect x="0" y="0" width="86" height="26" rx="5" fill="#f8fafc" />
                <circle cx="10" cy="13" r="5" fill="#0fb880" fillOpacity="0.2" />
                <text x="10" y="15.5" textAnchor="middle" fill="#0fb880" fontSize="6.5" fontWeight="800">LG</text>
                <text x="20" y="16" fill="#1e293b" fontSize="8" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Logistics Hub</text>

                {/* Shift Pill */}
                <rect x="144" y="2" width="116" height="22" rx="6" fill="url(#wfmEmeraldPill)" />
                <text x="152" y="16" fill="#ffffff" fontSize="7.5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Shift B · Evening</text>
                <rect x="236" y="5" width="20" height="16" rx="3.5" fill="#ffffff" fillOpacity="0.25" />
                <text x="246" y="16" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="800">140</text>
              </g>

              {/* Row 3: Engineering */}
              <g transform="translate(12, 96)">
                <rect x="0" y="0" width="86" height="26" rx="5" fill="#f8fafc" />
                <circle cx="10" cy="13" r="5" fill="#f8bb18" fillOpacity="0.25" />
                <text x="10" y="15.5" textAnchor="middle" fill="#b45309" fontSize="6.5" fontWeight="800">EN</text>
                <text x="20" y="16" fill="#1e293b" fontSize="8" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Engineering</text>

                {/* Shift Pill */}
                <rect x="112" y="2" width="122" height="22" rx="6" fill="url(#wfmGoldPill)" />
                <text x="120" y="16" fill="#ffffff" fontSize="7.5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">General · Regular</text>
                <rect x="210" y="5" width="20" height="16" rx="3.5" fill="#ffffff" fillOpacity="0.25" />
                <text x="220" y="16" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="800">95</text>
              </g>

              {/* Real-time Indicator Line (NOW) */}
              <line x1="192" y1="20" x2="192" y2="134" stroke="#f43f5e" strokeWidth="1.5" />
              <rect x="182" y="18" width="20" height="9" rx="3" fill="#f43f5e" />
              <text x="192" y="24.5" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">NOW</text>
            </g>

            {/* Bottom Compliance Bar */}
            <g transform="translate(62, 302)">
              <rect x="0" y="0" width="380" height="34" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="16" cy="17" r="7" fill="#0077c2" fillOpacity="0.15" />
              <path d="M16 13 L19.5 15 V17.5 C19.5 19.5 16 21 16 21 C16 21 12.5 19.5 12.5 17.5 V15 Z" fill="#0077c2" />
              <text x="28" y="16" fill="#0f172a" fontSize="8" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
                100+ STATUTORY LABOUR COMPLIANCES
              </text>
              <text x="28" y="26" fill="#64748b" fontSize="7" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">
                Factories Act, PF, ESIC, Overtime rules and Shift rotation automated
              </text>
            </g>
          </g>

          {/* 3. Foreground Element: Modern Mobile ESS Smartphone */}
          <g id="mobile-phone" filter="url(#wfmPhoneShadow)">
            {/* Outer Phone Bezel */}
            <rect x="415" y="85" width="175" height="345" rx="30" fill="url(#wfmPhoneChassis)" stroke="#475569" strokeWidth="2.5" />
            {/* Inner Phone Screen */}
            <rect x="424" y="94" width="157" height="327" rx="23" fill="#ffffff" />

            {/* Speaker Notch / Dynamic Island */}
            <rect x="474" y="101" width="57" height="10" rx="5" fill="#0f172a" />
            <circle cx="521" cy="106" r="2.5" fill="#1e293b" />

            {/* Mobile App Header */}
            <g transform="translate(434, 122)">
              <circle cx="12" cy="12" r="12" fill="#0077c2" />
              <text x="12" y="16" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800">AS</text>
              <text x="30" y="10" fill="#64748b" fontSize="7.5" fontWeight="600">Good Morning,</text>
              <text x="30" y="21" fill="#0f172a" fontSize="10.5" fontWeight="800">Arjun Sharma</text>
              <rect x="108" y="4" width="28" height="14" rx="4" fill="#ecfdf5" />
              <text x="122" y="14" textAnchor="middle" fill="#059669" fontSize="6.5" fontWeight="800">ON SHIFT</text>
            </g>

            {/* Geo-Fence Mobile Punch-In Card */}
            <g transform="translate(432, 158)">
              <rect x="0" y="0" width="141" height="135" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

              {/* Mini Radar Pulse Rings */}
              <circle cx="70" cy="46" r="32" fill="#ecfdf5" fillOpacity="0.6" />
              <circle cx="70" cy="46" r="22" fill="#d1fae5" fillOpacity="0.8" />
              <circle cx="70" cy="46" r="14" fill="#10b981" />
              {/* Map Pin Icon */}
              <path d="M70 39 C67.5 39 65.5 41 65.5 43.5 C65.5 47 70 51 70 51 C70 51 74.5 47 74.5 43.5 C74.5 41 72.5 39 70 39 Z" fill="#ffffff" />
              <circle cx="70" cy="43.5" r="1.5" fill="#10b981" />

              {/* Geo-Fence Pill */}
              <rect x="25" y="86" width="91" height="15" rx="4" fill="#dcfce7" />
              <circle cx="33" cy="93.5" r="2.5" fill="#16a34a" />
              <text x="73" y="97" textAnchor="middle" fill="#15803d" fontSize="7" fontWeight="800">INSIDE GEOFENCE</text>

              {/* Location Text */}
              <text x="70" y="112" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="600">Pune Plant Hub 1</text>

              {/* Big Punch Action Button */}
              <rect x="10" y="120" width="121" height="24" rx="7" fill="#0fb880" />
              <path d="M46 132 L49 135 L55 129" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="59" y="135.5" fill="#ffffff" fontSize="8.5" fontWeight="800">PUNCHED IN</text>
            </g>

            {/* Mobile Quick Tiles */}
            <g transform="translate(432, 312)">
              <g transform="translate(0, 0)">
                <rect x="0" y="0" width="67" height="42" rx="9" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                <text x="8" y="14" fill="#64748b" fontSize="7" fontWeight="700">LEAVE BAL.</text>
                <text x="8" y="32" fill="#0077c2" fontSize="14" fontWeight="900">14 Days</text>
              </g>
              <g transform="translate(74, 0)">
                <rect x="0" y="0" width="67" height="42" rx="9" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                <text x="8" y="14" fill="#64748b" fontSize="7" fontWeight="700">TODAY</text>
                <text x="8" y="32" fill="#059669" fontSize="13" fontWeight="900">Shift A</text>
              </g>
            </g>

            {/* Phone Bottom Home Bar */}
            <rect x="472" y="412" width="61" height="3" rx="1.5" fill="#94a3b8" />
          </g>

          {/* 4. Foreground Element: Smart Enterprise RFID / NFC ID Card */}
          <g id="nfc-smart-card" transform="translate(45, 360)" filter="url(#wfmDropShadow)">
            <rect x="0" y="0" width="180" height="92" rx="12" fill="url(#wfmBadgeGrad)" stroke="#cbd5e1" strokeWidth="1.2" />
            
            {/* Smart Chip */}
            <rect x="14" y="14" width="24" height="18" rx="3.5" fill="url(#wfmGoldChip)" stroke="#ca8a04" strokeWidth="0.8" />
            <line x1="22" y1="14" x2="22" y2="32" stroke="#ca8a04" strokeWidth="0.8" />
            <line x1="14" y1="23" x2="38" y2="23" stroke="#ca8a04" strokeWidth="0.8" />

            {/* Contactless RFID waves */}
            <path d="M46 18 Q 50 23 46 28 M 51 15 Q 57 23 51 31" stroke="#94a3b8" strokeWidth="1.4" fill="none" strokeLinecap="round" />

            {/* Card Branding */}
            <text x="166" y="24" textAnchor="end" fill="#0077c2" fontSize="9" fontWeight="900" fontFamily="Inter, system-ui, sans-serif">emSphere</text>
            <text x="166" y="33" textAnchor="end" fill="#64748b" fontSize="6.5" fontWeight="700">ENTERPRISE ID</text>

            {/* Card Holder Info */}
            <text x="14" y="56" fill="#0f172a" fontSize="10" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">ARJUN SHARMA</text>
            <text x="14" y="67" fill="#64748b" fontSize="7.5" fontWeight="600">ID: EMP-84920 · OPS LEAD</text>

            {/* Micro Barcode Simulation */}
            <g transform="translate(14, 73)" fill="#334155">
              <rect x="0" y="0" width="1.5" height="10" />
              <rect x="3" y="0" width="2.5" height="10" />
              <rect x="7" y="0" width="1" height="10" />
              <rect x="10" y="0" width="3" height="10" />
              <rect x="15" y="0" width="1" height="10" />
              <rect x="18" y="0" width="2" height="10" />
              <rect x="22" y="0" width="3.5" height="10" />
              <rect x="28" y="0" width="1" height="10" />
              <rect x="31" y="0" width="2" height="10" />
              <rect x="35" y="0" width="1.5" height="10" />
              <rect x="38" y="0" width="3" height="10" />
              <rect x="43" y="0" width="1.5" height="10" />
              <rect x="47" y="0" width="2.5" height="10" />
              <rect x="52" y="0" width="1" height="10" />
            </g>
            <text x="80" y="81" fill="#10b981" fontSize="7.5" fontWeight="800">● ACCESS VERIFIED</text>
          </g>
        </svg>

        {/* Floating Badge 1 (Top-Left): Multi-Shift Auto Rostering */}
        <div
          className="payroll-float absolute -left-5 top-[3%] sm:-left-9 sm:top-[3%] flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-white/90 bg-white/95 px-3 py-2 sm:px-4 sm:py-2.5 shadow-[0_14px_32px_-10px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:scale-105"
        >
          <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#0077c2] text-white shadow-sm">
            <ClockRosterIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </span>
          <div>
            <p className="text-xs sm:text-[14px] font-bold text-[#0f172a] leading-tight">
              Auto Shift Rostering
            </p>
            <p className="text-[10px] sm:text-[11.5px] font-medium text-[#64748b]">
              Zero Coverage Gaps
            </p>
          </div>
        </div>

        {/* Floating Badge 2 (Top-Right): Mobile Geo-Fenced Punch-In */}
        <div
          className="payroll-float absolute -right-2 -top-[2%] sm:-right-4 sm:-top-[2%] flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-white/90 bg-white/95 px-3 py-2 sm:px-4 sm:py-2.5 shadow-[0_14px_32px_-10px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:scale-105"
          style={{ animationDelay: "-2s" }}
        >
          <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#0fb880] text-white shadow-sm">
            <MapPinIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </span>
          <div>
            <p className="text-xs sm:text-[14px] font-bold text-[#0f172a] leading-tight">
              Mobile Geo-Fencing
            </p>
            <p className="text-[10px] sm:text-[11.5px] font-medium text-[#64748b]">
              GPS Punch-In · Android &amp; iOS
            </p>
          </div>
        </div>

        {/* Floating Badge 3 (Bottom-Right): Cloud & On-Premises Security */}
        <div
          className="payroll-float absolute right-2 bottom-[3%] sm:right-4 sm:bottom-[3%] flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-white/90 bg-white/95 px-3 py-2 sm:px-4 sm:py-2.5 shadow-[0_14px_32px_-10px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:scale-105"
          style={{ animationDelay: "-3.5s" }}
        >
          <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#f8bb18] text-white shadow-sm">
            <CloudShieldIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </span>
          <div>
            <p className="text-xs sm:text-[14px] font-bold text-[#0f172a] leading-tight">
              Cloud &amp; On-Premises
            </p>
            <p className="text-[10px] sm:text-[11.5px] font-medium text-[#64748b]">
              4-Tier Role-Based Security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
