import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import Coffee from "./Coffee";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { useCoffeeData } from "../../../hooks/useCoffeeData";

describe("Coffee Rating", () => {
  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

  vi.mock("react-oidc-context", () => ({
    useAuth: vi.fn(),
  }));

  const mockStore = configureStore();

  const initialState = {
    user: {
      userRole: "Admin",
    },
  };

  vi.mock("../../../hooks/useCoffeeData", () => ({
    useCoffeeData: vi.fn(),
  }));

  vi.mocked(useCoffeeData).mockReturnValue([
    {
      _id: "test-id",
      name: "test-name",
    },
    true,
    "test-url",
    {
      coffee_id: "test-id",
      rating_average: 3,
      rating_count: 4,
    },
    vi.fn(),
    vi.fn(),
  ]);

  it("Should render skeleton when loading", async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <Coffee coffee_id="test-id" reload={4} childrenLoaded={vi.fn()} />
      </Provider>,
    );

    expect(await screen.findByTestId("coffee-skeleton")).toBeInTheDocument();
    expect(screen.queryByText("test-name")).not.toBeInTheDocument();
  });
});
