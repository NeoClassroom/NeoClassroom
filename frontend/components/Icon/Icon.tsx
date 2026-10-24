import type { IconProps } from "./icons/Icon.type";

export const Icon = ({ icon: IconComponent, ...props }: IconProps) => {
  return <IconComponent {...props} />;
};
