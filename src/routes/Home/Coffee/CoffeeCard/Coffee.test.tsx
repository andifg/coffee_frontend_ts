import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import Coffee from "./Coffee";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { useCoffeeData } from "../../../../hooks/useCoffeeData";

describe("Coffee Route", () => {
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

  vi.mock("../../../../hooks/useCoffeeData", () => ({
    useCoffeeData: vi.fn(),
  }));

  it("should render successfully", async () => {
    vi.mocked(useCoffeeData).mockReturnValue([
      {
        _id: "test-id",
        name: "test-name",
        owner_id: "test-owner-id",
        owner_name: "test-owner-name",
      },
      false,
      "test-url",
      {
        coffee_id: "test-id",
        rating_average: 3,
        rating_count: 4,
      },
      vi.fn(),
      vi.fn(),
    ]);

    render(
      <Provider store={mockStore(initialState)}>
        <Coffee coffee_id="test-id" reload={4} childrenLoaded={vi.fn()} />
      </Provider>,
    );

    expect(await screen.findByText("test-name")).toBeInTheDocument();

    expect(await screen.findByText("3")).toBeInTheDocument();
    expect(await screen.findByText("4 ratings")).toBeInTheDocument();
    expect(await screen.findByText("test-owner-name")).toBeInTheDocument();
  });
});
