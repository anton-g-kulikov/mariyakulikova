import React from "react";
import { render, screen } from "@testing-library/react";
import { PageContainer } from "../../../src/components/PageContainer";
import "@testing-library/jest-dom";

describe("PageContainer Component", () => {
  it("renders children", () => {
    render(
      <PageContainer>
        <div>Content</div>
      </PageContainer>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies theme background", () => {
    const { container } = render(<PageContainer>Content</PageContainer>);
    expect(container.firstChild).toHaveStyle({
      backgroundColor: "rgb(253, 242, 248)",
    });
  });
});
