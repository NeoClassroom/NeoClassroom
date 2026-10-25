export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional CSS classes used to control the
   * size, shape, and appearance of the skeleton.
   */
  className?: string;

  /**
   * Displays an animated loading effect.
   *
   * @default true
   */
  animated?: boolean;

  /**
   * Displays the skeleton with rounded corners.
   *
   * @default "md"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}
