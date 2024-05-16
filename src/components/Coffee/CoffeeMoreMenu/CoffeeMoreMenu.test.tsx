import { describe, it, expect, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import { CoffeeCard } from "../CoffeeCard/CoffeeCard";
import userEvent from "@testing-library/user-event";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createDataURL } from "../../../utils/FileReader";
import { useAuth, AuthContextProps } from "react-oidc-context";
import { User } from "oidc-client-ts";
import useEditCoffeeDecider from "./useEditCoffeeDecider";

describe("More Button", () => {
  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

  vi.mock("react-oidc-context", () => ({
    useAuth: vi.fn(),
  }));

  vi.mock("@mui/material/useMediaQuery", () => ({
    default: vi.fn(),
  }));

  vi.mock("../../../utils/FileReader", () => ({
    createDataURL: vi.fn(),
  }));

  vi.mock("./useEditCoffeeDecider", () => ({
    default: vi.fn(),
  }));

  const mockStore = configureStore();

  const initialState = {
    user: {
      userRole: "Admin",
      owner_id: "test-owner-id",
    },
  };

  Object.defineProperty(window, "env", {
    value: {
      BACKEND_URL: "http://localhost:3000",
    },
    writable: true,
  });

  const fetchMock = vi.fn();

  vi.stubGlobal("fetch", fetchMock);

  // Mock image fetch to set loading to false
  fetchMock.mockResolvedValue(
    Promise.resolve({
      ok: true,
      blob: () => Promise.resolve("testblob"),
      status: 200,
    }),
  );

  vi.mocked(createDataURL).mockResolvedValue("testurl");

  vi.mocked(useAuth).mockReturnValue({
    user: {
      profile: {
        given_name: "Peter",
        family_name: "Logan",
        preferred_username: "plogan",
        sub: "018ef26d-ee98-77b0-b698-301809c2d394",
      },
      access_token:
        "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ6dW9yakxGX3pvTEdCeXctN1ZrRkVXbEVTRHJkYmlLb1FqVlZCTkI2TnNVIn0.eyJleHAiOjE3MTM0NjUxNjksImlhdCI6MTcxMzQ2NDg2OSwiYXV0aF90aW1lIjoxNzEzNDU3NDAzLCJqdGkiOiI1YzhiYTZhMS1jNTNhLTQxNzUtOGJjNS00OTY5NDJmYjgwZTEiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL0NvZmZlZS1BcHAiLCJhdWQiOlsicmVhY3QtYXBwIiwiYWNjb3VudCJdLCJzdWIiOiI4NGFiZmJmYS1mYzliLTQxOWItYWJiNS1iZjk3OTVmYjAwYzgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWFjdC1hcHAiLCJzZXNzaW9uX3N0YXRlIjoiMjg1MzBkMzgtZTY0YS00MWE1LTllMjYtYzI5MjY0ZjI5ZDE0IiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjUxNzMiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtY29mZmVlLWFwcCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJBZG1pbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgcmVhY3QtYXBwLWF1ZGllbmNlIGVtYWlsIHJvbGVzIGFkZHJlc3MiLCJzaWQiOiIyODUzMGQzOC1lNjRhLTQxYTUtOWUyNi1jMjkyNjRmMjlkMTQiLCJhZGRyZXNzIjp7fSwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJUZWRkeSAgTGVvbiIsInByZWZlcnJlZF91c2VybmFtZSI6InRsZW9uIiwibG9jYWxlIjoiZW4iLCJnaXZlbl9uYW1lIjoiVGVkZHkiLCJmYW1pbHlfbmFtZSI6IiBMZW9uIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.hUWQwrhULroUURIm_CSu8EkWU89sweUrc-upcqhpK_71pnqz14_IJ4JkgD85BtKr1fUfT2WoQqJw5dfii3ZfhdOFgFbWgWRdjFXdbyVxEcaHVxELUb1fpM8E4zH5GvjXP3f6Sq2ah_mXnGqW4kHmO_BdXVPGA8qz2K98Y7rD97Bs3ZOzov50n9ZCZvT4gax4hVj-FVvCMWPRxVRrYgdu0gfSvVmDfgeEAS1X6vHowkSzXmxzES2fHoG45CZU8MDxgZpQLDqbSKPxF2hkW5fUy1_OSyLMX88-sLkKsFR7vqTnSdn4IDx1tlA1O24K-6ozfJv91j6Y_qZdgXC3EPgweQ",
    } as User,
    isLoading: true,
  } as AuthContextProps);

  it("should open and close edit modal when edit button is clicked", async () => {
    vi.mocked(useMediaQuery).mockReturnValue(false);
    vi.mocked(useEditCoffeeDecider).mockReturnValue([true]);

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

    const drawerRoot = await screen.findByTestId("swipeable-drawer-paper");

    // Open more menu
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
    vi.mocked(useEditCoffeeDecider).mockReturnValue([true]);

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

    const moreMenu = await screen.findByTestId("more-menu-button");

    await userEvent.click(moreMenu);

    await waitFor(() => {
      expect(screen.getByRole("menu")).toHaveClass(
        "MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list",
      );
    });
  });

  it("Should not render edit and delete button if user is not allowed to edit", async () => {
    vi.mocked(useEditCoffeeDecider).mockReturnValue([false]);

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

    await userEvent.click(await screen.findByTestId("more-menu-button"));

    await waitFor(() => {
      expect(screen.queryByTestId("Edit Coffee")).toBeNull();
      expect(screen.queryByTestId("Delete Coffee")).toBeNull();
    });
  });
});
