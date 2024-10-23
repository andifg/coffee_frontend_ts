import { describe, it, vi, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useAddCoffeeBrewRating } from "./useAddCoffeeBrewRating";
import { MemoryRouter } from "react-router";
import { act } from "react-dom/test-utils";
import useClientService from "../../hooks/useClientService";
import {
  CoffeesService,
  Drink,
  DrinkImagesService,
  DrinksService,
} from "../../client";
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

  // vi.stubGlobal("navigator", {
  //   geolocation: {
  //     getCurrentPosition: vi.fn().mockImplementation(
  //       (callback) => {
  //         callback({
  //           coords: {
  //             longitude: 121,
  //             latitude: 34,
  //           },
  //         });
  //       }
  //     ),
  //   },
  // }
  // )

  const wrapper = ({ children }: { children: JSX.Element }) => (
    <MemoryRouter
      initialEntries={[
        "/add-rating?coffeeId=1&coffeeName=Coffee%20Name&roastingCompany=Roasting%20Company&brewingMethod=Brewing%20Method&rating=Brewing%20Rating&coffeeBeanOwner=Owner&coffeeBeanOwnerId=1",
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

    expect(result.current[0]).toBe(undefined);
    expect(result.current[1]).toBeInstanceOf(Function);
    expect(result.current[2]).toBe(false);
    expect(result.current[3]).toBe(null);
    expect(result.current[6]).toBe("Brewing Method");
    expect(result.current[7]).toBe("");
    expect(result.current[8]).toBe(undefined);
    expect(result.current[9]).toEqual([]);
    expect(result.current[10]).toStrictEqual({
      _id: "1",
      name: "Coffee Name",
      roasting_company: "Roasting Company",
      owner_name: "Owner",
      owner_id: "1",
    });
    expect(result.current[11]).toBeInstanceOf(Function);
    expect(result.current[12]).toBeInstanceOf(Function);
  });

  it("Should set new params for rating and method", () => {
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

    expect(result.current[6]).toBe("New Brewing Method");
    expect(result.current[7]).toBe("New Brewing Rating");
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
    expect(result.current[7]).toBe("");
    expect(result.current[8]).toBe(undefined);
    expect(result.current[9]).toEqual([]);
    expect(result.current[10]).toBe(null);
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

  it("Should show error when coffee bean not selected for ", async () => {
    const newWrapper = ({ children }: { children: JSX.Element }) => (
      <MemoryRouter initialEntries={["/add-rating"]}>{children}</MemoryRouter>
    );

    const props = {
      close: () => {},
    };
    const { result } = renderHook(() => useAddCoffeeBrewRating(props), {
      wrapper: newWrapper,
    });

    expect(result.current[8]).toBe(undefined);

    result.current[4]({
      brewingMethod: "New Brewing Method",
      brewingRating: "3",
    });

    await waitFor(() => {
      expect(result.current[7]).toBe("3");
    });

    await act(async () => {
      await result.current[5]();
    });

    await waitFor(() => {
      expect(result.current[2]).toBe(false);
    });

    await waitFor(() => {
      expect(result.current[3]).toBe("Fill in missing information");
    });
  });

  it("Should submit rating without image", async () => {
    const useClientServiceMock = vi.fn();
    const closeMock = vi.fn();

    vi.stubGlobal("navigator", {
      geolocation: {
        getCurrentPosition: vi.fn().mockImplementation(
          (callback) => {
            callback({
              coords: {
                longitude: 121,
                latitude: 34,
              },
            });
          }
        ),
      },
    }
    )

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

    expect(result.current[6]).toBe("New Brewing Method");
    expect(result.current[7]).toBe("3");

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
          coordinate: { longitude: 121, latitude: 34 },
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

    vi.stubGlobal("navigator", {
      geolocation: {
        getCurrentPosition: vi.fn().mockImplementation(
          (callback) => {
            callback({
              coords: {
                longitude: 11,
                latitude: 34,
              },
            });
          }
        ),
      },
    }
    )

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

    expect(result.current[6]).toBe("New Brewing Method");
    expect(result.current[7]).toBe("3");

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
          coordinate: { longitude: 11, latitude: 34 },
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

    expect(result.current[6]).toBe("New Brewing Method");
    expect(result.current[7]).toBe("3");

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
          coordinate: { longitude: 11, latitude: 34 },
        },
      ],
    });

    waitFor(() => {
      expect(result.current[3]).toBe("API Error");
    });

    expect(closeMock).not.toHaveBeenCalled();
  });

  it("Should handle coffee bean change", () => {
    const props = {
      close: () => {},
    };
    const { result } = renderHook(() => useAddCoffeeBrewRating(props), {
      wrapper,
    });

    act(() => {
      result.current[11]({} as React.SyntheticEvent, {
        _id: "1",
        name: "Coffee Name",
        roasting_company: "Roasting Company",
        owner_name: "Owner",
        owner_id: "1",
      });
    });

    expect(result.current[10]).toStrictEqual({
      _id: "1",
      name: "Coffee Name",
      roasting_company: "Roasting Company",
      owner_name: "Owner",
      owner_id: "1",
    });
  });

  it("Should search for new bean options", async () => {
    const useClientServiceMock = vi.fn();

    useClientServiceMock.mockResolvedValueOnce([
      {
        _id: "1",
        name: "Coffee Name",
        roasting_company: "Roasting Company",
        owner_name: "Owner",
        owner_id: "1",
      },
      {
        _id: "2",
        name: "Coffee Name 2",
        roasting_company: "Roasting Company 2",
        owner_name: "Owner 2",
        owner_id: "2",
      },
    ]);

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    const props = {
      close: () => {},
    };
    const { result } = renderHook(() => useAddCoffeeBrewRating(props), {
      wrapper,
    });

    result.current[12]("search");

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeesService.listCoffeesWithRatingSummaryApiV1CoffeesGet,
      rethrowError: true,
      args: [1, 10, null, null, "search"],
    });

    await waitFor(() => {
      expect(result.current[9]).toStrictEqual([
        {
          _id: "1",
          name: "Coffee Name",
          roasting_company: "Roasting Company",
          owner_name: "Owner",
          owner_id: "1",
        },
        {
          _id: "2",
          name: "Coffee Name 2",
          roasting_company: "Roasting Company 2",
          owner_name: "Owner 2",
          owner_id: "2",
        },
      ]);
    });
  });
});
