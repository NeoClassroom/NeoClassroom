import type { ButtonProps } from "./Button.type";

export const VARIANT_STYLES: Record<
  NonNullable<ButtonProps["variant"]>,
  string
> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-foreground hover:bg-card-hover",
  tertiary: "bg-success text-foreground  hover:underline",
  ghost: "bg-none hover:bg-muted",
};

export const SIZE_STYLES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};
