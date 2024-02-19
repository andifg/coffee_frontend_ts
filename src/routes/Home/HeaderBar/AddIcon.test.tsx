import { describe, vi, it, expect } from "vitest";
import AddIcon from "./AddIcon";
import { render, screen, waitFor } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import userEvent from "@testing-library/user-event";

describe("AddIcon", () => {
  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

  vi.mock("react-redux", () => ({
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  }));

  it("Should open and close modal", async () => {
    vi.mocked(useDispatch).mockReturnValue(vi.fn());

    vi.mocked(useSelector).mockReturnValue("Admin");

    render(<AddIcon />);

    const button = screen.getByTestId("add-modal-button");

    await userEvent.click(button);

    expect(screen.getByText("Add Coffee")).toBeInTheDocument();

    const cancelButton = screen.getByText("Cancel");

    await userEvent.click(cancelButton);

    waitFor(() => {
      expect(screen.queryByText("Add Coffee")).not.toBeInTheDocument();
    });
  });
});
