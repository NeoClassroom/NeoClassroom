import type { SVGprops } from "./Icon.type";

export const AttachmentIcon = ({
  size = 24,
  width = size,
  height = size,
  color = "currentColor",
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
    <path
      id="primary"
      d="M14,6H9a6,6,0,0,0-6,6H3a6,6,0,0,0,6,6h8a4,4,0,0,0,4-4h0a4,4,0,0,0-4-4H9a2,2,0,0,0-2,2H7a2,2,0,0,0,2,2h8"
      style={{
        fill: "none",
        stroke: color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: props.strokeWidth || 2,
      }}
    />
  </svg>
);
