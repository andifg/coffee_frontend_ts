import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  vi.mock("./CoffeeApp", () => ({
    default: () => <div>Mocked CoffeeApp</div>,
  }));

  it("Should render CoffeeApp Mock", () => {
    render(<App />);

    expect(screen.getByText("Mocked CoffeeApp")).toBeInTheDocument();
  });
});
