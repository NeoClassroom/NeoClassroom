import type {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  ReactElement,
  ReactNode,
} from "react";

export type CardVariant = "default" | "muted" | "outline";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardOwnProps {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  padding?: CardPadding;
  variant?: CardVariant;
  background?: string;
}

export type CardProps<C extends ElementType = "article"> = CardOwnProps & {
  as?: C;
} & Omit<ComponentPropsWithoutRef<C>, keyof CardOwnProps | "as">;

export type CardComponent = <C extends ElementType = "article">(
  props: CardProps<C> & { ref?: ForwardedRef<HTMLElement> },
) => ReactElement | null;
