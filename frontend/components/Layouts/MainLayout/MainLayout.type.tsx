import type { ReactNode } from "react";

export interface MainLayoutProps {
  children?: ReactNode;
  leftChildren?: ReactNode;
  leftLayoutTitle?: string;
  leftLayoutIcon?: ReactNode;
}
