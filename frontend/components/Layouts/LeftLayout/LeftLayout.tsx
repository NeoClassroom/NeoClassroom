import type { LeftLayoutProps } from "./LeftLayout.type";
import { cn } from "../../../utility";
import { LEFTLAYOUT_STYLE } from "./LeftLayout.constants";

export const LeftLayout = ({
  title,
  icon,
  children,
  position = "left",
}: LeftLayoutProps) => {
  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 w-80 text-center",
          LEFTLAYOUT_STYLE[position],
        )}
      >
        <div className="p-10 flex flex-row items-center  gap-2">
          {icon}
          <p className="text-2xl font-bold">{title}</p>
        </div>
        {children}
      </aside>
    </>
  );
};
