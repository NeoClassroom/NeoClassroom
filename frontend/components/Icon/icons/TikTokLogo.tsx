import type { SVGprops } from "./Icon.type";

export const TikTokLogo = ({
  color = "currentColor",
  size = 24,
  height = size,
  width = size,
  ...props
}: SVGprops) => (
  <svg
    width={width}
    height={height}
    viewBox="76 54 342 389"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="TikTok"
    role="img"
    {...props}
  >
    <title>{"TikTok Logo"}</title>
    <path
      fill={color}
      d="M219 200a117 117 0 1 0 101 115v-128a150 150 0 0 0 88 28v-63a88 88 0 0 1-88-88h-64v252a54 54 0 1 1-37-51z"
    />
  </svg>
);
