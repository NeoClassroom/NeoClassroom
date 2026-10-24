import type { SVGprops } from "./Icon.type";

export const CardIcon = ({
  color = "currentColor",
  fill = "blue",
  size = 70,
  width = size,
  height = size,
  ...props
}: SVGprops) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    {...props}
  >
    {/* card body */}
    <rect
      x={8}
      y={54}
      width={496}
      height={330}
      rx={24}
      fill={fill}
      stroke={color}
      strokeWidth={4}
    />

    {/* magnetic stripe */}
    <rect x={8} y={100} width={496} height={64} fill={color} />

    {/* card number lines */}
    <rect x={56} y={240} width={160} height={16} fill={color} />
    <rect x={56} y={286} width={110} height={16} fill={color} />
  </svg>
);
