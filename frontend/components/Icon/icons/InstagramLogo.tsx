import type { SVGprops } from "./Icon.type";

export const InstagramLogo = ({
  color = "currentColor",
  size = 24,
  height = size,
  width = size,
  ...props
}: SVGprops) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <title>{"Instagram Logo"}</title>
    <rect
      x={2}
      y={2}
      width={20}
      height={20}
      rx={5}
      stroke={color}
      strokeWidth={1.8}
    />
    <circle cx={12} cy={12} r={4.2} stroke={color} strokeWidth={1.8} />
    <circle cx={17.2} cy={6.8} r={1.1} fill={color} />
  </svg>
);
