import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AvatarMenu from "./AvatarMenu";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { useAuth, AuthContextProps } from "react-oidc-context";
import { User } from "oidc-client-ts";

describe("AvatarMenu", () => {
  vi.mock("react-oidc-context", () => ({
    useAuth: vi.fn(),
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

  it("Should render AvatarMenu", () => {
    render(
      <Provider store={store}>
        <AvatarMenu />
      </Provider>,
    );

    expect(screen).toBeTruthy();

    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("Should open and close menu on click", async () => {
    render(
      <Provider store={store}>
        <AvatarMenu />
      </Provider>,
    );

    const button = screen.getByTestId("avatar-menu");

    await userEvent.click(button);

    expect(screen.getByText("Logout")).toBeInTheDocument();

    expect(screen.getByRole("menu")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByText("Logout")).toBeNull();
      expect(screen.queryByRole("menu")).toBeNull();
    });
  });

  it("Should call logout", async () => {
    const removeUserMock = vi.fn();

    const partialMock: Partial<AuthContextProps> = {
      user: {
        access_token: "unauthorizedtoken",
      } as User,
      isLoading: false,
      removeUser: removeUserMock,
    };

    vi.mocked(useAuth).mockReturnValue(partialMock as AuthContextProps);

    render(
      <Provider store={store}>
        <AvatarMenu />
      </Provider>,
    );

    const button = screen.getByTestId("avatar-menu");

    await userEvent.click(button);

    const logout = screen.getByText("Logout");

    await userEvent.click(logout);

    expect(removeUserMock).toHaveBeenCalled();
  });
});
