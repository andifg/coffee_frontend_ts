import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import { CoffeeCard } from "../CoffeeCard/CoffeeCard";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("Coffee Rating", () => {
  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

  vi.mock("react-oidc-context", () => ({
    useAuth: vi.fn(),
  }));

  vi.mock("../CoffeeCard/useLoadImage", () => ({
    default: vi.fn().mockReturnValue(["", vi.fn()]),
  }));

  const mockStore = configureStore();

  const initialState = {
    user: {
      userRole: "Admin",
    },
  };

  it("Should render skeleton when loading", async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <CoffeeCard
          coffee={{
            _id: "test-id",
            name: "test-name",
            owner_id: "1",
            owner_name: "joe",
            rating_average: 4.5,
            rating_count: 3,
          }}
        />
      </Provider>,
    );

    expect(await screen.findByTestId("coffee-skeleton")).toBeInTheDocument();
    expect(screen.queryByText("test-name")).not.toBeInTheDocument();
  });
});
