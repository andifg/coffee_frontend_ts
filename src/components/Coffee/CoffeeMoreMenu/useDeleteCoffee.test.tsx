import React from "react";
import useDeleteCoffee from "./useDeleteCoffee";
import { renderHook } from "@testing-library/react";
import { describe, vi, it, expect } from "vitest";
import useClientService from "../../../hooks/useClientService";
import { CoffeesService } from "../../../client";

describe("useDeleteCoffee", async () => {
  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

  const useContextMock = vi.fn();

  vi.spyOn(React, "useContext").mockReturnValue(useContextMock);

  vi.mock("../../../hooks/useClientService", () => ({
    default: vi.fn(),
  }));

  const useClientServiceMock = vi.fn();

  vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

  it("Handle delete coffe by calling useClientService and dispatch", async () => {
    const { result } = renderHook(() => useDeleteCoffee({ coffee_id: "1" }));

    useClientServiceMock.mockResolvedValueOnce({});

    // Call delete coffee function
    await result.current[0]();

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeesService.deleteCoffeeByIdApiV1CoffeesCoffeeIdDelete,
      rethrowError: true,
      args: ["1"],
    });

    expect(useContextMock).toHaveBeenCalledWith("1");
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

    expect(useContextMock).not.toHaveBeenCalled();
  });
});
