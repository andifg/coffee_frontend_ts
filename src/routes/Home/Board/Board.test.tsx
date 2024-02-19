import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Board from "./Board";
import { vi, describe, it, expect } from "vitest";

describe("Board", () => {
  vi.mock("../../../hooks/useReloadChildren", () => ({
    default: () => [false, vi.fn()],
  }));

  vi.mock("../../../hooks/useLoadIdsToRedux", () => ({
    default: () => [vi.fn()],
  }));

  vi.mock("../Coffee/Coffee", () => ({
    default: () => <div>Hello Coffee</div>,
  }));

  const initialState = {
    coffeeIds: {
      coffeeIds: ["coffee1", "coffee2"],
    },
    generalConfig: {
      realoadCount: 0,
    },
  };

  const mockStore = configureStore();
  const store = mockStore(initialState);

  it("renders Board component with Coffee elements", async () => {
    render(
      <Provider store={store}>
        <Board />
      </Provider>,
    );

    expect(screen.getAllByText("Hello Coffee")).toHaveLength(2);
  });

  it("renders Board component without Coffee elements", async () => {
    const newState = {
      coffeeIds: {
        coffeeIds: [],
      },
      generalConfig: {
        realoadCount: 0,
      },
    };

    const newStore = mockStore(newState);

    render(
      <Provider store={newStore}>
        <Board />
      </Provider>,
    );

    expect(screen.queryByText("Hello Coffee")).toBeNull();
  });
});
