function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 10.5l3.5 3.5 7.5-8" />
    </svg>
  );
}

export default function PayrollHeroVector() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] select-none py-4 sm:py-6 lg:max-w-none">
      {/* Ambient warm radial glow backdrop matching emSphere page theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_48%,rgba(248,187,24,0.24),rgba(0,119,194,0.14)_50%,transparent_72%)] blur-2xl"
      />

      {/* Main Vector Stage */}
      <div className="group relative">
        <svg
          viewBox="0 0 560 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.012]"
          aria-label="Clean professional vector illustration of emPay software with salary calendar roster, modern computation calculator, curled payslip statement, and gold payout coins"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="pedestalSlabGrad" x1="120" y1="360" x2="480" y2="460" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#f8fafc" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="tabletBezel" x1="140" y1="40" x2="380" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="brandBlueGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0077c2" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <linearGradient id="calcChassis" x1="290" y1="110" x2="480" y2="390" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e9eef5" />
            </linearGradient>

            <linearGradient id="calcLcd" x1="305" y1="140" x2="465" y2="195" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0a1526" />
              <stop offset="100%" stopColor="#172554" />
            </linearGradient>

            <linearGradient id="payBtnGrad" x1="310" y1="325" x2="465" y2="375" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0077c2" />
              <stop offset="55%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <linearGradient id="payslipGrad" x1="100" y1="160" x2="280" y2="430" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="85%" stopColor="#fafafa" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>

            <linearGradient id="plusBadgeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            <linearGradient id="coinGoldTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            <linearGradient id="coinGoldSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            <linearGradient id="payoutArrowGrad" x1="310" y1="415" x2="430" y2="455" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0077c2" />
              <stop offset="70%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>

            <linearGradient id="netBadgeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f8bb18" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>

          {/* 1. Base Isometric Pedestal */}
          <g id="base-pedestal">
            {/* Ambient ground shadow */}
            <ellipse cx="285" cy="428" rx="210" ry="38" fill="#000000" fillOpacity="0.06" />
            <ellipse cx="285" cy="424" rx="180" ry="30" fill="#0077c2" fillOpacity="0.05" />

            {/* Pedestal Top Surface */}
            <path
              d="M100 398 C180 360, 400 360, 480 398 C508 412, 508 430, 480 444 C400 478, 180 478, 100 444 C72 430, 72 412, 100 398 Z"
              fill="url(#pedestalSlabGrad)"
              stroke="#cbd5e1"
              strokeWidth="1.2"
            />
            {/* Pedestal Edge Depth */}
            <path
              d="M100 444 C180 478, 400 478, 480 444 L480 452 C400 486, 180 486, 100 452 Z"
              fill="#94a3b8"
              fillOpacity="0.32"
            />
          </g>

          {/* 2. Tablet / Roster Screen (Background Device) */}
          <g id="tablet-salary">
            {/* Bezel */}
            <rect
              x="135"
              y="48"
              width="250"
              height="335"
              rx="20"
              fill="url(#tabletBezel)"
              stroke="#334155"
              strokeWidth="2"
            />
            {/* Screen Glass */}
            <rect
              x="146"
              y="59"
              width="228"
              height="313"
              rx="14"
              fill="#f8fafc"
            />

            {/* Header Bar */}
            <rect x="146" y="59" width="228" height="42" rx="14" fill="url(#brandBlueGrad)" />
            <rect x="146" y="86" width="228" height="15" fill="#0077c2" />

            {/* Title: SALARY */}
            <text
              x="260"
              y="87"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="16"
              fontWeight="900"
              letterSpacing="0.1em"
              fontFamily="Inter, system-ui, sans-serif"
            >
              SALARY
            </text>

            {/* Modern Calendar Grid (Attendance Roster - Clean & Minimal) */}
            <g transform="translate(158, 114)">
              {/* Calendar Frame */}
              <rect x="0" y="0" width="204" height="156" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />

              {/* Month bar */}
              <rect x="0" y="0" width="204" height="26" rx="10" fill="#f1f5f9" />
              <rect x="0" y="16" width="204" height="10" fill="#f1f5f9" />
              <text x="14" y="18" fill="#475569" fontSize="9" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                OCTOBER 2026
              </text>
              <rect x="154" y="6" width="40" height="14" rx="7" fill="#10b981" fillOpacity="0.18" />
              <circle cx="162" cy="13" r="2.5" fill="#10b981" />
              <text x="168" y="16.5" fill="#047857" fontSize="7.5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                SYNCED
              </text>

              {/* Clean 4-Week Attendance Matrix */}
              {/* Row 1 */}
              <rect x="12" y="34" width="28" height="22" rx="4" fill="#eff6ff" />
              <text x="26" y="48" textAnchor="middle" fill="#0077c2" fontSize="9" fontWeight="700">W1</text>
              <rect x="46" y="34" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="58" cy="45" r="3" fill="#10b981" />
              <rect x="74" y="34" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="86" cy="45" r="3" fill="#10b981" />
              <rect x="102" y="34" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="114" cy="45" r="3" fill="#10b981" />
              <rect x="130" y="34" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="142" cy="45" r="3" fill="#10b981" />
              <rect x="158" y="34" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="170" cy="45" r="3" fill="#10b981" />

              {/* Row 2 */}
              <rect x="12" y="62" width="28" height="22" rx="4" fill="#eff6ff" />
              <text x="26" y="76" textAnchor="middle" fill="#0077c2" fontSize="9" fontWeight="700">W2</text>
              <rect x="46" y="62" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="58" cy="73" r="3" fill="#10b981" />
              <rect x="74" y="62" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="86" cy="73" r="3" fill="#10b981" />
              <rect x="102" y="62" width="24" height="22" rx="4" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="0.8" />
              {/* Highlight cross for leave/half-day matching reference */}
              <text x="114" y="76" textAnchor="middle" fill="#ec4899" fontSize="10" fontWeight="900">×</text>
              <rect x="130" y="62" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="142" cy="73" r="3" fill="#10b981" />
              <rect x="158" y="62" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="170" cy="73" r="3" fill="#10b981" />

              {/* Row 3 */}
              <rect x="12" y="90" width="28" height="22" rx="4" fill="#eff6ff" />
              <text x="26" y="104" textAnchor="middle" fill="#0077c2" fontSize="9" fontWeight="700">W3</text>
              <rect x="46" y="90" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="58" cy="101" r="3" fill="#10b981" />
              <rect x="74" y="90" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="86" cy="101" r="3" fill="#10b981" />
              <rect x="102" y="90" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="114" cy="101" r="3" fill="#10b981" />
              <rect x="130" y="90" width="24" height="22" rx="4" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="0.8" />
              <text x="142" y="104" textAnchor="middle" fill="#ec4899" fontSize="10" fontWeight="900">×</text>
              <rect x="158" y="90" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="170" cy="101" r="3" fill="#10b981" />

              {/* Row 4 */}
              <rect x="12" y="118" width="28" height="22" rx="4" fill="#eff6ff" />
              <text x="26" y="132" textAnchor="middle" fill="#0077c2" fontSize="9" fontWeight="700">W4</text>
              <rect x="46" y="118" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="58" cy="129" r="3" fill="#10b981" />
              <rect x="74" y="118" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="86" cy="129" r="3" fill="#10b981" />
              <rect x="102" y="118" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="114" cy="129" r="3" fill="#10b981" />
              <rect x="130" y="118" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="142" cy="129" r="3" fill="#10b981" />
              <rect x="158" y="118" width="24" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="170" cy="129" r="3" fill="#10b981" />
            </g>

            {/* Attendance verification pill */}
            <rect x="158" y="280" width="204" height="24" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="172" cy="292" r="3.5" fill="#10b981" />
            <text x="182" y="295" fill="#334155" fontSize="8.5" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
              Biometric Attendance Synced (100%)
            </text>
          </g>

          {/* 3. Floating Minus Pill (Matching reference composition) */}
          <g transform="translate(108, 92)">
            <ellipse cx="20" cy="20" rx="19" ry="18" fill="#d946ef" />
            <ellipse cx="20" cy="18" rx="19" ry="18" fill="#e879f9" />
            <rect x="12" y="16" width="16" height="4" rx="2" fill="#ffffff" />
          </g>

          {/* 4. Sleek Digital Calculator (Right Foreground) */}
          <g id="payroll-calculator">
            {/* Calculator Chassis */}
            <rect
              x="290"
              y="110"
              width="180"
              height="268"
              rx="20"
              fill="url(#calcChassis)"
              stroke="#cbd5e1"
              strokeWidth="1.4"
            />

            {/* Solar panel / sensor strip */}
            <rect x="360" y="122" width="40" height="5" rx="2.5" fill="#94a3b8" />

            {/* Inset LCD Display */}
            <rect
              x="305"
              y="136"
              width="150"
              height="50"
              rx="10"
              fill="url(#calcLcd)"
              stroke="#0077c2"
              strokeWidth="1.2"
            />
            <text x="316" y="152" fill="#93c5fd" fontSize="7.5" fontWeight="700" letterSpacing="0.06em" fontFamily="Inter, system-ui, sans-serif">
              NET DISBURSABLE
            </text>
            <text x="316" y="176" fill="#38bdf8" fontSize="18" fontWeight="800" letterSpacing="-0.02em" fontFamily="Inter, system-ui, sans-serif">
              ₹ 84,520
            </text>

            {/* Statutory Indicator Keys (Row 1) */}
            <rect x="307" y="196" width="31" height="22" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <text x="316" y="211" fill="#0077c2" fontSize="9" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">PF</text>

            <rect x="345" y="196" width="31" height="22" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <text x="353" y="211" fill="#0077c2" fontSize="9" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">ESI</text>

            <rect x="383" y="196" width="31" height="22" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <text x="392" y="211" fill="#0077c2" fontSize="9" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">PT</text>

            <rect x="421" y="196" width="34" height="22" rx="6" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1" />
            <text x="428" y="211" fill="#b45309" fontSize="9" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">TDS</text>

            {/* Sleek Pastel Keypad Rows (Clean and Minimal) */}
            {/* Row 2 */}
            <rect x="307" y="226" width="31" height="20" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="345" y="226" width="31" height="20" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="383" y="226" width="31" height="20" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="421" y="226" width="34" height="20" rx="5" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="0.8" />
            <text x="434" y="240" fill="#0077c2" fontSize="11" fontWeight="800">÷</text>

            {/* Row 3 */}
            <rect x="307" y="252" width="31" height="20" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="345" y="252" width="31" height="20" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="383" y="252" width="31" height="20" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="421" y="252" width="34" height="20" rx="5" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="0.8" />
            <text x="434" y="266" fill="#0077c2" fontSize="11" fontWeight="800">×</text>

            {/* Row 4 */}
            <rect x="307" y="278" width="31" height="20" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="345" y="278" width="31" height="20" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="383" y="278" width="31" height="20" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="421" y="278" width="34" height="20" rx="5" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="0.8" />
            <text x="435" y="292" fill="#0077c2" fontSize="12" fontWeight="800">-</text>

            {/* Prominent PAY Action Button */}
            <rect
              x="307"
              y="310"
              width="148"
              height="48"
              rx="12"
              fill="url(#payBtnGrad)"
              stroke="#67e8f9"
              strokeWidth="1.2"
            />
            {/* Button Gloss Highlight */}
            <path
              d="M312 318 C312 314, 318 312, 324 312 L438 312 C444 312, 450 314, 450 318 L450 322 L312 322 Z"
              fill="#ffffff"
              fillOpacity="0.25"
            />
            {/* Golden bolt icon + PAY */}
            <g transform="translate(355, 325)">
              <polygon points="7 0 2 8 7 8 6 14 12 5 7 5 7 0" fill="#f8bb18" />
              <text x="17" y="14" fill="#ffffff" fontSize="16" fontWeight="900" letterSpacing="0.08em" fontFamily="Inter, system-ui, sans-serif">
                PAY
              </text>
            </g>
          </g>

          {/* 5. Curled Salary Payslip Statement (Left Foreground) */}
          <g id="curled-payslip">
            {/* Paper body with authentic bottom curl */}
            <path
              d="M95 180 C95 170, 103 162, 113 162 L275 162 C285 162, 293 170, 293 180 L293 400 C278 414, 258 406, 230 416 C195 430, 165 420, 130 432 C115 437, 95 430, 95 418 Z"
              fill="url(#payslipGrad)"
              stroke="#cbd5e1"
              strokeWidth="1.2"
            />

            {/* Glowing Plus Badge on Top-Left */}
            <g transform="translate(74, 150)">
              <ellipse cx="23" cy="23" rx="21" ry="21" fill="url(#plusBadgeGrad)" stroke="#ffffff" strokeWidth="2.5" />
              <rect x="20.5" y="13" width="5" height="20" rx="2" fill="#ffffff" />
              <rect x="13" y="20.5" width="20" height="5" rx="2" fill="#ffffff" />
            </g>

            {/* Payslip Header */}
            <text x="132" y="185" fill="#0f172a" fontSize="11" fontWeight="800" letterSpacing="0.04em" fontFamily="Inter, system-ui, sans-serif">
              PAYSLIP STATEMENT
            </text>
            <text x="132" y="196" fill="#64748b" fontSize="7.5" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
              Verified Statutory Computation
            </text>

            {/* Divider line */}
            <line x1="110" y1="206" x2="278" y2="206" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />

            {/* Clean Minimal Statement Table */}
            <g transform="translate(108, 214)">
              {/* Row 1: Earnings */}
              <rect x="0" y="0" width="168" height="24" rx="4" fill="#eff6ff" />
              <circle cx="12" cy="12" r="5" fill="#0077c2" fillOpacity="0.15" />
              <text x="9.5" y="15" fill="#0077c2" fontSize="9" fontWeight="800">+</text>
              <text x="24" y="15" fill="#0f172a" fontSize="8.5" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Basic & Allowances</text>
              <text x="160" y="15" textAnchor="end" fill="#0077c2" fontSize="9" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">₹ 96,000</text>

              {/* Row 2: Deductions */}
              <rect x="0" y="28" width="168" height="24" rx="4" fill="#fef2f2" />
              <circle cx="12" cy="40" r="5" fill="#ef4444" fillOpacity="0.15" />
              <text x="10" y="42.5" fill="#dc2626" fontSize="10" fontWeight="900">-</text>
              <text x="24" y="43" fill="#0f172a" fontSize="8.5" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Statutory Deductions</text>
              <text x="160" y="43" textAnchor="end" fill="#dc2626" fontSize="9" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">-₹ 11,480</text>

              {/* Row 3: Net Take Home Banner */}
              <rect x="0" y="58" width="168" height="34" rx="6" fill="url(#netBadgeGrad)" stroke="#f59e0b" strokeWidth="1" />
              <text x="12" y="73" fill="#78350f" fontSize="8" fontWeight="800" letterSpacing="0.04em" fontFamily="Inter, system-ui, sans-serif">
                TOTAL NET SALARY
              </text>
              <text x="12" y="86" fill="#0f172a" fontSize="12.5" fontWeight="900" fontFamily="Inter, system-ui, sans-serif">
                ₹ 84,520
              </text>
              {/* Verified pill inside */}
              <rect x="110" y="65" width="50" height="18" rx="9" fill="#ffffff" />
              <circle cx="118" cy="74" r="3.5" fill="#10b981" />
              <text x="124" y="76.5" fill="#047857" fontSize="7" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
                PAID
              </text>
            </g>
          </g>

          {/* 6. 3D Gold Coin Stack & Disbursal Arrow */}
          <g id="coin-payout">
            {/* Outgoing Payout Direction Arrow */}
            <path
              d="M315 422 L380 422 L380 410 L418 434 L380 458 L380 446 L315 446 Z"
              fill="url(#payoutArrowGrad)"
              stroke="#93c5fd"
              strokeWidth="1.2"
            />

            {/* Coin 1 (Bottom) */}
            <g transform="translate(328, 396)">
              <ellipse cx="28" cy="13" rx="26" ry="8" fill="url(#coinGoldSide)" />
              <rect x="2" y="7" width="52" height="6" fill="url(#coinGoldSide)" />
              <ellipse cx="28" cy="7" rx="26" ry="8" fill="url(#coinGoldTop)" stroke="#fef08a" strokeWidth="0.8" />
            </g>

            {/* Coin 2 */}
            <g transform="translate(328, 388)">
              <ellipse cx="28" cy="13" rx="26" ry="8" fill="url(#coinGoldSide)" />
              <rect x="2" y="7" width="52" height="6" fill="url(#coinGoldSide)" />
              <ellipse cx="28" cy="7" rx="26" ry="8" fill="url(#coinGoldTop)" stroke="#fef08a" strokeWidth="0.8" />
            </g>

            {/* Coin 3 */}
            <g transform="translate(328, 380)">
              <ellipse cx="28" cy="13" rx="26" ry="8" fill="url(#coinGoldSide)" />
              <rect x="2" y="7" width="52" height="6" fill="url(#coinGoldSide)" />
              <ellipse cx="28" cy="7" rx="26" ry="8" fill="url(#coinGoldTop)" stroke="#fef08a" strokeWidth="0.8" />
            </g>

            {/* Coin 4 (Top Coin with embossed Indian Rupee Symbol) */}
            <g transform="translate(328, 372)">
              <ellipse cx="28" cy="13" rx="26" ry="8" fill="url(#coinGoldSide)" />
              <rect x="2" y="7" width="52" height="6" fill="url(#coinGoldSide)" />
              <ellipse cx="28" cy="7" rx="26" ry="8" fill="url(#coinGoldTop)" stroke="#fef08a" strokeWidth="1" />
              <text x="24" y="11" fill="#b45309" fontSize="10.5" fontWeight="900" fontFamily="Inter, system-ui, sans-serif">
                ₹
              </text>
            </g>
          </g>
        </svg>

        {/* Floating Badge 1 (Top-Left): 100% accurate emPay */}
        <div
          className="payroll-float absolute -left-2 top-[12%] sm:-left-4 sm:top-[12%] flex items-center gap-2 sm:gap-2.5 rounded-xl border border-white/80 bg-white/95 px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:scale-105"
        >
          <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-[#d1f4e3] text-[#0b8f63] shadow-sm">
            <CheckIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
          <span className="text-xs sm:text-[13.5px] font-semibold text-[#1f1f1f] whitespace-nowrap">
            100% accurate emPay
          </span>
        </div>

        {/* Floating Badge 2 (Bottom-Right): PF · ESI · PT · TDS ready */}
        <div
          className="payroll-float absolute -right-1 bottom-[11%] sm:-right-4 sm:bottom-[12%] flex items-center gap-2 sm:gap-2.5 rounded-xl border border-white/80 bg-white/95 px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:scale-105"
          style={{ animationDelay: "-3s" }}
        >
          <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-[#fee6b1] text-[#b07d00] shadow-sm">
            <CheckIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
          <span className="text-xs sm:text-[13.5px] font-semibold text-[#1f1f1f] whitespace-nowrap">
            PF · ESI · PT · TDS ready
          </span>
        </div>
      </div>
    </div>
  );
}
