import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

afterEach(cleanup);

describe("Button", () => {
  it("renders its children with primary medium defaults", () => {
    render(<Button>Save changes</Button>);

    const button = screen.getByRole("button", { name: "Save changes" });
    expect(button).toHaveClass("bg-primary", "px-4", "py-2", "text-base");
    expect(button).toHaveAttribute("type", "button");
  });

  it.each([
    ["primary", "bg-primary"],
    ["secondary", "bg-secondary"],
    ["tertiary", "bg-success"],
  ] as const)("applies the %s variant styles", (variant, className) => {
    render(<Button variant={variant}>Action</Button>);

    expect(screen.getByRole("button", { name: "Action" })).toHaveClass(
      className,
    );
  });

  it.each([
    ["sm", "px-2", "text-sm"],
    ["md", "px-4", "text-base"],
    ["lg", "px-6", "text-lg"],
  ] as const)("applies the %s size styles", (size, padding, textSize) => {
    render(
      <Button size={size} className="custom-button">
        Action
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Action" })).toHaveClass(
      padding,
      textSize,
      "custom-button",
    );
  });

  it("forwards native button attributes and click events", () => {
    const onClick = vi.fn();
    render(
      <Button type="submit" disabled onClick={onClick} aria-label="Submit">
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("calls the click handler when enabled", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
