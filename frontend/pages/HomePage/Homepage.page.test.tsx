import "@testing-library/jest-dom/vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { Homepage } from "./Homepage.page";
import { ClassPage } from "../ClassesPage";

afterEach(cleanup);

describe("Homepage navigation", () => {
  it("shows titles and descriptions on the image-backed class cards", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "OOSD" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "ASAS" })).toBeInTheDocument();
    expect(
      screen.getAllByText("Continue learning in your class workspace."),
    ).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "OOSD" }).closest("article"))
      .toHaveStyle({ backgroundImage: expect.stringContaining("url(") });
  });

  it("shows card skeletons while the home overview loads", async () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>,
    );

    const overview = screen.getByRole("region", {
      name: "Classroom overview",
    });

    expect(overview).toHaveAttribute("aria-busy", "true");
    expect(overview.querySelectorAll('[aria-hidden="true"]').length).toBe(6);

    await waitFor(() => {
      expect(overview).toHaveAttribute("aria-busy", "false");
    });

    expect(screen.getByText("Active classes")).toBeInTheDocument();
  });

  it("shows Home as active initially", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-brand-icon")).toBeInTheDocument();
  });

  it("keeps the selected page button highlighted after clicking", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>,
    );

    const classesButton = screen.getByRole("button", { name: "Classes" });
    fireEvent.click(classesButton);

    expect(classesButton).toHaveAttribute("aria-current", "page");
    expect(classesButton).toHaveClass(
      "bg-linear-to-r",
      "from-primary/30",
      "to-accent/20",
    );
    expect(screen.getByRole("button", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("moves the active gradient to Calendar when selected", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>,
    );

    const calendarButton = screen.getByRole("button", { name: "Calendar" });
    fireEvent.click(calendarButton);

    expect(calendarButton).toHaveAttribute("aria-current", "page");
    expect(calendarButton).toHaveClass(
      "bg-linear-to-r",
      "from-primary/30",
      "to-accent/20",
    );
  });

  it("navigates to the Classes page when Classes is selected", () => {
    function CurrentPath() {
      return <output aria-label="Current path">{useLocation().pathname}</output>;
    }

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/classes" element={<ClassPage />} />
        </Routes>
        <CurrentPath />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Classes" }));

    expect(screen.getByLabelText("Current path")).toHaveTextContent("/classes");
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Classes" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("button", { name: "Calendar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Resources" })).toBeInTheDocument();
  });

  it("collapses and expands the desktop sidebar", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>,
    );

    const sidebar = screen.getByTestId("sidebar-shell");
    expect(sidebar).toHaveAttribute("data-collapsed", "true");

    fireEvent.click(screen.getByRole("button", { name: "Expand sidebar" }));
    expect(sidebar).toHaveAttribute("data-collapsed", "false");

    fireEvent.click(screen.getByRole("button", { name: "Collapse sidebar" }));
    expect(sidebar).toHaveAttribute("data-collapsed", "true");
  });

  it("hides the profile icon but keeps settings when collapsed", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("sidebar-profile")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument();
    screen.getAllByRole("separator").forEach((separator) => {
      expect(separator).toHaveClass(
        "group-data-[collapsed=true]/sidebar:lg:hidden",
      );
    });

    fireEvent.click(screen.getByRole("button", { name: "Expand sidebar" }));
    expect(screen.getByTestId("sidebar-profile")).toBeInTheDocument();
  });

  it("opens and closes the mobile navigation drawer", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>,
    );

    const sidebar = screen.getByTestId("sidebar-shell");
    const openButton = screen.getByRole("button", { name: "Open navigation" });
    expect(openButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(openButton);
    expect(sidebar).toHaveAttribute("data-mobile-open", "true");
    expect(openButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(screen.getByRole("button", { name: "Close navigation" }));
    expect(sidebar).toHaveAttribute("data-mobile-open", "false");
    expect(openButton).toHaveAttribute("aria-expanded", "false");
  });
});
