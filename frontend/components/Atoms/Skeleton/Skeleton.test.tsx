import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import { Skeleton } from "./Skeleton";

afterEach(cleanup);

describe("Skeleton Component", () => {
  it("renders correctly", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
  });

  it("enables animation by default", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("animate-pulse");
  });

  it("disables animation when configured", () => {
    render(<Skeleton animated={false} data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).not.toHaveClass("animate-pulse");
  });

  it("applies custom classes", () => {
    render(
      <Skeleton className="h-4 w-32 custom-class" data-testid="skeleton" />,
    );
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("h-4", "w-32", "custom-class");
  });

  it("applies rounded variants", () => {
    const { rerender } = render(
      <Skeleton rounded="none" data-testid="skeleton" />,
    );
    expect(screen.getByTestId("skeleton")).toHaveClass("rounded-none");

    rerender(<Skeleton rounded="sm" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("rounded-sm");

    rerender(<Skeleton rounded="md" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("rounded-md");

    rerender(<Skeleton rounded="lg" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("rounded-lg");

    rerender(<Skeleton rounded="full" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("rounded-full");
  });
});
