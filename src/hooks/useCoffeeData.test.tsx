import { renderHook, waitFor } from "@testing-library/react";
import { useCoffeeData } from "./useCoffeeData";
import { vi, expect, it, describe } from "vitest";
import useClientService from "./useClientService";
import useLoadImageURL from "./useLoadImage";
import { CoffeesService, RatingsService } from "../client";

describe("useCoffeeData", async () => {
  vi.mock("./useClientService", () => ({
    default: vi.fn(),
  }));

  vi.mock("./useLoadImage", () => ({
    default: vi.fn(),
  }));

  it("Should fetch coffee, rating & image data from other hooks and return payload", async () => {
    const useClientServiceMock = vi.fn();

    vi.mocked(useLoadImageURL).mockReturnValue([
      "teststring",
      vi.fn(),
      vi.fn(),
    ]);

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    useClientServiceMock.mockResolvedValueOnce({
      _id: "1",
      name: "Test Coffee",
    });

    useClientServiceMock.mockResolvedValueOnce({
      coffee_id: "1",
      rating_average: 4.5,
      rating_count: 3,
    });

    const { result } = renderHook(() =>
      useCoffeeData({ coffee_id: "1", reload: 1, childrenLoaded: () => {} }),
    );

    await waitFor(() => {
      expect(result.current[1]).toEqual(false);
    });

    await waitFor(() => {
      expect(result.current[2]).toEqual("teststring");
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual({
        _id: "1",
        name: "Test Coffee",
      });
    });

    await waitFor(() => {
      expect(result.current[3]).toEqual({
        coffee_id: "1",
        rating_average: 4.5,
        rating_count: 3,
      });
    });

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeesService.getCoffeeByIdApiV1CoffeesCoffeeIdGet,
      args: ["1"],
    });

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function:
        RatingsService.getCoffeesRatingSummaryApiV1CoffeesCoffeeIdRatingSummaryGet,
      args: ["1"],
    });

    expect(vi.mocked(useLoadImageURL)).toHaveBeenCalledWith("1");
  });

  it("Should update coffee name", async () => {
    const useClientServiceMock = vi.fn();

    vi.mocked(useLoadImageURL).mockReturnValue([
      "teststring",
      vi.fn(),
      vi.fn(),
    ]);

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    useClientServiceMock.mockResolvedValueOnce({
      _id: "1",
      name: "Test Coffee",
    });

    useClientServiceMock.mockResolvedValueOnce({
      coffee_id: "1",
      rating_average: 4.5,
      rating_count: 3,
    });

    const { result } = renderHook(() =>
      useCoffeeData({ coffee_id: "1", reload: 1, childrenLoaded: () => {} }),
    );

    await waitFor(() => {
      expect(result.current[1]).toEqual(false);
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual({
        _id: "1",
        name: "Test Coffee",
      });
    });

    result.current[4]("New Coffee Name");

    await waitFor(() => {
      expect(result.current[0]).toEqual({
        _id: "1",
        name: "New Coffee Name",
      });
    });
  });
});
