import { expect, vi, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Router from "./Router";
import { routerConfig } from "./RouterConfig";
import { RouterProvider, createMemoryRouter } from "react-router";
import { User } from "oidc-client-ts";
import { AuthContextProps, useAuth } from "react-oidc-context";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

describe("Router", () => {
  vi.mock("react-oidc-context", () => ({
    useAuth: vi.fn(),
  }));

  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

  vi.mock("react-redux", async (importOriginal) => {
    const actual = await importOriginal<typeof import("react-oidc-context")>();
    return {
      ...actual,
      useDispatch: vi.fn(),
    };
  });

  vi.mocked(useAuth).mockReturnValue({
    user: { profile: {} } as User,
    isLoading: false,
  } as AuthContextProps);

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

  it("Should render Router", () => {
    render(<Router />);
  });

  it("Should render Router", () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ["/home"],
    });

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    expect(screen.getByText("Hello Home")).toBeInTheDocument();
    expect(screen.getByText("Hello Home")).toBeInTheDocument();
  });

  it("Should render Feed", () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ["/feed"],
    });

    vi.mock("./Home/Board/Board", () => ({
      default: () => <div>Hello Feed</div>,
    }));

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    expect(screen.queryByText("Hello Home")).not.toBeInTheDocument();
    expect(screen.queryByText("Hello Feed")).toBeInTheDocument();
  });
});
