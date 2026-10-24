import type { SVGProps, ComponentType } from "react";

export interface SVGprops extends SVGProps<SVGSVGElement> {
  /** The color of the icon. */
  color?: string;

  /** The size of the icon. */
  size?: number | string;
}

export type IconProps = SVGprops & {
  icon: ComponentType<SVGprops>;
};
