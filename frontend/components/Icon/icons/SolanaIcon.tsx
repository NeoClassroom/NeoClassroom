import type { SVGprops } from "./Icon.type";

export const SolanaIcon = ({
  size = 24,
  width = size,
  height = size,
  ...props
}: SVGprops) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={width}
    height={height}
    {...props}
  >
    <circle cx={256} cy={256} r={256} fill="#1c0b4d" />
    <defs>
      <linearGradient
        id="solanaGradient"
        x1={163}
        y1={380}
        x2={413}
        y2={130}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#e83dfb" />
        <stop offset="50%" stopColor="#8f7cfd" />
        <stop offset="100%" stopColor="#00ff9d" />
      </linearGradient>
    </defs>
    <g transform="translate(13 0)">
      <polygon
        points="         155,150         375,150         330,200         110,200       "
        fill="url(#solanaGradient)"
      />
      <polygon
        points="         110,230         330,230         375,280         155,280       "
        fill="url(#solanaGradient)"
      />
      <polygon
        points="         155,310         375,310         330,360         110,360       "
        fill="url(#solanaGradient)"
      />
    </g>
  </svg>
);
