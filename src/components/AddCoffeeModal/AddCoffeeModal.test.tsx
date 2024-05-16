import { describe, expect, it, vi } from "vitest";
import AddCoffeeModal from "./AddCoffeeModal";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("AddCoffeeModal", () => {
  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

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

  it("should render", () => {
    render(
      <Provider store={store}>
        <AddCoffeeModal currentUUID="123" open={true} closeModal={() => {}} />
      </Provider>,
    );

    expect(screen.getByText("Add Coffee")).toBeInTheDocument();
  });
});
