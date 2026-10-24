import type { SVGprops } from "./Icon.type";

export const LoginIcon = ({
  color = "currentColor",
  size = 24,
  height = size,
  width = size,
  ...props
}: SVGprops) => (
  <svg
    fill={color}
    width={width || size}
    height={height || size}
    viewBox="0 0 36 36"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <path
      d="M28,4H12a2,2,0,0,0-2,2H28V30H12V20.2H10V30a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V6A2,2,0,0,0,28,4Z"
      className="clr-i-outline clr-i-outline-path-1"
    />
    <path
      d="M15.12,18.46a1,1,0,1,0,1.41,1.41l5.79-5.79L16.54,8.29a1,1,0,0,0-1.41,1.41L18.5,13H4a1,1,0,0,0-1,1,1,1,0,0,0,1,1H18.5Z"
      className="clr-i-outline clr-i-outline-path-2"
    />
    <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
  </svg>
);
