import type { SVGprops } from "./Icon.type";

export const TeamIcon = ({
  color = "currentColor",
  size = 24,
  height = size,
  width = size,
  ...props
}: SVGprops) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="10"
      cy="10"
      r="9"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
    />

    <g fill={color}>
      {/* Left member */}
      <circle cx="5.8" cy="7.2" r="1.5" />
      <path d="M2.8 14v-1.2a3 3 0 0 1 5.2-2" />

      {/* Center member */}
      <circle cx="10" cy="6.3" r="1.8" />
      <path d="M6.7 14v-1.2a3.3 3.3 0 0 1 6.6 0V14z" />

      {/* Right member */}
      <circle cx="14.2" cy="7.2" r="1.5" />
      <path d="M17.2 14v-1.2a3 3 0 0 0-5.2-2" />
    </g>
  </svg>
);