export function NationalEmblem({ className = 'h-12 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 130"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="National Emblem of India (Lion Capital of Ashoka)"
    >
      <title>National Emblem of India (Lion Capital of Ashoka)</title>
      {/* Ashoka Lion Capital Simplified Official Stylized Representation */}
      <g fill="#7A6021">
        {/* Central Crown / Lions */}
        <path d="M50 8C43 8 38 12 37 18C37 21 39 24 41 26C38 27 35 30 35 34C35 39 39 43 43 45C42 47 41 50 42 53C43 57 46 60 50 61C54 60 57 57 58 53C59 50 58 47 57 45C61 43 65 39 65 34C65 30 62 27 59 26C61 24 63 21 63 18C62 12 57 8 50 8Z" />
        {/* Left Lion Mane Profile */}
        <path d="M26 22C21 22 17 26 16 31C16 35 18 38 21 40C19 42 18 45 19 49C20 54 24 57 28 58C30 54 32 50 35 47C33 44 32 40 32 36C32 30 29 25 26 22Z" opacity="0.9" />
        {/* Right Lion Mane Profile */}
        <path d="M74 22C79 22 83 26 84 31C84 35 82 38 79 40C81 42 82 45 81 49C80 54 76 57 72 58C70 54 68 50 65 47C67 44 68 40 68 36C68 30 71 25 74 22Z" opacity="0.9" />
        {/* Abacus Base Platform */}
        <rect x="20" y="65" width="60" height="12" rx="2" />
        {/* Dharma Chakra (Wheel of Law) on Base */}
        <circle cx="50" cy="71" r="5" stroke="#FFFFFF" strokeWidth="1" fill="none" />
        <circle cx="50" cy="71" r="1.5" fill="#FFFFFF" />
        {/* Bull on left, Horse on right */}
        <ellipse cx="32" cy="71" rx="4" ry="2.5" fill="#FFFFFF" opacity="0.8" />
        <ellipse cx="68" cy="71" rx="4" ry="2.5" fill="#FFFFFF" opacity="0.8" />
        {/* Bell Lotus Base */}
        <path d="M24 77C26 84 34 88 50 88C66 88 74 84 76 77H24Z" />
        {/* Pedestal Base */}
        <rect x="18" y="90" width="64" height="6" rx="1" />
      </g>
      {/* Satyameva Jayate (सत्यमेव जयते) in Devanagari */}
      <text
        x="50"
        y="108"
        textAnchor="middle"
        fill="#7A6021"
        fontSize="9"
        fontWeight="bold"
        fontFamily="sans-serif"
        letterSpacing="0.5"
      >
        सत्यमेव जयते
      </text>
    </svg>
  );
}

export function AicteEmblem({ className = 'h-13 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="All India Council for Technical Education (AICTE) Official Diya Logo"
    >
      <title>All India Council for Technical Education (AICTE) Official Diya Logo</title>
      {/* Outer Golden/Yellow Gear Ring */}
      <circle cx="60" cy="60" r="56" stroke="#D4A017" strokeWidth="3" fill="#FFFFFF" />
      <circle cx="60" cy="60" r="52" stroke="#003366" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />

      {/* Blue Cogwheel / Gear Teeth around border */}
      <g stroke="#003366" strokeWidth="2.5">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="60"
            y1="4"
            x2="60"
            y2="9"
            transform={`rotate(${deg} 60 60)`}
          />
        ))}
      </g>

      {/* Traditional Indian Diya (Oil Lamp) Base - Dark Blue & Gold */}
      <g id="diya-base">
        {/* Lamp Stand / Pedestal */}
        <path d="M50 92L44 100H76L70 92H50Z" fill="#003366" />
        <rect x="42" y="100" width="36" height="3" rx="1.5" fill="#D4A017" />
        {/* Lamp Body (Curved Bowl) */}
        <path
          d="M26 78C26 89 41 94 60 94C79 94 94 89 94 78C94 73 80 73 60 73C40 73 26 73 26 78Z"
          fill="#003366"
        />
        {/* Gold Rim on Diya */}
        <path
          d="M26 77C33 80 46 82 60 82C74 82 87 80 94 77C87 75 74 74 60 74C46 74 33 75 26 77Z"
          fill="#D4A017"
        />
      </g>

      {/* Radiant Flame of Knowledge (Akhand Jyoti) - Vibrant Saffron & Gold */}
      <g id="jyoti-flame">
        {/* Outer Flame - Deep Saffron / Orange */}
        <path
          d="M60 20C60 20 78 40 78 57C78 68 70 76 60 76C50 76 42 68 42 57C42 40 60 20 60 20Z"
          fill="url(#aicteFlameOuter)"
        />
        {/* Inner Core Flame - Bright Golden Yellow */}
        <path
          d="M60 35C60 35 70 48 70 58C70 65 65 70 60 70C55 70 50 65 50 58C50 48 60 35 60 35Z"
          fill="url(#aicteFlameInner)"
        />
        {/* Central Pure White Spark */}
        <ellipse cx="60" cy="58" rx="4" ry="7" fill="#FFFFFF" opacity="0.9" />
      </g>

      {/* Motto Banner: योगः कर्मसु कौशलम् */}
      <g id="motto-ribbon">
        <path d="M22 104C34 102 86 102 98 104L94 112C84 110 36 110 26 112L22 104Z" fill="#003366" />
        <text
          x="60"
          y="109"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="5.5"
          fontWeight="bold"
          fontFamily="sans-serif"
          letterSpacing="0.2"
        >
          योगः कर्मसु कौशलम्
        </text>
      </g>

      {/* Linear Gradients */}
      <defs>
        <linearGradient id="aicteFlameOuter" x1="60" y1="20" x2="60" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4500" />
          <stop offset="0.6" stopColor="#FF8C00" />
          <stop offset="1" stopColor="#FFA500" />
        </linearGradient>
        <linearGradient id="aicteFlameInner" x1="60" y1="35" x2="60" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF000" />
          <stop offset="1" stopColor="#FFD700" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function DigitalIndiaBadge({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-200 rounded shadow-xs ${className}`}>
      <div className="flex flex-col text-left leading-none font-bold">
        <span className="text-[10px] text-[#003366] tracking-tight">Digital</span>
        <span className="text-[12px] text-[#FF8A00] tracking-wider -mt-0.5">India</span>
      </div>
      <div className="w-1.5 h-6 bg-gradient-to-b from-[#FF9933] via-white to-[#138808] rounded-full mx-0.5" />
      <span className="text-[8px] text-gray-500 font-medium leading-tight">Power To<br />Empower</span>
    </div>
  );
}
