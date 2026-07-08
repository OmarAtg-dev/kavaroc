export function ProductMainSVG({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="عازل للباب"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#dcfce7" />
        </linearGradient>
        <linearGradient id="sealGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="sealShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="8" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.25" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="400" height="400" fill="url(#bgGrad)" rx="32" />

      <circle cx="200" cy="200" r="140" fill="#fff" opacity="0.6" />
      <circle cx="200" cy="200" r="100" fill="#fff" opacity="0.4" />

      <g filter="url(#softShadow)">
        <rect
          x="50"
          y="195"
          width="300"
          height="38"
          rx="19"
          fill="url(#sealGrad)"
        />
        <rect
          x="50"
          y="195"
          width="300"
          height="38"
          rx="19"
          fill="url(#sealShine)"
        />
        <rect x="55" y="200" width="290" height="6" rx="3" fill="#fff" opacity="0.08" />

        <ellipse cx="80" cy="214" rx="6" ry="11" fill="#0f172a" />
        <ellipse cx="120" cy="214" rx="6" ry="11" fill="#0f172a" />
        <ellipse cx="160" cy="214" rx="6" ry="11" fill="#0f172a" />
        <ellipse cx="200" cy="214" rx="6" ry="11" fill="#0f172a" />
        <ellipse cx="240" cy="214" rx="6" ry="11" fill="#0f172a" />
        <ellipse cx="280" cy="214" rx="6" ry="11" fill="#0f172a" />
        <ellipse cx="320" cy="214" rx="6" ry="11" fill="#0f172a" />

        <rect
          x="50"
          y="222"
          width="300"
          height="11"
          rx="3"
          fill="#0f172a"
        />
        <rect
          x="50"
          y="222"
          width="300"
          height="3"
          fill="#22c55e"
          opacity="0.8"
        />
      </g>

      <g opacity="0.9">
        <circle cx="100" cy="120" r="4" fill="#22c55e" />
        <circle cx="320" cy="100" r="5" fill="#22c55e" />
        <circle cx="340" cy="280" r="3" fill="#16a34a" />
        <circle cx="60" cy="300" r="4" fill="#16a34a" />
      </g>
    </svg>
  );
}

export function DoorWithSealSVG({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="باب مركب عليه العازل"
    >
      <defs>
        <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="doorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a16207" />
          <stop offset="50%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>
      </defs>

      <rect width="400" height="400" fill="#f8fafc" />
      <rect y="320" width="400" height="80" fill="url(#floorGrad)" />
      <line x1="0" y1="320" x2="400" y2="320" stroke="#94a3b8" strokeWidth="2" />

      <rect x="120" y="40" width="160" height="280" rx="4" fill="url(#doorGrad)" />
      <rect x="120" y="40" width="160" height="280" rx="4" fill="none" stroke="#713f12" strokeWidth="2" />
      <rect x="135" y="55" width="130" height="120" rx="3" fill="#fef3c7" opacity="0.5" />
      <rect x="135" y="190" width="130" height="120" rx="3" fill="#fef3c7" opacity="0.5" />
      <line x1="200" y1="40" x2="200" y2="320" stroke="#713f12" strokeWidth="1" opacity="0.3" />

      <circle cx="245" cy="190" r="5" fill="#fbbf24" />
      <circle cx="245" cy="190" r="3" fill="#92400e" />

      <rect x="118" y="313" width="164" height="10" rx="3" fill="#0f172a" />
      <rect x="118" y="313" width="164" height="3" fill="#22c55e" />
      <ellipse cx="155" cy="318" rx="5" ry="7" fill="#1e293b" />
      <ellipse cx="200" cy="318" rx="5" ry="7" fill="#1e293b" />
      <ellipse cx="245" cy="318" rx="5" ry="7" fill="#1e293b" />

      <path
        d="M 0 100 Q 50 110 100 100 Q 150 90 200 100"
        stroke="#cbd5e1"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M 0 60 Q 50 70 100 60 Q 150 50 200 60"
        stroke="#cbd5e1"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

export function DustProblemSVG({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="الغبار كيدخل"
    >
      <defs>
        <linearGradient id="dustSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fed7aa" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="20" fill="url(#dustSky)" />

      <rect x="60" y="20" width="80" height="140" fill="#a16207" rx="4" />
      <rect x="60" y="20" width="80" height="140" fill="none" stroke="#713f12" strokeWidth="2" rx="4" />
      <circle cx="125" cy="95" r="4" fill="#fbbf24" />

      <rect y="155" width="200" height="10" fill="#94a3b8" />

      <g opacity="0.85">
        <circle cx="40" cy="155" r="2" fill="#78350f" />
        <circle cx="55" cy="160" r="3" fill="#78350f" />
        <circle cx="70" cy="158" r="2" fill="#78350f" />
        <circle cx="85" cy="162" r="2.5" fill="#78350f" />
        <circle cx="100" cy="155" r="3" fill="#78350f" />
        <circle cx="115" cy="159" r="2" fill="#78350f" />
        <circle cx="130" cy="156" r="2.5" fill="#78350f" />
        <circle cx="145" cy="161" r="2" fill="#78350f" />
        <circle cx="160" cy="157" r="3" fill="#78350f" />
      </g>

      <g opacity="0.7">
        <circle cx="30" cy="120" r="1.5" fill="#92400e" />
        <circle cx="170" cy="125" r="1.5" fill="#92400e" />
        <circle cx="20" cy="140" r="1.5" fill="#92400e" />
        <circle cx="180" cy="135" r="1.5" fill="#92400e" />
      </g>
    </svg>
  );
}

export function InsectProblemSVG({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="الحشرات كتدخل"
    >
      <defs>
        <linearGradient id="insectBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fee2e2" />
          <stop offset="100%" stopColor="#fecaca" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="20" fill="url(#insectBg)" />

      <rect x="60" y="20" width="80" height="140" fill="#7c2d12" rx="4" />
      <rect x="60" y="20" width="80" height="140" fill="none" stroke="#451a03" strokeWidth="2" rx="4" />
      <circle cx="125" cy="95" r="4" fill="#fbbf24" />

      <rect y="155" width="200" height="10" fill="#94a3b8" />

      <g>
        <ellipse cx="50" cy="155" rx="4" ry="2.5" fill="#1e293b" />
        <line x1="46" y1="153" x2="44" y2="150" stroke="#1e293b" strokeWidth="1" />
        <line x1="54" y1="153" x2="56" y2="150" stroke="#1e293b" strokeWidth="1" />
      </g>
      <g>
        <ellipse cx="80" cy="158" rx="5" ry="3" fill="#1e293b" />
        <line x1="75" y1="156" x2="72" y2="153" stroke="#1e293b" strokeWidth="1.2" />
        <line x1="85" y1="156" x2="88" y2="153" stroke="#1e293b" strokeWidth="1.2" />
      </g>
      <g>
        <ellipse cx="120" cy="155" rx="3" ry="2" fill="#1e293b" />
        <line x1="117" y1="153" x2="115" y2="151" stroke="#1e293b" strokeWidth="0.8" />
        <line x1="123" y1="153" x2="125" y2="151" stroke="#1e293b" strokeWidth="0.8" />
      </g>
      <g>
        <ellipse cx="155" cy="160" rx="4" ry="2.5" fill="#1e293b" />
        <line x1="151" y1="158" x2="148" y2="155" stroke="#1e293b" strokeWidth="1" />
        <line x1="159" y1="158" x2="162" y2="155" stroke="#1e293b" strokeWidth="1" />
      </g>
    </svg>
  );
}

export function AirLeakProblemSVG({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="الهواء البارد كيخرج"
    >
      <defs>
        <linearGradient id="airBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#bfdbfe" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="20" fill="url(#airBg)" />

      <rect x="60" y="20" width="80" height="140" fill="#1e3a8a" rx="4" />
      <rect x="60" y="20" width="80" height="140" fill="none" stroke="#1e40af" strokeWidth="2" rx="4" />
      <circle cx="125" cy="95" r="4" fill="#fbbf24" />

      <rect y="155" width="200" height="10" fill="#94a3b8" />

      <g opacity="0.7">
        <path d="M 100 145 Q 105 140 100 135 Q 95 130 100 125" stroke="#3b82f6" strokeWidth="2" fill="none" />
        <path d="M 110 145 Q 115 140 110 135 Q 105 130 110 125" stroke="#3b82f6" strokeWidth="2" fill="none" />
        <path d="M 90 145 Q 95 140 90 135 Q 85 130 90 125" stroke="#3b82f6" strokeWidth="2" fill="none" />
      </g>

      <g opacity="0.5">
        <text x="40" y="100" fontSize="22" fill="#1e40af">❄️</text>
        <text x="155" y="105" fontSize="18" fill="#1e40af">❄</text>
        <text x="30" y="135" fontSize="16" fill="#1e40af">❄</text>
        <text x="165" y="135" fontSize="20" fill="#1e40af">❄️</text>
      </g>
    </svg>
  );
}

export function BeforeAfterSVG({ variant, className = "" }) {
  const isAfter = variant === "after";
  return (
    <svg
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={isAfter ? "بعد التركيب" : "قبل التركيب"}
    >
      <defs>
        <linearGradient id={`floor-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id={`bg-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isAfter ? "#dcfce7" : "#fef3c7"} />
          <stop offset="100%" stopColor={isAfter ? "#bbf7d0" : "#fde68a"} />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#bg-${variant})`} />
      <rect y="220" width="400" height="80" fill={`url(#floor-${variant})`} />

      <rect x="130" y="30" width="140" height="200" rx="3" fill="#a16207" />
      <rect x="130" y="30" width="140" height="200" rx="3" fill="none" stroke="#713f12" strokeWidth="2" />
      <rect x="140" y="40" width="55" height="80" rx="2" fill="#fef3c7" opacity="0.6" />
      <rect x="205" y="40" width="55" height="80" rx="2" fill="#fef3c7" opacity="0.6" />
      <rect x="140" y="130" width="55" height="80" rx="2" fill="#fef3c7" opacity="0.6" />
      <rect x="205" y="130" width="55" height="80" rx="2" fill="#fef3c7" opacity="0.6" />
      <circle cx="245" cy="135" r="4" fill="#fbbf24" />

      {isAfter ? (
        <>
          <rect x="128" y="225" width="144" height="9" rx="3" fill="#0f172a" />
          <rect x="128" y="225" width="144" height="2.5" fill="#22c55e" />
          <ellipse cx="160" cy="230" rx="4" ry="6" fill="#1e293b" />
          <ellipse cx="200" cy="230" rx="4" ry="6" fill="#1e293b" />
          <ellipse cx="240" cy="230" rx="4" ry="6" fill="#1e293b" />
        </>
      ) : (
        <rect x="128" y="228" width="144" height="3" fill="#94a3b8" />
      )}

      {!isAfter && (
        <g opacity="0.85">
          <circle cx="100" cy="232" r="2" fill="#78350f" />
          <circle cx="160" cy="235" r="2.5" fill="#78350f" />
          <circle cx="200" cy="232" r="2" fill="#78350f" />
          <circle cx="250" cy="236" r="2" fill="#78350f" />
          <circle cx="300" cy="233" r="2.5" fill="#78350f" />
          <circle cx="340" cy="234" r="2" fill="#78350f" />
        </g>
      )}

      {!isAfter && (
        <g opacity="0.7">
          <ellipse cx="120" cy="235" rx="3" ry="2" fill="#1e293b" />
          <ellipse cx="220" cy="237" rx="3" ry="2" fill="#1e293b" />
          <ellipse cx="320" cy="236" rx="3" ry="2" fill="#1e293b" />
        </g>
      )}

      {isAfter && (
        <g opacity="0.6">
          <path d="M 60 60 Q 65 55 60 50" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
          <text x="40" y="80" fontSize="14" fill="#1e40af">❄</text>
          <text x="350" y="70" fontSize="14" fill="#1e40af">❄</text>
        </g>
      )}

      <rect
        x="0"
        y="0"
        width="400"
        height="300"
        fill="none"
        stroke={isAfter ? "#22c55e" : "#f59e0b"}
        strokeWidth="6"
        rx="6"
      />
    </svg>
  );
}

export function StepSVG({ step, className = "" }) {
  const illustrations = {
    1: (
      <g>
        <rect x="50" y="20" width="100" height="140" fill="#a16207" rx="3" />
        <rect x="50" y="20" width="100" height="140" fill="none" stroke="#713f12" strokeWidth="2" rx="3" />
        <circle cx="130" cy="90" r="4" fill="#fbbf24" />
        <rect y="160" width="200" height="10" fill="#94a3b8" />
        <rect x="48" y="155" width="104" height="6" rx="2" fill="#0f172a" />
      </g>
    ),
    2: (
      <g>
        <rect x="50" y="20" width="100" height="140" fill="#a16207" rx="3" />
        <rect x="50" y="20" width="100" height="140" fill="none" stroke="#713f12" strokeWidth="2" rx="3" />
        <circle cx="130" cy="90" r="4" fill="#fbbf24" />
        <rect y="160" width="200" height="10" fill="#94a3b8" />
        <g>
          <rect x="100" y="40" width="20" height="100" fill="#22c55e" rx="2" />
          <rect x="95" y="35" width="30" height="15" fill="#16a34a" rx="2" />
          <line x1="110" y1="50" x2="110" y2="135" stroke="#fff" strokeWidth="2" strokeDasharray="3 3" />
        </g>
      </g>
    ),
    3: (
      <g>
        <rect x="50" y="20" width="100" height="140" fill="#a16207" rx="3" />
        <rect x="50" y="20" width="100" height="140" fill="none" stroke="#713f12" strokeWidth="2" rx="3" />
        <circle cx="130" cy="90" r="4" fill="#fbbf24" />
        <rect y="160" width="200" height="10" fill="#94a3b8" />
        <rect x="48" y="155" width="104" height="9" rx="3" fill="#0f172a" />
        <ellipse cx="70" cy="160" rx="4" ry="6" fill="#1e293b" />
        <ellipse cx="100" cy="160" rx="4" ry="6" fill="#1e293b" />
        <ellipse cx="130" cy="160" rx="4" ry="6" fill="#1e293b" />
        <text x="155" y="50" fontSize="32" fill="#22c55e" fontWeight="bold">✓</text>
      </g>
    ),
  };

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`خطوة ${step}`}
    >
      <rect width="200" height="200" rx="20" fill="#f8fafc" />
      {illustrations[step]}
    </svg>
  );
}

export function AvatarSVG({ initial, color = "#22c55e", className = "" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="صورة عميل"
    >
      <circle cx="32" cy="32" r="32" fill={color} />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontSize="26"
        fontWeight="bold"
        fill="white"
        fontFamily="Cairo, sans-serif"
      >
        {initial}
      </text>
    </svg>
  );
}

export function VideoPlaceholderSVG({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="فيديو ترويجي"
    >
      <defs>
        <linearGradient id="vidBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" rx="20" fill="url(#vidBg)" />

      <rect x="0" y="220" width="400" height="80" fill="#1e293b" opacity="0.4" />
      <rect x="0" y="0" width="400" height="100" fill="#0f172a" opacity="0.4" />

      <circle cx="200" cy="150" r="50" fill="white" opacity="0.95" />
      <polygon points="188,128 188,172 224,150" fill="#22c55e" />

      <g opacity="0.7">
        <rect x="100" y="40" width="200" height="6" rx="3" fill="#fff" opacity="0.2" />
        <rect x="100" y="55" width="150" height="4" rx="2" fill="#fff" opacity="0.15" />
      </g>
    </svg>
  );
}
