import type { SkeletonProps } from "./Skeleton.type";
import { cn } from "../../../utility";
import { ROUNDED } from "./Skeleton.constants";

export function Skeleton({
  className,
  animated = true,
  rounded = "md",
  ...props
}: SkeletonProps) {
  return (
    <div
      {...props}
      aria-hidden="true"
      className={cn(
        "bg-muted",
        animated && "animate-pulse",
        ROUNDED[rounded],
        className,
      )}
    />
  );
}
