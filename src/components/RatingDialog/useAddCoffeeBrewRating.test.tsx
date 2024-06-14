import { describe, it, vi, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useAddCoffeeBrewRating } from "./useAddCoffeeBrewRating";
import { MemoryRouter } from "react-router";
import { act } from "react-dom/test-utils";
import useClientService from "../../hooks/useClientService";
import { Rating, RatingsService } from "../../client";

describe("useAddCoffeeBrewRating", () => {
  vi.mock("react-oidc-context", () => ({
    useAuth: vi.fn(),
  }));

  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

  vi.mock("../../hooks/useClientService", () => ({
    default: vi.fn().mockReturnValue([vi.fn()]),
  }));

  vi.mock("uuidv7", () => ({
    uuidv7: vi.fn().mockReturnValue("1"),
  }));

  const wrapper = ({ children }: { children: JSX.Element }) => (
    <MemoryRouter
      initialEntries={[
        "/add-rating?coffeeId=1&coffeeName=Coffee%20Name&roastingCompany=Roasting%20Company&brewingMethod=Brewing%20Method&rating=Brewing%20Rating",
      ]}
    >
      {children}
    </MemoryRouter>
  );

  it("Should read inputs from search params and set them as state", () => {
    const props = {
      close: () => {},
    };
    const { result } = renderHook(() => useAddCoffeeBrewRating(props), {
      wrapper,
    });
    const [
      loading,
      error,
      setParams,
      submit,
      coffeeName,
      roastingCompany,
      method,
      rating,
    ] = result.current;
    expect(setParams).toBeInstanceOf(Function);
    expect(submit).toBeInstanceOf(Function);
    expect(loading).toBe(false);
    expect(error).toBe(null);
    expect(coffeeName).toBe("Coffee Name");
    expect(roastingCompany).toBe("Roasting Company");
    expect(method).toBe("Brewing Method");
    expect(rating).toBe("");
  });

  it("Should set new params", () => {
    const props = {
      close: () => {},
    };
    const { result } = renderHook(() => useAddCoffeeBrewRating(props), {
      wrapper,
    });

    act(() => {
      result.current[2]({
        brewingMethod: "New Brewing Method",
        brewingRating: "New Brewing Rating",
      });
    });

    expect(result.current[6]).toBe("New Brewing Method");
    expect(result.current[7]).toBe("New Brewing Rating");
  });

  it("Should show error when rating not selected", async () => {
    const props = {
      close: () => {},
    };
    const { result } = renderHook(() => useAddCoffeeBrewRating(props), {
      wrapper,
    });

    await act(async () => {
      await result.current[3]();
    });

    waitFor(() => {
      expect(result.current[0]).toBe(true);
    });

    expect(result.current[0]).toBe(false);

    expect(result.current[1]).toBe("Rating is required");
  });

  it("Should submit rating", async () => {
    const useClientServiceMock = vi.fn();
    const closeMock = vi.fn();

    useClientServiceMock.mockResolvedValueOnce({
      _id: "1",
      coffee_id: "1",
      brewing_method: "Espresso",
      rating: 3,
    } as Rating);

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    const props = {
      close: closeMock,
    };

    const { result } = renderHook(() => useAddCoffeeBrewRating(props), {
      wrapper,
    });

    act(() => {
      result.current[2]({
        brewingMethod: "New Brewing Method",
        brewingRating: "3",
      });
    });

    expect(result.current[6]).toBe("New Brewing Method");
    expect(result.current[7]).toBe("3");

    await act(async () => {
      await result.current[3]();
    });

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function:
        RatingsService.createCoffeeRatingApiV1CoffeesCoffeeIdRatingsPost,
      rethrowError: true,
      args: [
        {
          _id: "1",
          coffee_id: "1",
          rating: 3,
          brewing_method: "New Brewing Method",
        },
      ],
    });

    waitFor(() => {
      expect(closeMock).toHaveBeenCalled();
    });
  });

  it("Will handle api error", async () => {
    const useClientServiceMock = vi.fn();
    const closeMock = vi.fn();

    useClientServiceMock.mockRejectedValueOnce(new Error("API Error"));

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    const props = {
      close: closeMock,
    };

    const { result } = renderHook(() => useAddCoffeeBrewRating(props), {
      wrapper,
    });

    act(() => {
      result.current[2]({
        brewingMethod: "New Brewing Method",
        brewingRating: "3",
      });
    });

    expect(result.current[6]).toBe("New Brewing Method");
    expect(result.current[7]).toBe("3");

    await act(async () => {
      await result.current[3]();
    });

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function:
        RatingsService.createCoffeeRatingApiV1CoffeesCoffeeIdRatingsPost,
      rethrowError: true,
      args: [
        {
          _id: "1",
          coffee_id: "1",
          brewing_method: "New Brewing Method",
          rating: 3,
        },
      ],
    });

    waitFor(() => {
      expect(result.current[1]).toBe("API Error");
    });

    expect(closeMock).not.toHaveBeenCalled();
  });
});
