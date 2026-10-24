import type { SVGprops } from "./Icon.type";

export const Check = ({
  color = "currentColor",
  size = 24,
  height = size,
  width = size,
  ...props
}: SVGprops) => (
  <svg
    width={width || size}
    height={height || size}
    fill="none"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 8.25 6.5 11.75 13 4.75"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
