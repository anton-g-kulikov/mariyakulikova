import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../../../src/components/Button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("renders with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies primary styles by default", () => {
    render(<Button>Primary</Button>);
    const button = screen.getByText("Primary");
    // Check for primary color (hex might be converted to rgb)
    expect(button).toHaveStyle({ backgroundColor: "#ec4899" });
  });

  it("applies secondary styles when variant is secondary", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByText("Secondary");
    expect(button).toHaveStyle({ backgroundColor: "#84cc16" });
  });
});
