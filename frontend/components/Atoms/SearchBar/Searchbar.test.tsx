import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { SVGProps } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Searchbar } from "./Searchbar";

afterEach(cleanup);

const CustomIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg data-testid="custom-search-icon" {...props} />
);

describe("Searchbar", () => {
  it("renders an accessible search input with a visible label", () => {
    render(<Searchbar title="Search courses" />);

    const input = screen.getByRole("searchbox", { name: "Search courses" });
    expect(input).toHaveAttribute("type", "search");
    expect(input).toHaveAttribute("placeholder", "Search...");
  });

  it("provides an accessible name when no visible title is given", () => {
    render(<Searchbar />);

    expect(screen.getByRole("searchbox", { name: "Search" })).toBeInTheDocument();
  });

  it("accepts a typed custom SVG icon component", () => {
    render(<Searchbar icon={CustomIcon} />);

    expect(screen.getByTestId("custom-search-icon")).toHaveClass(
      "size-5",
      "text-muted",
    );
  });

  it.each([
    ["primary", "focus-within:border-primary"],
    ["secondary", "focus-within:border-accent"],
    ["tertiary", "border-b"],
  ] as const)("applies the %s variant", (variant, expectedClass) => {
    const { container } = render(<Searchbar variant={variant} />);

    expect(container.querySelector("input")?.parentElement).toHaveClass(
      expectedClass,
    );
  });

  it.each([
    ["sm", "text-sm", "px-3"],
    ["md", "text-base", "px-4"],
    ["lg", "text-lg", "px-5"],
  ] as const)("applies the %s size", (size, textSize, padding) => {
    const { container } = render(<Searchbar size={size} />);

    expect(container.querySelector("input")?.parentElement).toHaveClass(
      textSize,
      padding,
    );
  });

  it("forwards native input props and change events", () => {
    const onChange = vi.fn();
    render(
      <Searchbar
        title="Search courses"
        name="courses"
        required
        onChange={onChange}
      />,
    );

    const input = screen.getByRole("searchbox", { name: "Search courses" });
    expect(input).toHaveAttribute("name", "courses");
    expect(input).toBeRequired();

    fireEvent.change(input, { target: { value: "biology" } });
    expect(onChange).toHaveBeenCalledOnce();
    expect(input).toHaveValue("biology");
  });

  it("supports controlled values and disabled state", () => {
    render(<Searchbar value="History" disabled onChange={() => undefined} />);

    const input = screen.getByRole("searchbox", { name: "Search" });
    expect(input).toHaveValue("History");
    expect(input).toBeDisabled();
  });
});