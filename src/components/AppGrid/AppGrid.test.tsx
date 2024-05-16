import { AppGrid } from "./AppGrid";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("CoffeeApp", () => {
  it("should render successfully", () => {
    vi.mock("./useAuthWrapper", () => ({
      default: vi.fn(),
    }));

    vi.mock("../../routes/Router", () => ({
      default: () => <div>hello world</div>,
    }));

    const { baseElement } = render(<AppGrid />);
    expect(baseElement).toBeTruthy();
  });
});
