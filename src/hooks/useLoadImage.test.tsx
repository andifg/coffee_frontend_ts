import { expect, vi, it, describe, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useLoadImageURL from "./useLoadImage";

import { AuthContextProps, useAuth } from "react-oidc-context";
import { User } from "oidc-client-ts";
import { createDataURL } from "../utils/FileReader";

describe("useLoadImageURL", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  vi.mock("react-oidc-context", () => ({
    useAuth: vi.fn(),
  }));

  vi.mock("../utils/FileReader", () => ({
    createDataURL: vi.fn(),
  }));

  it("Image URL should be empty string at the moment", async () => {
    const { result } = renderHook(() => useLoadImageURL("testurl"));

    expect(result.current[0]).toBe("");
  });

  it("Should load image via fetch", async () => {
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

    fetchMock.mockResolvedValueOnce(
      Promise.resolve({
        ok: true,
        blob: () => Promise.resolve("testblob"),
        status: 200,
      }),
    );

    vi.mocked(createDataURL).mockResolvedValueOnce("testurl");

    const { result } = renderHook(() => useLoadImageURL("testurl"));

    await result.current[1]();

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3000/api/v1/coffees/testurl/image",
      {
        headers: {
          Authorization: "Bearer testtoken",
          Accept: "image/jpeg",
        },
        method: "GET",
      },
    );

    await waitFor(() => {
      expect(result.current[0]).toBe("testurl");
    });
  });

  it("Should update coffee image and with newly created url ", async () => {
    const { result } = renderHook(() => useLoadImageURL("testurl"));

    vi.mocked(createDataURL).mockResolvedValueOnce("newtesturl");

    const fileMock = new File(["file content"], "file.txt", {
      type: "text/plain",
    });

    result.current[2](fileMock);

    await waitFor(() => {
      expect(result.current[0]).toBe("newtesturl");
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

    const { result } = renderHook(() => useLoadImageURL("testurl"));

    await result.current[1]();

    expect(removeUserMock).toHaveBeenCalled();

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

    const { result } = renderHook(() => useLoadImageURL("testurl"));

    await expect(result.current[1]()).rejects.toThrow(
      "Unexpected response status: 403",
    );
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

    const { result } = renderHook(() => useLoadImageURL("testurl"));

    await expect(result.current[1]()).rejects.toThrow(
      "An error occurred during image fetch",
    );
  });
});
