import { describe, it, expect, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import Coffee from "../Coffee";
import userEvent from "@testing-library/user-event";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { useCoffeeData } from "../../../../hooks/useCoffeeData";
import { useUpdateCoffeeData } from "../../../../hooks/useUpdateCoffeeData";
import { ApiError } from "../../../../client";

describe("Edit Coffee Modal", () => {
  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

  vi.mock("react-oidc-context", () => ({
    useAuth: vi.fn(),
  }));

  const mockStore = configureStore();

  const initialState = {
    user: {
      username: "kcowan",
      givenName: "Kristofer",
      familyName: "Cowan",
      userId: "018ef1bb-c943-7253-bdc5-dd653b1b0f0e",
      userRole: "Admin",
    },
  };

  vi.mock("../../../../hooks/useCoffeeData", () => ({
    useCoffeeData: vi.fn(),
  }));

  vi.mock("../../../../hooks/useUpdateCoffeeData", () => ({
    useUpdateCoffeeData: vi.fn(),
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

  const updateCoffeeNameMock = vi.fn();
  const uploadImageMock = vi.fn();

  vi.mocked(useUpdateCoffeeData).mockReturnValue([
    updateCoffeeNameMock,
    uploadImageMock,
  ]);

  it("should open and close edit modal when edit button is clicked", async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <Coffee coffee_id="test-id" reload={4} childrenLoaded={vi.fn()} />
      </Provider>,
    );

    const drawerRoot = screen.getByTestId("swipeable-drawer-paper");
    const editCoffee = screen.getByTestId("Edit Coffee");

    //Open more menu
    userEvent.click(await screen.findByTestId("more-menu-button"));

    // Wait till more menu is open
    await waitFor(() => {
      // Check that the style is NOT present
      expect(drawerRoot).not.toHaveStyle({
        visibility: "hidden",
        transform: "translateY(768px)",
      });
    });

    // Click edit coffee
    await userEvent.click(editCoffee);

    // Wait till edit coffee modal is open
    expect(await screen.findByText("Edit test-name")).toBeInTheDocument();

    // Click cancel to close it
    await userEvent.click(await screen.findByText("Cancel"));

    // Wait till edit coffee modal is closed
    await waitFor(() => {
      expect(screen.queryByText("Edit test-name")).not.toBeInTheDocument();
    });
  });

  it("Should call useUpdateCoffeeData when edit coffee is submitted", async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <Coffee coffee_id="test-id" reload={4} childrenLoaded={vi.fn()} />
      </Provider>,
    );

    //Open more menu
    userEvent.click(await screen.findByTestId("more-menu-button"));

    const editCoffee = screen.getByTestId("Edit Coffee");

    const drawerRoot = screen.getByTestId("swipeable-drawer-paper");

    await waitFor(() => {
      // Check that the style is NOT present
      expect(drawerRoot).not.toHaveStyle({
        visibility: "hidden",
        transform: "translateY(768px)",
      });
    });

    // Click edit coffee
    await userEvent.click(editCoffee);

    expect(await screen.findByText("Edit test-name")).toBeInTheDocument();

    // Submit edit coffee
    const submit = screen.getByText("Send");

    await userEvent.click(submit);

    expect(updateCoffeeNameMock).toHaveBeenLastCalledWith(
      "test-name",
      "018ef1bb-c943-7253-bdc5-dd653b1b0f0e",
      "kcowan",
    );

    expect(uploadImageMock).not.toHaveBeenCalled();
  });

  it("Should show error when api calls fail", async () => {
    updateCoffeeNameMock.mockImplementation(() => {
      throw new ApiError(
        { method: "GET", url: "mockurl" },
        {
          url: "mockurl",
          ok: true,
          status: 404,
          statusText: "Not Found",
          body: { detail: "Mock Error" },
        },
        "Error during post",
      );
    });

    render(
      <Provider store={mockStore(initialState)}>
        <Coffee coffee_id="test-id" reload={4} childrenLoaded={vi.fn()} />
      </Provider>,
    );

    //Open more menu
    userEvent.click(await screen.findByTestId("more-menu-button"));

    const editCoffee = screen.getByTestId("Edit Coffee");

    const drawerRoot = screen.getByTestId("swipeable-drawer-paper");

    await waitFor(() => {
      // Check that the style is NOT present
      expect(drawerRoot).not.toHaveStyle({
        visibility: "hidden",
        transform: "translateY(768px)",
      });
    });

    // Click edit coffee
    await userEvent.click(editCoffee);

    // Submit edit coffee
    const submit = screen.getByText("Send");

    await userEvent.click(submit);

    expect(await screen.findByText("Mock Error")).toBeInTheDocument();
  });
});
