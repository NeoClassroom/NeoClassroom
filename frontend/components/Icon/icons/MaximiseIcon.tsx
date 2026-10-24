import type { SVGprops } from "./Icon.type";

export const MaximiseIcon = ({
  size = 24,
  width = size,
  height = size,
  color = "currentColor",
  ...props
}: SVGprops) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16 20H18C19.1046 20 20 19.1046 20 18V16"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 4H6C4.89543 4 4 4.89543 4 6V8"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 20H6C4.89543 20 4 19.1046 4 18V16"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 4H18C19.1046 4 20 4.89543 20 6V8"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
