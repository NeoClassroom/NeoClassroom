import type { ComponentType, InputHTMLAttributes } from "react";
import type { SVGprops } from "../../Icon/icons/Icon.type";

export interface SearchbarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  title?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "tertiary";
  inputClassName?: string;
  icon?: ComponentType<SVGprops>;
}
