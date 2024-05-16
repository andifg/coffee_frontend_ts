import { render, screen } from "@testing-library/react";
import { Board } from "./Board";
import { vi, describe, it, expect } from "vitest";
import { useManageCoffeesState } from "./useManageCoffeesState";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("Board", () => {
  const initialState = {
    user: {
      userRole: "Admin",
      givenName: "John",
    },
    generalConfig: {
      recursiveLoading: false,
      realoadCount: 0,
    },
  };

  const mockStore = configureStore();
  const store = mockStore(initialState);

  vi.mock("./useManageCoffeesState", () => ({
    useManageCoffeesState: vi.fn(),
  }));

  vi.mock("../Coffee/CoffeeCard/CoffeeCard", () => ({
    CoffeeCard: () => <div>Hello Coffee</div>,
  }));

  it("renders Board component with Coffee elements", async () => {
    vi.mocked(useManageCoffeesState).mockReturnValue([
      [
        {
          _id: "1",
          name: "Coffee 1",
          owner_id: "1",
          owner_name: "Owner 1",
          rating_average: 4,
          rating_count: 1,
        },
        {
          _id: "2",
          name: "Coffee 2",
          owner_id: "1",
          owner_name: "Owner 1",
          rating_average: 4,
          rating_count: 1,
        },
      ],

      vi.fn(),
      false,
      vi.fn(),
      vi.fn(),
    ]);

    render(
      <Provider store={store}>
        <Board personalized={false} />
      </Provider>,
    );

    expect(screen.getAllByText("Hello Coffee")).toHaveLength(2);
  });

  it("renders Board component without Coffee elements", async () => {
    vi.mocked(useManageCoffeesState).mockReturnValue([
      [],
      vi.fn(),
      false,
      vi.fn(),
      vi.fn(),
    ]);

    render(
      <Provider store={store}>
        <Board personalized={false} />
      </Provider>,
    );

    expect(screen.queryByText("Hello Coffee")).toBeNull();
  });
});
