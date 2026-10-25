import type { LeftLayoutProps } from "./LeftLayout.type";

export const LEFTLAYOUT_STYLE: Record<
  NonNullable<LeftLayoutProps["position"]>,
  string
> = {
  left: "left-0 border-r border-border",
  right: "right-0 border-l border-border",
};
