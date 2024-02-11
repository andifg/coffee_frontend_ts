import { expect, vi, it, describe } from "vitest";
import { renderHook } from "@testing-library/react";
import useLoadIdsToRedux from "./useLoadIdsToRedux";

import useClientService from "./useClientService";
import { useDispatch } from "react-redux";
import { CoffeesService } from "../client";

describe("useLoadIdsToRedux", () => {
  vi.mock("./useClientService", () => ({
    default: vi.fn().mockReturnValue([vi.fn()]),
  }));

  vi.mock("react-redux", () => ({
    useDispatch: vi.fn(),
  }));

  const useClientServiceMock = vi.fn();
  const useDispatchMock = vi.fn();

  vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);
  vi.mocked(useDispatch).mockReturnValue(useDispatchMock);

  it("Should fetch ids and load to redux via dispatch call", async () => {
    useClientServiceMock.mockReturnValueOnce([["1", "2", "3"]]);

    const { result } = renderHook(() => useLoadIdsToRedux());

    // Call fetch and load ids to redux function
    await result.current[0]();

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeesService.listCoffeeIdsApiV1CoffeesIdsGet,
      rethrowError: true,
      args: [],
    });

    expect(useDispatchMock).toHaveBeenCalledWith({
      type: "coffeeIDs/setCoffeeIds",
      payload: [["1", "2", "3"]],
    });
  });

  it("Should not call dispatch in case of error", async () => {
    useClientServiceMock.mockRejectedValueOnce("Error");

    const { result } = renderHook(() => useLoadIdsToRedux());

    // Call fetch and load ids to redux function
    await result.current[0]();

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeesService.listCoffeeIdsApiV1CoffeesIdsGet,
      rethrowError: true,
      args: [],
    });

    expect(useDispatchMock).not.toHaveBeenCalled();
  });

  it("Should handle empty ids", async () => {
    useClientServiceMock.mockReturnValueOnce([]);

    const { result } = renderHook(() => useLoadIdsToRedux());

    // Call fetch and load ids to redux function
    await result.current[0]();

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeesService.listCoffeeIdsApiV1CoffeesIdsGet,
      rethrowError: true,
      args: [],
    });

    expect(useDispatchMock).toHaveBeenCalledWith({
      type: "coffeeIDs/setCoffeeIds",
      payload: [],
    });
  });
});
