import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Card } from "./Card";

afterEach(cleanup);

describe("Card", () => {
  it("renders card content", () => {
    render(<Card>Product shell</Card>);

    expect(screen.getByText("Product shell")).toBeInTheDocument();
  });

  it("renders as an article by default", () => {
    render(<Card aria-label="Product card" />);

    expect(screen.getByRole("article", { name: "Product card" })).toBeInTheDocument();
  });

  it("renders as a different element when requested", () => {
    render(
      <Card as="section" aria-label="Featured product">
        Featured
      </Card>,
    );

    expect(
      screen.getByRole("region", { name: "Featured product" }),
    ).toBeInTheDocument();
  });

  it("applies variant and padding classes", () => {
    render(
      <Card padding="lg" variant="outline">
        Styled card
      </Card>,
    );

    const card = screen.getByRole("article");

    expect(card).toHaveClass("bg-transparent");
    expect(card).toHaveClass("p-6");
  });
});
