import type { SVGprops } from "./Icon.type";

export const EyeOff = ({
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
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m4 4 16 16"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
    <path
      d="M9.88 5.95A8.5 8.5 0 0 1 12 5.75c6 0 9.25 6.25 9.25 6.25a16.2 16.2 0 0 1-2.38 3.2M14.12 18.05a8.5 8.5 0 0 1-2.12.2C6 18.25 2.75 12 2.75 12a16.2 16.2 0 0 1 2.38-3.2"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
    <path
      d="M10.1 10.1a2.75 2.75 0 0 0 3.8 3.8"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
);
