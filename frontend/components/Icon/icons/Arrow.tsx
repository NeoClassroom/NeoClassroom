import type { SVGprops } from "./Icon.type";

const Arrow = ({
  color = "currentColor",
  size = 24,
  height = size,
  width = size,
  rotation = 0,
  ...props
}: SVGprops & { rotation?: number }) => (
  <svg
    fill={color}
    width={width || size}
    height={height || size}
    viewBox="0 0 36 36"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M27.66,15.61,18,6,8.34,15.61A1,1,0,1,0,9.75,17L17,9.81V28.94a1,1,0,1,0,2,0V9.81L26.25,17a1,1,0,0,0,1.41-1.42Z"
      transform={`rotate(${rotation} 18 18)`}
    />
  </svg>
);

export const ArrowUp = (props: SVGprops) => <Arrow {...props} rotation={0} />;

export const ArrowRight = (props: SVGprops) => (
  <Arrow {...props} rotation={90} />
);

export const ArrowDown = (props: SVGprops) => (
  <Arrow {...props} rotation={180} />
);

export const ArrowLeft = (props: SVGprops) => (
  <Arrow {...props} rotation={270} />
);
