import { expect, vi, it, describe, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useLoadImageUrl } from "./useLoadImageUrl";

import { AuthContextProps, useAuth } from "react-oidc-context";
import { User } from "oidc-client-ts";
import { createDataURL } from "../../utils/FileReader";

describe("useLoadImageUrl", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  vi.mock("react-oidc-context", () => ({
    useAuth: vi.fn(),
  }));

  vi.mock("../../utils/FileReader", () => ({
    createDataURL: vi.fn(),
  }));

  it("Image URL should be empty string at the moment", async () => {
    const setLoadingMock = vi.fn();

    const { result } = renderHook(() =>
      useLoadImageUrl("test-id", setLoadingMock, true),
    );

    expect(result.current[0]).toBe("");
  });

  it("Should load image via fetch when intial load is true", async () => {
    Object.defineProperty(window, "env", {
      value: {
        BACKEND_URL: "http://localhost:3000",
      },
      writable: true,
    });

    vi.mocked(useAuth).mockReturnValue({
      user: {
        access_token: "testtoken",
      } as User,
      isLoading: false,
    } as AuthContextProps);

    const fetchMock = vi.fn();

    vi.stubGlobal("fetch", fetchMock);

    fetchMock.mockResolvedValue(
      Promise.resolve({
        ok: true,
        blob: () => Promise.resolve("testblob"),
        status: 200,
      }),
    );

    vi.mocked(createDataURL)
      .mockResolvedValueOnce("testurl")
      .mockResolvedValueOnce("new-testurl");

    const setLoadingMock = vi.fn();
    const { result, rerender } = renderHook(
      (
        props: {
          backendPath: string;
          setLoading: () => void;
          initialLoad: boolean;
        } = {
          backendPath: "/api/v1/image/1",
          setLoading: setLoadingMock,
          initialLoad: true,
        },
      ) =>
        useLoadImageUrl(props.backendPath, props.setLoading, props.initialLoad),
      {
        initialProps: {
          backendPath: "/api/v1/image/1",
          setLoading: setLoadingMock,
          initialLoad: true,
        },
      },
    );

    await waitFor(() => {
      expect(result.current[0]).toBe("testurl");
    });

    rerender({
      backendPath: "/api/v1/image/2",
      setLoading: setLoadingMock,
      initialLoad: true,
    }),
      await waitFor(() => {
        expect(result.current[0]).toBe("new-testurl");
      });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    await waitFor(() => {
      expect(fetchMock.mock.calls).toEqual([
        [
          "http://localhost:3000/api/v1/image/1",
          {
            method: "GET",
            headers: {
              Accept: "image/jpeg",
              Authorization: "Bearer testtoken",
            },
          },
        ],
        [
          "http://localhost:3000/api/v1/image/2",
          {
            method: "GET",
            headers: {
              Accept: "image/jpeg",
              Authorization: "Bearer testtoken",
            },
          },
        ],
      ]);
    });
  });

  it("Should load image via fetch method", async () => {
    Object.defineProperty(window, "env", {
      value: {
        BACKEND_URL: "http://localhost:3000",
      },
      writable: true,
    });

    vi.mocked(useAuth).mockReturnValue({
      user: {
        access_token: "testtoken",
      } as User,
      isLoading: false,
    } as AuthContextProps);

    const fetchMock = vi.fn();

    vi.stubGlobal("fetch", fetchMock);

    fetchMock.mockResolvedValue(
      Promise.resolve({
        ok: true,
        blob: () => Promise.resolve("testblob"),
        status: 200,
      }),
    );

    vi.mocked(createDataURL)
      .mockResolvedValueOnce("testurl")
      .mockResolvedValueOnce("new-testurl");

    const setLoadingMock = vi.fn();

    const { result } = renderHook(() =>
      useLoadImageUrl("/api/image/4", setLoadingMock, false),
    );

    await result.current[1]();

    await waitFor(() => {
      expect(result.current[0]).toBe("testurl");
    });

    await result.current[1]();

    await waitFor(() => {
      expect(result.current[0]).toBe("new-testurl");
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    await waitFor(() => {
      expect(fetchMock.mock.calls).toEqual([
        [
          "http://localhost:3000/api/image/4",
          {
            method: "GET",
            headers: {
              Accept: "image/jpeg",
              Authorization: "Bearer testtoken",
            },
          },
        ],
        [
          "http://localhost:3000/api/image/4",
          {
            method: "GET",
            headers: {
              Accept: "image/jpeg",
              Authorization: "Bearer testtoken",
            },
          },
        ],
      ]);
    });
  });

  it("Should remove user if unauthorized", async () => {
    const removeUserMock = vi.fn();

    const partialMock: Partial<AuthContextProps> = {
      user: {
        access_token: "unauthorizedtoken",
      } as User,
      isLoading: false,
      removeUser: removeUserMock,
    };

    vi.mocked(useAuth).mockReturnValue(partialMock as AuthContextProps);

    const fetchMock = vi.fn();

    vi.stubGlobal("fetch", fetchMock);

    fetchMock.mockResolvedValueOnce(
      Promise.resolve({
        ok: false,
        status: 401,
      }),
    );

    const setLoadingMock = vi.fn();

    const { result } = renderHook(() =>
      useLoadImageUrl("test-id", setLoadingMock, true),
    );

    await waitFor(() => {
      expect(removeUserMock).toHaveBeenCalled();
    });

    expect(result.current[0]).toBe("");
  });

  it("Should handle other status erros", async () => {
    const removeUserMock = vi.fn();

    const partialMock: Partial<AuthContextProps> = {
      user: {
        access_token: "unauthorizedtoken",
      } as User,
      isLoading: false,
      removeUser: removeUserMock,
    };

    vi.mocked(useAuth).mockReturnValue(partialMock as AuthContextProps);

    const fetchMock = vi.fn();

    vi.stubGlobal("fetch", fetchMock);

    fetchMock.mockResolvedValueOnce(
      Promise.resolve({
        ok: false,
        status: 403,
      }),
    );
    const setLoadingMock = vi.fn();

    const { result } = renderHook(() =>
      useLoadImageUrl("test-id", setLoadingMock, true),
    );

    await waitFor(() => {
      expect(result.current[0]).toBe("");
    });
  });

  it("Handle error during fetch", async () => {
    const removeUserMock = vi.fn();

    const partialMock: Partial<AuthContextProps> = {
      user: {
        access_token: "unauthorizedtoken",
      } as User,
      isLoading: false,
      removeUser: removeUserMock,
    };

    vi.mocked(useAuth).mockReturnValue(partialMock as AuthContextProps);

    const fetchMock = vi.fn();

    vi.stubGlobal("fetch", fetchMock);

    fetchMock.mockResolvedValueOnce(Promise.reject("Error during fetch"));

    const setLoadingMock = vi.fn();

    const { result } = renderHook(() =>
      useLoadImageUrl("test-id", setLoadingMock, true),
    );

    await waitFor(() => {
      expect(result.current[0]).toBe("");
    });
  });
});
