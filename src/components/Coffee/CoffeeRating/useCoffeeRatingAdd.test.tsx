import { vi, expect, it, describe } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useCoffeeRatingAdd } from "./useCoffeeRatingAdd";
import { RatingsService } from "../../../client";

import useClientService from "../../../hooks/useClientService";

describe("useCoffeeRatingAdd", () => {
  vi.mock("../../../hooks/useClientService", () => ({
    default: vi.fn(),
  }));

  it("Should process initial props", async () => {
    vi.mocked(useClientService).mockReturnValue([vi.fn()]);

    const { result } = renderHook(() =>
      useCoffeeRatingAdd(
        { coffee_id: "1", initialRating: 5, initialRatingCount: 3 },
        vi.fn(),
      ),
    );

    await waitFor(() => {
      expect(result.current[0]).toEqual(0);
    });

    await waitFor(() => {
      expect(result.current[1]).toEqual(5);
    });

    await waitFor(() => {
      expect(result.current[2]).toEqual(3);
    });

    await waitFor(() => {
      expect(result.current[5]).toEqual(null);
    });
  });

  it("Should handle rating change", async () => {
    vi.mocked(useClientService).mockReturnValue([vi.fn()]);

    const { result } = renderHook(() =>
      useCoffeeRatingAdd(
        { coffee_id: "1", initialRating: 5, initialRatingCount: 3 },
        vi.fn(),
      ),
    );

    // Change the current rating via calling the changeStarRating function
    result.current[3](3);

    await waitFor(() => {
      expect(result.current[0]).toEqual(3);
    });
  });

  it("Should handle successfull add rating to coffee", async () => {
    const useClientServiceMock = vi.fn();

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    vi.mock("uuidv7", () => ({
      uuidv7: vi.fn().mockReturnValue("018d9208-bf07-7554-b454-b1812e5b1f75"),
    }));

    const { result } = renderHook(() =>
      useCoffeeRatingAdd(
        { coffee_id: "1", initialRating: 5, initialRatingCount: 3 },
        vi.fn(),
      ),
    );

    // Change the current rating via calling the changeStarRating function
    result.current[3](5);

    await waitFor(() => {
      expect(result.current[0]).toEqual(5);
    });

    // Call the addRatingtoCoffee function
    await result.current[4]();

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function:
        RatingsService.createCoffeeRatingApiV1CoffeesCoffeeIdRatingsPost,
      rethrowError: true,
      args: [
        "1",
        {
          _id: "018d9208-bf07-7554-b454-b1812e5b1f75",
          coffee_id: "1",
          rating: 5,
        },
      ],
    });
  });

  it("Should handle empty curretn rating during add rating to coffee", async () => {
    const { result } = renderHook(() =>
      useCoffeeRatingAdd(
        { coffee_id: "1", initialRating: 5, initialRatingCount: 3 },
        vi.fn(),
      ),
    );

    // Call the addRatingtoCoffee function
    await result.current[4]();

    await waitFor(() => {
      expect(result.current[5]).toEqual("Please select a rating");
    });
  });

  it("Should handle error during add rating to coffee", async () => {
    const useClientServiceMock = vi.fn();

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    useClientServiceMock.mockRejectedValueOnce(new Error("Test Error"));

    const { result } = renderHook(() =>
      useCoffeeRatingAdd(
        { coffee_id: "1", initialRating: 5, initialRatingCount: 3 },
        vi.fn(),
      ),
    );

    // Change the current rating via calling the changeStarRating function
    result.current[3](5);

    await waitFor(() => {
      expect(result.current[0]).toEqual(5);
    });

    // Call the addRatingtoCoffee function
    await result.current[4]();

    await waitFor(() => {
      expect(result.current[5]).toEqual("Test Error");
    });
  });
});
