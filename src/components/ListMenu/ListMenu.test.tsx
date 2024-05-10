import { render, screen } from "@testing-library/react";
import ListMenu from "./ListMenu";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("ListMenu", () => {
  it("renders menu correctly", () => {
    const mockHandleClose = vi.fn();

    const props = {
      anchorElement: document.createElement("button"),
      open: true,
      handleClose: mockHandleClose,
      children: <div>Menu Content</div>,
    };

    render(<ListMenu {...props} />);

    // Check if the menu is rendered
    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();

    // Check if the content is rendered inside the menu
    const menuContent = screen.getByText("Menu Content");
    expect(menuContent).toBeInTheDocument();
  });

  it("calls handleClose when menu is closed", async () => {
    const mockHandleClose = vi.fn();

    const props = {
      anchorElement: document.createElement("button"),
      open: true,
      handleClose: mockHandleClose,
      children: <div>Menu Content</div>,
    };

    render(
      <>
        <h1>TestHeadline</h1>
        <ListMenu {...props} />
      </>,
    );
    // Check if the menu is initially open
    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    // Check if handleClose is called
    expect(mockHandleClose).toHaveBeenCalled();
  });
});
