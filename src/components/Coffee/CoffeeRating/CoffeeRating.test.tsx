import { describe, it, expect, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import Coffee from "../CoffeeCard/CoffeeCard";
import userEvent from "@testing-library/user-event";
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

  it("should render successfully", async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <Coffee coffee_id="test-id" reload={4} childrenLoaded={vi.fn()} />
      </Provider>,
    );

    expect(await screen.findByText("3")).toBeInTheDocument();
    expect(await screen.findByText("4 ratings")).toBeInTheDocument();
  });

  it("Should toggle visability on add icon button click", async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <Coffee coffee_id="test-id" reload={4} childrenLoaded={vi.fn()} />
      </Provider>,
    );

    await userEvent.click(await screen.findByText("Add Rating"));

    expect(await screen.findByTestId("AddIcon")).toBeInTheDocument();

    await userEvent.click(
      await screen.findByTestId("coffee-rating-close-button"),
    );

    await waitFor(() => {
      expect(screen.queryByTestId("AddIcon")).not.toBeInTheDocument();
    });
  });
});
