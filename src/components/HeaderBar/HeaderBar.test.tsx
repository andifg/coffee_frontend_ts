import "HeaderBar.scss";
import HeaderBar from "./HeaderBar";

import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("HeaderBar", () => {
  it("renders without error", () => {
    const { baseElement } = render(<HeaderBar />);
    expect(baseElement).toBeTruthy();
  });

  it("HeaderBar displays content in navbarLeft and navbarRight", () => {
    const leftContent = <div data-testid="left-content">Left Content</div>;
    const rightContent = <div data-testid="right-content">Right Content</div>;

    const { getByTestId } = render(
      <HeaderBar navbarLeft={leftContent} navbarRight={rightContent} />,
    );

    expect(getByTestId("left-content")).toBeInTheDocument();
    expect(getByTestId("right-content")).toBeInTheDocument();
  });
});
