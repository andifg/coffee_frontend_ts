import { describe, vi, it, expect } from "vitest";
import useClientService from "./useClientService";
import { renderHook } from "@testing-library/react";

import { CancelablePromise, Coffee, CoffeesService } from "../client";
import { AuthContextProps, useAuth } from "react-oidc-context";

import { User } from "oidc-client-ts";

describe("useClientService", async () => {
  vi.mock("../client", () => ({
    CoffeesService: {
      getCoffeeByIdApiV1CoffeesCoffeeIdGet: vi.fn(),
    },
  }));

  vi.mock("react-oidc-context", () => ({
    useAuth: vi.fn(),
  }));

  it("should call client service method and return promise payload", async () => {
    vi.mocked(
      CoffeesService.getCoffeeByIdApiV1CoffeesCoffeeIdGet,
    ).mockReturnValue(
      Promise.resolve({
        _id: "1",
        name: "Test Coffee",
      } as Coffee) as CancelablePromise<Coffee>,
    );

    const hook = renderHook(() => useClientService());

    const callClientServiceMethod = hook.result.current[0];

    const result = await callClientServiceMethod({
      function: CoffeesService.getCoffeeByIdApiV1CoffeesCoffeeIdGet,
      args: ["1"],
    });

    expect(result).toEqual({
      _id: "1",
      name: "Test Coffee",
    });
  });

  it("Return undefined response if error should not be rethrown", async () => {
    vi.mocked(
      CoffeesService.getCoffeeByIdApiV1CoffeesCoffeeIdGet,
    ).mockReturnValue(Promise.reject() as CancelablePromise<Coffee>);

    const hook = renderHook(() => useClientService());

    const callClientServiceMethod = hook.result.current[0];

    const result = await callClientServiceMethod({
      function: CoffeesService.getCoffeeByIdApiV1CoffeesCoffeeIdGet,
      rethrowError: false,
      args: ["1"],
    });

    expect(result).toBeUndefined();
  });

  it("Return undefined and remove user if unauthorized", async () => {
    const removeUserMock = vi.fn();

    const partialMock: Partial<AuthContextProps> = {
      user: {} as User,
      removeUser: removeUserMock,
      isLoading: false,
    };

    vi.mocked(useAuth).mockReturnValue({
      ...partialMock,
    } as AuthContextProps);

    vi.mocked(
      CoffeesService.getCoffeeByIdApiV1CoffeesCoffeeIdGet,
    ).mockReturnValue(
      Promise.reject(new Error("Unauthorized")) as CancelablePromise<Coffee>,
    );

    const hook = renderHook(() => useClientService());

    const callClientServiceMethod = hook.result.current[0];

    const result = await callClientServiceMethod({
      function: CoffeesService.getCoffeeByIdApiV1CoffeesCoffeeIdGet,
      rethrowError: true,
      args: ["1"],
    });

    expect(result).toBeUndefined();

    expect(removeUserMock).toHaveBeenCalled();
  });

  it("Rethrow error if rethrowError is true", async () => {
    vi.mocked(
      CoffeesService.getCoffeeByIdApiV1CoffeesCoffeeIdGet,
    ).mockReturnValue(
      Promise.reject(new Error("Test Error")) as CancelablePromise<Coffee>,
    );

    const hook = renderHook(() => useClientService());

    const callClientServiceMethod = hook.result.current[0];

    await expect(
      callClientServiceMethod({
        function: CoffeesService.getCoffeeByIdApiV1CoffeesCoffeeIdGet,
        rethrowError: true,
        args: ["1"],
      }),
    ).rejects.toThrowError("Test Error");
  });
});
