import useDeleteCoffee from "./useDeleteCoffee";
import { renderHook } from "@testing-library/react";
import { describe, vi, it, expect } from "vitest";
import { useDispatch } from "react-redux";
import useClientService from "../../../hooks/useClientService";
import { CoffeesService } from "../../../client";

describe("useDeleteCoffee", async () => {
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

  it("Handle delete coffe by calling useClientService and dispatch", async () => {
    const { result } = renderHook(() => useDeleteCoffee({ coffee_id: "1" }));

    // Call delete coffee function
    await result.current[0]();

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeesService.deleteCoffeeByIdApiV1CoffeesCoffeeIdDelete,
      rethrowError: true,
      args: ["1"],
    });

    expect(useDispatchMock).toHaveBeenCalledWith({
      type: "coffeeIDs/deleteCoffeeId",
      payload: "1",
    });
  });

  it("Handle error during delete coffee", async () => {
    useClientServiceMock.mockRejectedValueOnce("Error");

    const { result } = renderHook(() => useDeleteCoffee({ coffee_id: "1" }));

    // Call delete coffee function
    await result.current[0]();

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeesService.deleteCoffeeByIdApiV1CoffeesCoffeeIdDelete,
      rethrowError: true,
      args: ["1"],
    });

    expect(useDispatchMock).not.toHaveBeenCalled();
  });
});
