import type { SVGprops } from "./Icon.type";

export const LockIcon = ({
  color = "currentColor",
  fill = "currentColor",
  size = 24,
  width = size,
  height = size,
  ...props
}: SVGprops) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 36 36"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>{"lock-line"}</title>
    <circle cx={18} cy={18} r={16.5} fill={fill} />
    <g fill={color} transform="translate(18 18) scale(0.75) translate(-18 -18)">
      <path d="M18.09,20.59A2.41,2.41,0,0,0,17,25.14V28h2V25.23a2.41,2.41,0,0,0-.91-4.64Z" />
      <path d="M26,15V10.72a8.2,8.2,0,0,0-8-8.36,8.2,8.2,0,0,0-8,8.36V15H7V32a2,2,0,0,0,2,2H27a2,2,0,0,0,2-2V15ZM12,10.72a6.2,6.2,0,0,1,6-6.36,6.2,6.2,0,0,1,6,6.36V15H12ZM9,32V17H27V32Z" />
    </g>
  </svg>
);
