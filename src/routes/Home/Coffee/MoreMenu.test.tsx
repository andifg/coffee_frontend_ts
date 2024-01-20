import { describe, it, expect, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import Coffee from "./Coffee";
import userEvent from "@testing-library/user-event";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { useCoffeeData } from "../../../hooks/useCoffeeData";
import useMediaQuery from "@mui/material/useMediaQuery";

describe("More Button", () => {
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

  vi.mock("@mui/material/useMediaQuery", () => ({
    default: vi.fn(),
  }));

  vi.mocked(useCoffeeData).mockReturnValue([
    {
      _id: "test-id",
      name: "test-name",
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

  it("should open and close edit modal when edit button is clicked", async () => {
    vi.mocked(useMediaQuery).mockReturnValue(false);

    render(
      <Provider store={mockStore(initialState)}>
        <Coffee coffee_id="test-id" reload={4} childrenLoaded={vi.fn()} />
      </Provider>,
    );

    const drawerRoot = screen.getByTestId("swipeable-drawer-paper");

    userEvent.click(await screen.findByTestId("more-menu-button"));

    await waitFor(() => {
      // Check that the style is NOT present
      expect(drawerRoot).not.toHaveStyle({
        visibility: "hidden",
        transform: "translateY(768px)",
      });
    });

    userEvent.click(await screen.findByTestId("more-menu-button"));

    await waitFor(() => {
      // Check that the style is present
      expect(drawerRoot).toHaveStyle({
        visibility: "hidden",
        transform: "translateY(NaNpx)",
      });
    });
  });

  it("Should render different on mobile", async () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);

    render(
      <Provider store={mockStore(initialState)}>
        <Coffee coffee_id="test-id" reload={4} childrenLoaded={vi.fn()} />
      </Provider>,
    );

    await userEvent.click(screen.getByTestId("more-menu-button"));

    await waitFor(() => {
      expect(screen.getByRole("menu")).toHaveClass(
        "MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list",
      );
    });
  });
});
