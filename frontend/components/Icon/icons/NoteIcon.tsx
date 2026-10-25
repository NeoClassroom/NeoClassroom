
import type { SVGprops } from "./Icon.type";

export const NoteIcon = ({
  color = "currentColor",
  size = 24,
  width = size,
  height = size,
  ...props
}: SVGprops) => (
<svg
    fill={color}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    id="note"
    data-name="Flat Line"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-line"
    {...props}
  >
    <path
      id="secondary"
      d="M18,4H15V5a1,1,0,0,1-1,1H10A1,1,0,0,1,9,5V4H6A1,1,0,0,0,5,5V20a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V5A1,1,0,0,0,18,4Z"
      style={{
        fill: props.fill,
        strokeWidth: 2,
      }}
    />
    <rect
      id="primary"
      x={9}
      y={3}
      width={6}
      height={3}
      rx={1}
      style={{
        fill: "none",
        stroke: "rgb(0, 0, 0)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <path
      id="primary-2"
      data-name="primary"
      d="M18,4a1,1,0,0,1,1,1V20a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V5A1,1,0,0,1,6,4"
      style={{
        fill: "none",
        stroke: "rgb(0, 0, 0)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </svg>
);