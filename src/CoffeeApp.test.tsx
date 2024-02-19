import CoffeeApp from "./CoffeeApp";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("CoffeeApp", () => {
  it("should render successfully", () => {
    vi.mock("./hooks/useAuthWrapper", () => ({
      default: vi.fn(),
    }));

    vi.mock("./routes/Router", () => ({
      default: () => <div>hello world</div>,
    }));

    const { baseElement } = render(<CoffeeApp />);
    expect(baseElement).toBeTruthy();
  });
});
