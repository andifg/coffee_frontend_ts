import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SlideToReload from "./SlideToReload";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { expect, it, describe, vi } from "vitest";

// Mocking the store and required actions

describe("SlideToReload", () => {
  const mockStore = configureStore();
  const initialState = {
    generalConfig: {
      recursiveLoading: false,
    },
  };
  const store = mockStore(initialState);

  const functionToTriggerMock = vi.fn();

  it("renders without errors", () => {
    render(
      <Provider store={store}>
        <SlideToReload
          functionToTrigger={functionToTriggerMock}
          functionToTriggerLoading={false}
        >
          <div>Test Content</div>
        </SlideToReload>
      </Provider>,
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("shows info message on touch move larger 50", async () => {
    render(
      <Provider store={store}>
        <SlideToReload
          functionToTrigger={functionToTriggerMock}
          functionToTriggerLoading={false}
        >
          <div role="presentation">Test Content</div>
        </SlideToReload>
      </Provider>,
    );

    const slide: HTMLElement = screen.getByTestId("slide-to-reload");

    slide.getBoundingClientRect = vi.fn(() => {
      return {
        x: 0,
        y: 0,
        top: 60,
        bottom: 120,
        left: 0,
        right: 0,
        width: 0,
        height: 60,
        toJSON: () => {},
      };
    });

    fireEvent.touchStart(screen.getByRole("presentation"), {
      touches: [{ clientY: 60 }],
    });

    fireEvent.touchMove(screen.getByRole("presentation"), {
      touches: [{ clientY: 111 }],
    });

    fireEvent.touchEnd(screen.getByRole("presentation"), {
      touches: [{ clientY: 111 }],
    });

    await waitFor(
      () => {
        expect(screen.getByText("Slide down to reload")).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("doesn't show message when ref element is lower than 50 on screen (or above viewsight", async () => {
    render(
      <Provider store={store}>
        <SlideToReload
          functionToTrigger={functionToTriggerMock}
          functionToTriggerLoading={false}
        >
          <div role="presentation">Test Content</div>
        </SlideToReload>
      </Provider>,
    );

    const slide: HTMLElement = screen.getByTestId("slide-to-reload");

    slide.getBoundingClientRect = vi.fn(() => {
      return {
        x: 0,
        y: 0,
        top: 0,
        bottom: 120,
        left: 0,
        right: 0,
        width: 0,
        height: 60,
        toJSON: () => {},
      };
    });

    fireEvent.touchStart(screen.getByRole("presentation"), {
      touches: [{ clientY: 60 }],
    });

    fireEvent.touchMove(screen.getByRole("presentation"), {
      touches: [{ clientY: 111 }],
    });

    fireEvent.touchEnd(screen.getByRole("presentation"), {
      touches: [{ clientY: 111 }],
    });

    await waitFor(
      () => {
        expect(
          screen.queryByText("Slide down to reload"),
        ).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("shows loading sign on reaching the threshold and dissapear after time", async () => {
    render(
      <Provider store={store}>
        <SlideToReload
          functionToTrigger={functionToTriggerMock}
          functionToTriggerLoading={false}
        >
          <div role="presentation">Test Content</div>
        </SlideToReload>
      </Provider>,
    );

    const slide: HTMLElement = screen.getByTestId("slide-to-reload");

    slide.getBoundingClientRect = vi.fn(() => {
      return {
        x: 0,
        y: 0,
        top: 60,
        bottom: 120,
        left: 0,
        right: 0,
        width: 0,
        height: 60,
        toJSON: () => {},
      };
    });

    fireEvent.touchStart(screen.getByRole("presentation"), {
      touches: [{ clientY: 60 }],
    });
    fireEvent.touchMove(screen.getByRole("presentation"), {
      touches: [{ clientY: 280 }],
    });

    await waitFor(
      () => {
        expect(screen.getByTestId("circular-progress")).toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    fireEvent.touchEnd(screen.getByRole("presentation"), {
      touches: [{ clientY: 280 }],
    });

    await waitFor(
      () => {
        expect(
          screen.queryByTestId("circular-progress"),
        ).not.toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });
});
