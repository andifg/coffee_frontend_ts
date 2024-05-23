import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import { CoffeeCard } from "../CoffeeCard/CoffeeCard";
import userEvent from "@testing-library/user-event";
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

  beforeEach(() => {
    vi.spyOn(React, "useState").mockImplementationOnce(() => [false, vi.fn()]);
  });

  const mockStore = configureStore();

  const initialState = {
    user: {
      userRole: "Admin",
    },
  };

  it("should render successfully", async () => {
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

    await waitFor(() => {
      expect(screen.getByText("4.5")).toBeInTheDocument();
      expect(screen.getByText("3 ratings")).toBeInTheDocument();
    });
  });

  it("Should toggle visability on add icon button click", async () => {
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

    await waitFor(() => {
      expect(screen.getByText("4.5")).toBeInTheDocument();
      expect(screen.getByText("3 ratings")).toBeInTheDocument();
    });

    await userEvent.click(await screen.findByText("Add Rating"));

    await userEvent.click(
      await screen.findByTestId("coffee-rating-close-button"),
    );

    await waitFor(() => {
      expect(screen.queryByTestId("AddIcon")).not.toBeInTheDocument();
    });
  });
});
