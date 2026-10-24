import type { SVGprops } from "./Icon.type";

export const Star = ({
  color = "currentColor",
  size = 24,
  height = size,
  width = size,
  strokeWidth = 1,
  ...props
}: SVGprops) => (
  <svg
    fill={color}
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    id="star"
    data-name="Line Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon line-color"
    {...props}
  >
    <polygon
      id="primary"
      points="12 4 9.22 9.27 3 10.11 7.5 14.21 6.44 20 12 17.27 17.56 20 16.5 14.21 21 10.11 14.78 9.27 12 4"
      style={{
        fill: "none",
        stroke: color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: strokeWidth,
      }}
    />
  </svg>
);
