import type { SVGprops } from "./Icon.type";

export const Menu = ({
  color = "currentColor",
  size = 24,
  height = size,
  width = size,
  ...props
}: SVGprops) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M2 4h16v2H2V4zm0 5h16v2H2V9zm16 5H2v2h16v-2z" fill={color} />
  </svg>
);
