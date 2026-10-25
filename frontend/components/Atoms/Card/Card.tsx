import { forwardRef, type ElementType, type ForwardedRef } from "react";

import { cn } from "../../../utility";
import type { CardComponent, CardProps } from "./Card.type";

import { CARD_PADDING_CLASSES, CARD_VARIANT_CLASSES } from "./Card.constants";

const CardImpl = <C extends ElementType = "article">(
  {
    as,
    children,
    className = "",
    padding = "md",
    variant = "default",
    background,
    ...props
  }: CardProps<C>,
  forwardedRef: ForwardedRef<HTMLElement>,
) => {
  const Component = (as || "article") as ElementType;
  const hasBg = Boolean(background);

  return (
    <Component
      ref={forwardedRef}
      className={cn(
        "relative overflow-hidden rounded-lg shadow-sm transition-all",
        // Only apply standard border styles if there is no background image
        !hasBg && "border border-gray-200",
        CARD_VARIANT_CLASSES[variant],
        CARD_PADDING_CLASSES[padding],
        className,
      )}
      {...props}
    >
      {background && (
        <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
          <img
            src={background}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />

          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/5 backdrop-blur-md"
            style={{
              maskImage: "linear-gradient(to top, black 20%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, black 20%, transparent 100%)",
            }}
          />
        </div>
      )}

      <div className="relative z-10 h-full w-full">{children}</div>
    </Component>
  );
};

export const Card = forwardRef(CardImpl) as CardComponent & {
  displayName?: string;
};

Card.displayName = "Card";
