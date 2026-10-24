import type { SVGprops } from "./Icon.type";

export const MinimiseIcon = ({
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
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 16H18C16.8954 16 16 16.8954 16 18V20"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 8H6C7.10457 8 8 7.10457 8 6V4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 16H6C7.10457 16 8 16.8954 8 18V20"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 8H18C16.8954 8 16 7.10457 16 6V4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
