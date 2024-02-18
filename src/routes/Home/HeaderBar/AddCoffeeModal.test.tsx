import { describe, expect, it, vi } from "vitest";
import AddCoffeeModal from "./AddCoffeeModal";
import { render, screen } from "@testing-library/react";

describe("AddCoffeeModal", () => {
  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

  vi.mock("react-redux", () => ({
    useDispatch: vi.fn(),
  }));

  it("should render", () => {
    render(
      <AddCoffeeModal currentUUID="123" open={true} closeModal={() => {}} />,
    );

    expect(screen.getByText("Add Coffee")).toBeInTheDocument();
  });
});
