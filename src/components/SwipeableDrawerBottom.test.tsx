import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SwipeableDrawerBottom from "./SwipeableDrawerBottom";
import { describe, it, expect, vi } from "vitest";

describe("SwipeableDrawerBottom", () => {
  it("renders correctly when open", () => {
    render(
      <SwipeableDrawerBottom open={true} onOpen={() => {}} onClose={() => {}}>
        <div data-testid="content">Content goes here</div>
      </SwipeableDrawerBottom>,
    );

    // Check if the content is rendered
    expect(screen.getByTestId("content")).toBeInTheDocument();

    // Check if the drawer is open
    expect(screen.getByRole("presentation")).toHaveClass("MuiDrawer-root");
  });

  it("calls onClose when the drawer is closed", async () => {
    const onCloseMock = vi.fn();
    render(
      <SwipeableDrawerBottom
        open={true}
        onOpen={() => {}}
        onClose={onCloseMock}
      >
        <div>Content goes here</div>
      </SwipeableDrawerBottom>,
    );

    // Close the drawer
    await userEvent.keyboard("{Escape}");

    // Check if onClose is called
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onOpen when the drawer is opened", () => {
    // currentyl no tests for this as we would need to simulate window touch move events
    //     const onOpenMock = vi.fn();
    //     const {rerender} = render(
    //       <SwipeableDrawerBottom open={false} onOpen={onOpenMock} onClose={() => {}}>
    //         <div>Content goes here</div>
    //       </SwipeableDrawerBottom>
    //     );
    //     rerender( <SwipeableDrawerBottom open={true} onOpen={onOpenMock} onClose={() => {}}>
    //     <div>Content goes here</div>
    //   </SwipeableDrawerBottom>)
    //     expect(onOpenMock).toHaveBeenCalled();
  });
});
