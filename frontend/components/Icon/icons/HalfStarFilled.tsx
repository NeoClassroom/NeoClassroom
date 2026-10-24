import type { SVGprops } from "./Icon.type";

export const HalfStarFilled = ({
  color = "currentColor",
  size = 24,
  height = size,
  width = size,
  ...props
}: SVGprops) => (
  <svg
    fill={color}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs></defs>
    <linearGradient id="halfGradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="50%" stopColor={color} />
      <stop offset="50%" stopColor="transparent" />
    </linearGradient>
    <polygon
      points="12 4 9.22 9.27 3 10.11 7.5 14.21 6.44 20 12 17.27 17.56 20 16.5 14.21 21 10.11 14.78 9.27 12 4"
      style={{
        fill: "url(#halfGradient)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: props.strokeWidth || 1,
      }}
    />

    <polygon
      points="12 4 9.22 9.27 3 10.11 7.5 14.21 6.44 20 12 17.27 17.56 20 16.5 14.21 21 10.11 14.78 9.27 12 4"
      fill="none"
      stroke={color}
      strokeWidth={props.strokeWidth || 1}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
