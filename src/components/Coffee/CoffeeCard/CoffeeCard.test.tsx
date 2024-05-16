import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import { CoffeeCard } from "./CoffeeCard";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import useLoadImageURL from "./useLoadImage";

describe("Coffee Card", () => {
  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

  vi.mock("react-oidc-context", () => ({
    useAuth: vi.fn(),
  }));

  vi.mock("./useLoadImage", () => ({
    default: vi.fn(),
  }));

  vi.spyOn(React, "useState").mockImplementationOnce(() => [false, vi.fn()]);

  const mockStore = configureStore();

  const initialState = {
    user: {
      userRole: "Admin",
    },
  };

  it("should render successfully when loading equals false", async () => {
    vi.mocked(useLoadImageURL).mockReturnValue(["test-url", vi.fn()]);

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

    expect(screen.getByText("test-name")).toBeInTheDocument();
    expect(screen.getByText("3 ratings")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("joe")).toBeInTheDocument();
  });
});
