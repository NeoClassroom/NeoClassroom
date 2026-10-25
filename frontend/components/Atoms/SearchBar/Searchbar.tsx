import { useId } from "react";
import type { SearchbarProps } from "./Searchbar.type";
import { SEARCHBAR_SIZES, SEARCHBAR_STYLES } from "./Searchbar.constants";
import { Search } from "../../Icon/icons/Search";

export const Searchbar = ({
  title,
  placeholder = "Search...",
  size = "md",
  variant = "primary",
  className,
  inputClassName,
  icon: Icon = Search,
  id,
  "aria-label": ariaLabel,
  ...inputProps
}: SearchbarProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="w-full">
      {title && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-foreground"
        >
          {title}
        </label>
      )}
      <div
        className={[
          "flex w-full items-center transition-colors duration-200",
          SEARCHBAR_STYLES[variant],
          SEARCHBAR_SIZES[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Icon
          aria-hidden="true"
          className="size-5 shrink-0 text-muted"
          size={20}
        />
        <input
          {...inputProps}
          id={inputId}
          type="search"
          placeholder={placeholder}
          aria-label={ariaLabel ?? (title ? undefined : "Search")}
          className={[
            "min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-60",
            inputClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </div>
    </div>
  );
};
