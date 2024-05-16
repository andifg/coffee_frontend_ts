import { expect, vi, it, describe, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useLoadImageURL from "./useLoadImage";

import { AuthContextProps, useAuth } from "react-oidc-context";
import { User } from "oidc-client-ts";
import { createDataURL } from "../../../utils/FileReader";

describe("useLoadImageURL", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  vi.mock("react-oidc-context", () => ({
    useAuth: vi.fn(),
  }));

  vi.mock("../../../utils/FileReader", () => ({
    createDataURL: vi.fn(),
  }));

  it("Image URL should be empty string at the moment", async () => {
    const setLoadingMock = vi.fn();

    const { result } = renderHook(() =>
      useLoadImageURL("test-id", setLoadingMock),
    );

    expect(result.current[0]).toBe("");
  });

  it("Should load image via fetch when coffee-id changes", async () => {
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
        props: { coffee_id: string; setLoading: () => void } = {
          coffee_id: "1",
          setLoading: setLoadingMock,
        },
      ) => useLoadImageURL(props.coffee_id, props.setLoading),
      { initialProps: { coffee_id: "test-id", setLoading: setLoadingMock } },
    );

    await waitFor(() => {
      expect(result.current[0]).toBe("testurl");
    });

    rerender({ coffee_id: "new-test-id", setLoading: setLoadingMock }),
      await waitFor(() => {
        expect(result.current[0]).toBe("new-testurl");
      });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    await waitFor(() => {
      expect(fetchMock.mock.calls).toEqual([
        [
          "http://localhost:3000/api/v1/coffees/test-id/image",
          {
            method: "GET",
            headers: {
              Accept: "image/jpeg",
              Authorization: "Bearer testtoken",
            },
          },
        ],
        [
          "http://localhost:3000/api/v1/coffees/new-test-id/image",
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
      useLoadImageURL("test-id", setLoadingMock),
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
      useLoadImageURL("test-id", setLoadingMock),
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
      useLoadImageURL("test-id", setLoadingMock),
    );

    await waitFor(() => {
      expect(result.current[0]).toBe("");
    });
  });
});
