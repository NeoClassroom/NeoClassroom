import type { ReactNode } from "react";

export interface LeftLayoutProps {
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
  position?: "right" | "left";
  profileIcon?: ReactNode;
  profileName?: string;
}
