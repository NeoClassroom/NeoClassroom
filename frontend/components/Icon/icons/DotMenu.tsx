import type { SVGprops } from "./Icon.type";

export const DotMenuLogo = ({
  color = "var(--color-primary-foreground)",
  size = 26,
  width = size,
  height = size,
  ...props
}: SVGprops) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    enableBackground="new 0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill={color}
      d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z"
      id="XMLID_294_"
    />
    <path
      fill={color}
      d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z"
      id="XMLID_295_"
    />
    <path
      fill={color}
      d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z"
      id="XMLID_297_"
    />
  </svg>
);
