const qrBlocks = [
  [313, 170], [323, 178], [313, 188], [331, 196], [299, 196],
  [343, 208], [323, 212], [313, 226], [345, 226], [355, 214],
];

const logRows = [62, 48, 70, 54, 40];

export default function VisitorDigitalSolutionsVector() {
  return (
    <svg
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Paper visitor register replaced by a digital check-in tablet with QR pass, verified entry and host notification"
      className="h-auto w-full"
    >
      <defs>
        <filter id="dsShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Backdrop */}
      <circle cx="318" cy="178" r="148" fill="#eaf4fb" />
      <circle cx="96" cy="120" r="64" fill="#fef6e0" />
      <ellipse cx="250" cy="318" rx="205" ry="12" fill="#e2e8f0" opacity="0.6" />

      {/* Paper register (before) */}
      <g>
        <rect x="40" y="120" width="110" height="150" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" filter="url(#dsShadow)" />
        <rect x="75" y="112" width="40" height="16" rx="4" fill="#94a3b8" />
        <rect x="54" y="142" width="56" height="6" rx="3" fill="#cbd5e1" />
        {logRows.map((w, i) => (
          <g key={i}>
            <rect x="54" y={162 + i * 20} width={w} height="5" rx="2.5" fill="#dbe2ea" />
            <rect x="54" y={172 + i * 20} width="82" height="1" fill="#e2e8f0" />
          </g>
        ))}
      </g>
      <text x="95" y="292" textAnchor="middle" fontSize="11" fontWeight="500" fill="#94a3b8">
        Paper register
      </text>

      {/* Transition arrow */}
      <path d="M164 195H224" stroke="#f8bb18" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8" />
      <path d="M216 186L227 195L216 204" stroke="#f8bb18" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* Tablet (after) */}
      <g filter="url(#dsShadow)">
        <rect x="240" y="58" width="170" height="240" rx="20" fill="#1e293b" />
      </g>
      <rect x="250" y="68" width="150" height="220" rx="12" fill="#ffffff" />
      <path d="M250 80a12 12 0 0 1 12-12h126a12 12 0 0 1 12 12v28H250z" fill="#0077c2" />
      <circle cx="264" cy="89" r="3" fill="#ffffff" opacity="0.85" />
      <text x="273" y="93" fontSize="11" fontWeight="600" fill="#ffffff">
        Visitor Check-in
      </text>

      {/* Visitor profile */}
      <circle cx="280" cy="131" r="14" fill="#e0f0fa" />
      <circle cx="280" cy="127" r="5" fill="#0077c2" />
      <path d="M271 141c2-6 16-6 18 0z" fill="#0077c2" />
      <rect x="302" y="122" width="72" height="6" rx="3" fill="#1e293b" opacity="0.85" />
      <rect x="302" y="134" width="48" height="5" rx="2.5" fill="#cbd5e1" />

      {/* QR pass */}
      <rect x="285" y="160" width="80" height="80" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
      {[[293, 168], [343, 168], [293, 218]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="14" height="14" rx="2" fill="#1e293b" />
          <rect x={x + 3} y={y + 3} width="8" height="8" rx="1" fill="#f8fafc" />
          <rect x={x + 5} y={y + 5} width="4" height="4" fill="#1e293b" />
        </g>
      ))}
      {qrBlocks.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" rx="1" fill="#0077c2" />
      ))}
      <rect x="287" y="199" width="76" height="2" rx="1" fill="#22c55e" opacity="0.85" />

      {/* Verified status */}
      <rect x="283" y="252" width="84" height="22" rx="11" fill="#dcfce7" />
      <path d="M294 263l3 3 6-6" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="309" y="267" fontSize="10.5" fontWeight="600" fill="#15803d">
        Verified
      </text>

      {/* Security badge */}
      <circle cx="410" cy="70" r="25" fill="#f8bb18" stroke="#ffffff" strokeWidth="4" filter="url(#dsShadow)" />
      <path d="M410 56l11 4v10c0 7-5 12-11 14-6-2-11-7-11-14V60z" fill="#ffffff" />
      <path d="M405 70l4 4 7-7" stroke="#f8bb18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Host notified chip */}
      <g filter="url(#dsShadow)">
        <rect x="168" y="238" width="112" height="34" rx="10" fill="#ffffff" />
      </g>
      <circle cx="186" cy="255" r="10" fill="#fef3c7" />
      <path
        d="M186 249a4 4 0 0 1 4 4v3l1.5 2h-11l1.5-2v-3a4 4 0 0 1 4-4zM184.5 260.5a1.5 1.5 0 0 0 3 0"
        stroke="#d97706"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="202" y="259" fontSize="10.5" fontWeight="600" fill="#1e293b">
        Host notified
      </text>
    </svg>
  );
}
