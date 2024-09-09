import { describe, it, vi, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useAddCoffeeBrewRating } from "./useAddCoffeeBrewRating";
import { MemoryRouter } from "react-router";
import { act } from "react-dom/test-utils";
import useClientService from "../../hooks/useClientService";
import { Drink, DrinkImagesService, DrinksService } from "../../client";
import React from "react";

describe("useAddCoffeeBrewRating", () => {
  vi.mock("react-oidc-context", () => ({
    useAuth: vi.fn(),
  }));

  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

  vi.mock("react-redux", () => ({
    useSelector: vi.fn(),
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
        "/add-rating?coffeeId=1&coffeeName=Coffee%20Name&roastingCompany=Roasting%20Company&brewingMethod=Brewing%20Method&rating=Brewing%20Rating&drinkType=Espresso",
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
      imageURL,
      handleFileChange,
      loading,
      error,
      setParams,
      submit,
      coffeeName,
      roastingCompany,
      method,
      rating,
      drinkType,
    ] = result.current;
    expect(imageURL).toBe(undefined);
    expect(handleFileChange).toBeInstanceOf(Function);
    expect(setParams).toBeInstanceOf(Function);
    expect(submit).toBeInstanceOf(Function);
    expect(loading).toBe(false);
    expect(error).toBe(null);
    expect(coffeeName).toBe("Coffee Name");
    expect(roastingCompany).toBe("Roasting Company");
    expect(method).toBe("Brewing Method");
    expect(rating).toBe("");
    expect(drinkType).toBe("Espresso");
  });

  it("Should set new params", () => {
    const props = {
      close: () => {},
    };
    const { result } = renderHook(() => useAddCoffeeBrewRating(props), {
      wrapper,
    });

    act(() => {
      result.current[4]({
        brewingMethod: "New Brewing Method",
        brewingRating: "New Brewing Rating",
      });
    });

    expect(result.current[8]).toBe("New Brewing Method");
    expect(result.current[9]).toBe("New Brewing Rating");
  });

  it("Should set undefined params if not privded via search params", () => {
    const props = {
      close: () => {},
    };
    const { result } = renderHook(() => useAddCoffeeBrewRating(props), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/add-rating"]}>{children}</MemoryRouter>
      ),
    });

    expect(result.current[6]).toBe(undefined);
    expect(result.current[7]).toBe(undefined);
    expect(result.current[8]).toBe(undefined);
    expect(result.current[9]).toBe("");
    expect(result.current[10]).toBe(undefined);
  });

  it("Should show error when rating not selected", async () => {
    const props = {
      close: () => {},
    };
    const { result } = renderHook(() => useAddCoffeeBrewRating(props), {
      wrapper,
    });

    await act(async () => {
      await result.current[5]();
    });

    waitFor(() => {
      expect(result.current[2]).toBe(true);
    });

    expect(result.current[2]).toBe(false);

    expect(result.current[3]).toBe("Rating is required");
  });

  it("Should submit rating without image", async () => {
    const useClientServiceMock = vi.fn();
    const closeMock = vi.fn();

    useClientServiceMock.mockResolvedValueOnce({
      _id: "1",
      coffee_bean_id: "1",
      brewing_method: "Espresso",
      rating: 3,
    } as Drink);

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    const props = {
      close: closeMock,
    };

    const { result } = renderHook(() => useAddCoffeeBrewRating(props), {
      wrapper,
    });

    act(() => {
      result.current[4]({
        brewingMethod: "New Brewing Method",
        brewingRating: "3",
      });
    });

    expect(result.current[8]).toBe("New Brewing Method");
    expect(result.current[9]).toBe("3");

    await act(async () => {
      await result.current[5]();
    });

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: DrinksService.createDrinkApiV1DrinksPost,
      rethrowError: true,
      args: [
        {
          _id: "1",
          coffee_bean_id: "1",
          rating: 3,
          brewing_method: "New Brewing Method",
          image_exists: false,
        },
      ],
    });

    expect(useClientServiceMock).toHaveBeenCalledTimes(1);

    waitFor(() => {
      expect(closeMock).toHaveBeenCalled();
    });
  });

  it("Will handle submit with image", async () => {
    const useClientServiceMock = vi.fn();
    const closeMock = vi.fn();

    useClientServiceMock
      .mockResolvedValueOnce({
        _id: "1",
        coffee_bean_id: "1",
        brewing_method: "Espresso",
        rating: 3,
        image_exists: true,
      } as Drink)
      .mockResolvedValueOnce({} as Drink);

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    const props = {
      close: closeMock,
    };

    const { result } = renderHook(() => useAddCoffeeBrewRating(props), {
      wrapper,
    });

    act(() => {
      result.current[4]({
        brewingMethod: "New Brewing Method",
        brewingRating: "3",
      });
    });

    expect(result.current[8]).toBe("New Brewing Method");
    expect(result.current[9]).toBe("3");

    const file = new File([""], "filename", { type: "text/plain" });

    const changeEvent = {
      target: {
        files: [file] as unknown as FileList,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current[1](changeEvent);
    });

    await act(async () => {
      await result.current[5]();
    });

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: DrinksService.createDrinkApiV1DrinksPost,
      rethrowError: true,
      args: [
        {
          _id: "1",
          coffee_bean_id: "1",
          rating: 3,
          brewing_method: "New Brewing Method",
          image_exists: true,
        },
      ],
    });

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: DrinkImagesService.createImageApiV1DrinksDrinkIdImagePost,
      rethrowError: true,
      args: ["1", { file }],
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
      result.current[4]({
        brewingMethod: "New Brewing Method",
        brewingRating: "3",
      });
    });

    expect(result.current[8]).toBe("New Brewing Method");
    expect(result.current[9]).toBe("3");

    await act(async () => {
      await result.current[5]();
    });

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: DrinksService.createDrinkApiV1DrinksPost,
      rethrowError: true,
      args: [
        {
          _id: "1",
          coffee_bean_id: "1",
          brewing_method: "New Brewing Method",
          rating: 3,
          image_exists: false,
        },
      ],
    });

    waitFor(() => {
      expect(result.current[3]).toBe("API Error");
    });

    expect(closeMock).not.toHaveBeenCalled();
  });
});
