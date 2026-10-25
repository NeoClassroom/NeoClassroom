import type { SearchbarProps } from "./Searchbar.type";

export const SEARCHBAR_STYLES: Record<
  NonNullable<SearchbarProps["variant"]>,
  string
> = {
  primary:
    "rounded-lg border border-border bg-surface focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30",
  secondary:
    "rounded-lg border border-border-hover bg-card focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/30",
  tertiary:
    "rounded-none border-b border-border bg-transparent focus-within:border-primary-light",
};

export const SEARCHBAR_SIZES: Record<
  NonNullable<SearchbarProps["size"]>,
  string
> = {
  sm: "gap-2 px-3 py-2 text-sm",
  md: "gap-3 px-4 py-3 text-base",
  lg: "gap-3 px-5 py-4 text-lg",
};
