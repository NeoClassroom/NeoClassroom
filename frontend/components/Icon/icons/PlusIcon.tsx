import type { SVGprops } from "./Icon.type";

export const PlusIcon = ({
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
    id="plus"
    data-name="Line Color"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      id="primary"
      d="M5,12H19M12,5V19"
      style={{
        fill: "none",
        stroke: color || "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: props.strokeWidth || 3,
      }}
    />
  </svg>
);
