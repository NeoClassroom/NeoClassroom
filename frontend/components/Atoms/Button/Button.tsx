import type { ButtonProps } from "./Button.type";
import { SIZE_STYLES, VARIANT_STYLES } from "./Button.constants";
import { cn } from "../../../utility";

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) => {
  const classes = [
    "rounded font-medium transition",
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={cn("flex flex-row items-center gap-10", classes)}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
