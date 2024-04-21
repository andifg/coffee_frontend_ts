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

    const dispatchMock = vi.fn();

    vi.mocked(useDispatch).mockReturnValue(dispatchMock);

    renderHook(() => useAuthWrapper());

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "User/setUserName",
      payload: "plogan",
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "User/setGivenName",
      payload: "Peter",
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "User/setFamilyName",
      payload: "Logan",
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "User/setUserId",
      payload: "018ef26d-ee98-77b0-b698-301809c2d394",
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "User/setUserRole",
      payload: "Admin",
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
        access_token:
          "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ6dW9yakxGX3pvTEdCeXctN1ZrRkVXbEVTRHJkYmlLb1FqVlZCTkI2TnNVIn0.eyJleHAiOjE3MTM0NjUxNjksImlhdCI6MTcxMzQ2NDg2OSwiYXV0aF90aW1lIjoxNzEzNDU3NDAzLCJqdGkiOiI1YzhiYTZhMS1jNTNhLTQxNzUtOGJjNS00OTY5NDJmYjgwZTEiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL0NvZmZlZS1BcHAiLCJhdWQiOlsicmVhY3QtYXBwIiwiYWNjb3VudCJdLCJzdWIiOiI4NGFiZmJmYS1mYzliLTQxOWItYWJiNS1iZjk3OTVmYjAwYzgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWFjdC1hcHAiLCJzZXNzaW9uX3N0YXRlIjoiMjg1MzBkMzgtZTY0YS00MWE1LTllMjYtYzI5MjY0ZjI5ZDE0IiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjUxNzMiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtY29mZmVlLWFwcCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJBZG1pbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgcmVhY3QtYXBwLWF1ZGllbmNlIGVtYWlsIHJvbGVzIGFkZHJlc3MiLCJzaWQiOiIyODUzMGQzOC1lNjRhLTQxYTUtOWUyNi1jMjkyNjRmMjlkMTQiLCJhZGRyZXNzIjp7fSwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJUZWRkeSAgTGVvbiIsInByZWZlcnJlZF91c2VybmFtZSI6InRsZW9uIiwibG9jYWxlIjoiZW4iLCJnaXZlbl9uYW1lIjoiVGVkZHkiLCJmYW1pbHlfbmFtZSI6IiBMZW9uIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.hUWQwrhULroUURIm_CSu8EkWU89sweUrc-upcqhpK_71pnqz14_IJ4JkgD85BtKr1fUfT2WoQqJw5dfii3ZfhdOFgFbWgWRdjFXdbyVxEcaHVxELUb1fpM8E4zH5GvjXP3f6Sq2ah_mXnGqW4kHmO_BdXVPGA8qz2K98Y7rD97Bs3ZOzov50n9ZCZvT4gax4hVj-FVvCMWPRxVRrYgdu0gfSvVmDfgeEAS1X6vHowkSzXmxzES2fHoG45CZU8MDxgZpQLDqbSKPxF2hkW5fUy1_OSyLMX88-sLkKsFR7vqTnSdn4IDx1tlA1O24K-6ozfJv91j6Y_qZdgXC3EPgweQ",
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

    expect(await OpenAPI.TOKEN({} as ApiRequestOptions)).toBe(
      "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ6dW9yakxGX3pvTEdCeXctN1ZrRkVXbEVTRHJkYmlLb1FqVlZCTkI2TnNVIn0.eyJleHAiOjE3MTM0NjUxNjksImlhdCI6MTcxMzQ2NDg2OSwiYXV0aF90aW1lIjoxNzEzNDU3NDAzLCJqdGkiOiI1YzhiYTZhMS1jNTNhLTQxNzUtOGJjNS00OTY5NDJmYjgwZTEiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL0NvZmZlZS1BcHAiLCJhdWQiOlsicmVhY3QtYXBwIiwiYWNjb3VudCJdLCJzdWIiOiI4NGFiZmJmYS1mYzliLTQxOWItYWJiNS1iZjk3OTVmYjAwYzgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWFjdC1hcHAiLCJzZXNzaW9uX3N0YXRlIjoiMjg1MzBkMzgtZTY0YS00MWE1LTllMjYtYzI5MjY0ZjI5ZDE0IiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjUxNzMiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtY29mZmVlLWFwcCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJBZG1pbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgcmVhY3QtYXBwLWF1ZGllbmNlIGVtYWlsIHJvbGVzIGFkZHJlc3MiLCJzaWQiOiIyODUzMGQzOC1lNjRhLTQxYTUtOWUyNi1jMjkyNjRmMjlkMTQiLCJhZGRyZXNzIjp7fSwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJUZWRkeSAgTGVvbiIsInByZWZlcnJlZF91c2VybmFtZSI6InRsZW9uIiwibG9jYWxlIjoiZW4iLCJnaXZlbl9uYW1lIjoiVGVkZHkiLCJmYW1pbHlfbmFtZSI6IiBMZW9uIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.hUWQwrhULroUURIm_CSu8EkWU89sweUrc-upcqhpK_71pnqz14_IJ4JkgD85BtKr1fUfT2WoQqJw5dfii3ZfhdOFgFbWgWRdjFXdbyVxEcaHVxELUb1fpM8E4zH5GvjXP3f6Sq2ah_mXnGqW4kHmO_BdXVPGA8qz2K98Y7rD97Bs3ZOzov50n9ZCZvT4gax4hVj-FVvCMWPRxVRrYgdu0gfSvVmDfgeEAS1X6vHowkSzXmxzES2fHoG45CZU8MDxgZpQLDqbSKPxF2hkW5fUy1_OSyLMX88-sLkKsFR7vqTnSdn4IDx1tlA1O24K-6ozfJv91j6Y_qZdgXC3EPgweQ",
    );

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
