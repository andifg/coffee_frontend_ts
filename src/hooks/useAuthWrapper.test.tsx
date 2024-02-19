import { renderHook } from "@testing-library/react";
import useAuthWrapper from "./useAuthWrapper";
import { vi, expect, it, describe, beforeEach } from "vitest";
import { useDispatch } from "react-redux";
import { useAuth, AuthContextProps } from "react-oidc-context";
import { User } from "oidc-client-ts";
import { OpenAPI } from "../client";
import { ApiRequestOptions } from "../client/core/ApiRequestOptions";

describe("useAuthWrapper", () => {
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        pathname: "/testing",
        href: "/testing",
      },
    });
  });

  vi.mock("react-oidc-context", () => ({
    useAuth: vi.fn(),
  }));

  vi.mock("react-redux", () => ({
    useDispatch: vi.fn(),
  }));

  it("should render", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        profile: { name: "Testuser", given_name: "Given Testname" },
      } as User,
      isLoading: true,
    } as AuthContextProps);

    const dispatchMock = vi.fn();

    vi.mocked(useDispatch).mockReturnValue(dispatchMock);

    renderHook(() => useAuthWrapper());

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "User/setUserName",
      payload: "Testuser",
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "User/setGivenName",
      payload: "Given Testname",
    });
  });

  it("should redirect to login page", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isLoading: false,
    } as AuthContextProps);

    renderHook(() => useAuthWrapper());

    expect(window.location.href).toBe("/");
  });

  it("should not redirect to login page", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isLoading: true,
    } as AuthContextProps);

    renderHook(() => useAuthWrapper());

    expect(window.location.href).toBe("/testing");
  });

  it("Should set OpenAPI token", async () => {
    // Should return access token if attached
    vi.mocked(useAuth).mockReturnValue({
      user: {
        profile: { name: "Testuser", given_name: "Given Testname" },
        access_token: "TestToken",
      } as User,
      isLoading: false,
    } as AuthContextProps);

    const { rerender } = renderHook(() => useAuthWrapper());

    if (OpenAPI.TOKEN === undefined) {
      throw new Error("OpenAPI.TOKEN is undefined");
    }

    if (typeof OpenAPI.TOKEN !== "function") {
      throw new Error("OpenAPI.TOKEN is not a function");
    }

    expect(await OpenAPI.TOKEN({} as ApiRequestOptions)).toBe("TestToken");

    // Should return empty string if no access token attached
    vi.mocked(useAuth).mockReturnValue({
      user: {
        profile: { name: "Testuser", given_name: "Given Testname" },
      } as User,
      isLoading: false,
    } as AuthContextProps);

    rerender();

    expect(await OpenAPI.TOKEN({} as ApiRequestOptions)).toBe("");
  });
});
