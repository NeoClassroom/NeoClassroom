import type { SVGprops } from "./Icon.type";

export const NeoClassroomLogo = ({
  color,
  size = 24,
  height = size,
  width = size,
  ...props
}: SVGprops) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="NeoClassroom"
    role="img"
    {...props}
  >
    <title>NeoClassroom Logo</title>

    <defs>
      <linearGradient id="neoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#2450F5" />
        <stop offset="55%" stopColor="#2196FF" />
        <stop offset="100%" stopColor="#25D9F5" />
      </linearGradient>

      <linearGradient id="neoDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#192BB5" />
        <stop offset="100%" stopColor="#0864ED" />
      </linearGradient>
    </defs>

    {/* Graduation cap */}
    <path
      d="M17 31 50 12 Q53 10 56 12
         L88 30 Q92 32 88 35
         L56 54 Q53 56 50 54
         L17 36 Q13 33 17 31Z"
      fill={color ?? "url(#neoGradient)"}
    />

    {/* Cap side */}
    <path
      d="M56 54 79 41 V63
         Q79 66 76 64Z"
      fill={color ?? "url(#neoDark)"}
    />

    {/* Tassel */}
    <path
      d="M88 33 V57"
      stroke={color ?? "#168CFB"}
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="88" cy="60" r="4" fill={color ?? "#21C5F5"} />

    {/* Left folded ribbon */}
    <path
      d="M12 57 Q12 51 18 48
         L29 42 Q34 39 39 43
         L61 59 Q65 62 65 68
         V80 Q65 85 60 82
         L18 69 Q12 66 12 60Z"
      fill={color ?? "url(#neoGradient)"}
    />

    {/* Ribbon shadow */}
    <path
      d="M29 42 Q35 38 40 44
         L44 48 V65
         L29 56Z"
      fill={color ?? "url(#neoDark)"}
    />

    {/* Right ribbon */}
    <path
      d="M53 65 67 55
         Q71 52 75 55
         L86 64 Q90 67 87 73
         L75 86 Q71 90 66 87
         L53 79Z"
      fill={color ?? "url(#neoDark)"}
    />
  </svg>
);
