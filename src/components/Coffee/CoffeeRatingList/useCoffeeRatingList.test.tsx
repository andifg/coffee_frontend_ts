import { it, vi, describe, expect } from "vitest";

import { renderHook, waitFor } from "@testing-library/react";
import { useCoffeeRatingList } from "./useCoffeeRatingList";
import useClientService from "../../../hooks/useClientService";
import { BrewingMethod } from "../../../client";
import { RatingsService } from "../../../client";
import { act } from "react-dom/test-utils";

describe("useCoffeeRatingList", () => {
  vi.mock("../../../hooks/useClientService", () => ({
    default: vi.fn(),
  }));

  it("should load ratings first page on initial render", async () => {
    const useClientServiceMock = vi.fn();

    useClientServiceMock.mockResolvedValueOnce([
      {
        _id: "1",
        rating: 5,
        BrewingMethod: BrewingMethod.ESPRESSO,
        coffeeId: "1",
        userId: "1",
        userName: "alfi",
      },
    ]);

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    const coffee = {
      _id: "1",
      name: "Coffee",
      roasting_company: "Roasting Company",
      owner_id: "1",
      owner_name: "alfi",
    };

    const { result } = renderHook(() =>
      useCoffeeRatingList({
        coffee: coffee,
      }),
    );

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "1",
          rating: 5,
          BrewingMethod: BrewingMethod.ESPRESSO,
          coffeeId: "1",
          userId: "1",
          userName: "alfi",
        },
      ]);
    });

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: RatingsService.listRatingsApiV1RatingsGet,
      rethrowError: true,
      args: [1, 5, null, "1"],
    });
  });

  it("Shoud load next page when loadNextPage is called", async () => {
    const useClientServiceMock = vi.fn();

    useClientServiceMock.mockResolvedValueOnce([
      {
        _id: "1",
        rating: 5,
        BrewingMethod: BrewingMethod.ESPRESSO,
        coffeeId: "1",
        userId: "1",
        userName: "alfi",
      },
    ]);

    useClientServiceMock.mockResolvedValueOnce([
      {
        _id: "2",
        rating: 4,
        BrewingMethod: BrewingMethod.ESPRESSO,
        coffeeId: "1",
        userId: "2",
        userName: "alfi",
      },
      {
        _id: "3",
        rating: 3,
        BrewingMethod: BrewingMethod.ESPRESSO,
        coffeeId: "1",
        userId: "3",
        userName: "alfi",
      },
    ]);

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    const coffee = {
      _id: "1",
      name: "Coffee",
      roasting_company: "Roasting Company",
      owner_id: "1",
      owner_name: "alfi",
    };

    const { result } = renderHook(() =>
      useCoffeeRatingList({
        coffee: coffee,
      }),
    );

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "1",
          rating: 5,
          BrewingMethod: BrewingMethod.ESPRESSO,
          coffeeId: "1",
          userId: "1",
          userName: "alfi",
        },
      ]);
    });

    await act(async () => {
      await result.current[1]();
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "1",
          rating: 5,
          BrewingMethod: BrewingMethod.ESPRESSO,
          coffeeId: "1",
          userId: "1",
          userName: "alfi",
        },
        {
          _id: "2",
          rating: 4,
          BrewingMethod: BrewingMethod.ESPRESSO,
          coffeeId: "1",
          userId: "2",
          userName: "alfi",
        },
        {
          _id: "3",
          rating: 3,
          BrewingMethod: BrewingMethod.ESPRESSO,
          coffeeId: "1",
          userId: "3",
          userName: "alfi",
        },
      ]);
    });

    expect(useClientServiceMock).toHaveBeenCalledTimes(2);

    expect(useClientServiceMock.mock.calls).toEqual([
      [
        {
          function: RatingsService.listRatingsApiV1RatingsGet,
          rethrowError: true,
          args: [1, 5, null, "1"],
        },
      ],
      [
        {
          function: RatingsService.listRatingsApiV1RatingsGet,
          rethrowError: true,
          args: [2, 5, "1", "1"],
        },
      ],
    ]);
  });
});
