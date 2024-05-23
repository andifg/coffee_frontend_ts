import { render, screen } from "@testing-library/react";
import { AuthContextProps, AuthProvider, useAuth } from "react-oidc-context";
import PrivateRoute from "./PrivateRoute";
import { describe, it, expect, vi } from "vitest";
import { User } from "oidc-client-ts";

// Mocking the AuthProvider to provide the context for testing
vi.mock("react-oidc-context", () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }: { children: JSX.Element }) => children,
}));

describe("PrivateRoute", () => {
  it("renders children when user is authenticated and not loading", () => {
    // Mocking useAuth to return a user object and isLoading as false

    vi.mocked(useAuth).mockReturnValue({
      user: { profile: {} } as User,
      isLoading: false,
    } as AuthContextProps);

    render(
      <AuthProvider>
        <PrivateRoute>
          <div>Rendered when authenticated</div>
        </PrivateRoute>
      </AuthProvider>,
    );

    expect(screen.getByText("Rendered when authenticated")).toBeInTheDocument();
  });

  it("does not render children when user is not authenticated", () => {
    // Mocking useAuth to return null user and isLoading as false
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isLoading: false,
    } as AuthContextProps);
    render(
      <AuthProvider>
        <PrivateRoute>
          <div>Rendered when authenticated</div>
        </PrivateRoute>
      </AuthProvider>,
    );

    expect(screen.queryByText("Rendered when authenticated")).toBeNull();
  });

  it("does not render children when user is still loading", () => {
    // Mocking useAuth to return null user and isLoading as true

    vi.mocked(useAuth).mockReturnValue({
      user: { profile: {} } as User,
      isLoading: true,
    } as AuthContextProps);

    render(
      <AuthProvider>
        <PrivateRoute>
          <div>Rendered when authenticated</div>
        </PrivateRoute>
      </AuthProvider>,
    );

    expect(screen.queryByText("Rendered when authenticated")).toBeNull();
  });
});
