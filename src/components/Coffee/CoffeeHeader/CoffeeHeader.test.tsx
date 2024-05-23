import { describe, expect, it, vi } from "vitest";

import { render, screen } from "@testing-library/react";

import CoffeeHeader from "./CoffeeHeader";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

describe("CoffeeHeader", () => {
  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

  const initialState = {
    user: {
      userRole: "Admin",
      givenName: "John",
    },
    coffeeIds: {
      coffeeIds: ["1"],
    },
    generalConfig: {
      recursiveLoading: false,
      realoadCount: 0,
    },
  };

  const mockStore = configureStore();
  const store = mockStore(initialState);

  it("should render successfully", () => {
    render(
      <Provider store={store}>
        <CoffeeHeader
          coffee={{
            _id: "1",
            name: "Mocha",
            owner_id: "1",
            owner_name: "MFitzgerald",
          }}
          coffee_owner_name="MFitzgerald"
          toggleShowEditCoffeeModal={() => {}}
          toggleMoreMenuVisibility={() => {}}
          showMoreMenu={false}
        />
      </Provider>,
    );

    expect(screen.getByText("MFitzgerald")).toBeInTheDocument();
    expect(screen.getByText("M")).toBeInTheDocument();
    expect(screen.getByTestId("more-menu-button")).toBeInTheDocument();
  });
});
