import type { CardPadding, CardVariant } from "./Card.type";

export const CARD_VARIANTS = [
  "default",
  "muted",
  "outline",
] as const satisfies readonly CardVariant[];

export const CARD_PADDING_OPTIONS = [
  "none",
  "sm",
  "md",
  "lg",
] as const satisfies readonly CardPadding[];

export const CARD_VARIANT_CLASSES: Record<CardVariant, string> = {
  default: "border-border bg-surface text-surface-foreground",
  muted: "border-border bg-muted text-foreground",
  outline: "border-border bg-transparent text-foreground",
};

export const CARD_PADDING_CLASSES: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};
