import { describe, vi, it, expect } from "vitest";
import useClientService from "../../hooks/useClientService";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll/useInfinteScroll";
import { useManageCoffeeDrinksState } from "./useManageCoffeeDrinksState";
import { renderHook, waitFor } from "@testing-library/react";
import { BrewingMethod, DrinksService, Drink } from "../../client";
import { useSelector } from "react-redux";
import { useContext } from "react";
// import { Coffee as CoffeeSchema } from "../../client";
// import useInfiniteScroll from "../useInfiniteScroll/useInfinteScroll";

describe("useManageCoffeesState", () => {
  it("Should pass", () => {
    expect(true).toBe(true);
  });

  vi.mock("react", async (importOriginal) => {
    const actual = await importOriginal<typeof import("react")>();
    return {
      ...actual,
      useContext: vi.fn().mockReturnValue({
        setCallback: vi.fn(),
      }),
    };
  });

  vi.mock("react-redux", () => ({
    useSelector: vi.fn(),
  }));

  vi.mock("../../hooks/useInfiniteScroll/useInfinteScroll", () => ({
    useInfiniteScroll: vi.fn(),
  }));

  vi.mock("../../hooks/useClientService", () => ({
    default: vi.fn().mockReturnValue(vi.fn()),
  }));

  it("Should fetch first drink page on intial render", async () => {
    const useClientMock = vi.fn();
    const resetTriggeredMock = vi.fn();

    vi.mocked(useSelector).mockReturnValue(undefined);

    vi.mocked(useInfiniteScroll).mockReturnValue([true, resetTriggeredMock]);
    vi.mocked(useClientService).mockReturnValue([useClientMock]);

    useClientMock.mockResolvedValue([
      {
        _id: "1",
        brewing_method: "Espresso" as BrewingMethod,
        rating: 4,
        coffee_bean_id: "1",
        user_id: "1",
        user_name: "User 1",
      },
      { _id: "2", rating: 4, user_id: "1", user_name: "User 1" },
    ]);

    const { result } = renderHook(() => useManageCoffeeDrinksState());

    expect(result.current[3]).toEqual(true);

    await waitFor(() => {
      expect(result.current[3]).toEqual(false);
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "1",
          brewing_method: "Espresso",
          rating: 4,
          coffee_bean_id: "1",
          user_id: "1",
          user_name: "User 1",
        },
        { _id: "2", rating: 4, user_id: "1", user_name: "User 1" },
      ]);
    });

    expect(useClientMock).toHaveBeenCalledWith({
      function: DrinksService.listDrinksApiV1DrinksGet,
      args: [1, 5, undefined, undefined],
    });

    expect(resetTriggeredMock).toHaveBeenCalled();
  });

  it("Should fetch drinks when fetchFirstPage gets called", async () => {
    const useClientMock = vi.fn();
    const resetTriggeredMock = vi.fn();

    vi.mocked(useSelector).mockReturnValue("1");

    vi.mocked(useClientService).mockReturnValue([useClientMock]);
    vi.mocked(useInfiniteScroll).mockReturnValue([true, resetTriggeredMock]);

    useClientMock.mockResolvedValueOnce([]);

    const { result } = renderHook(() => useManageCoffeeDrinksState());

    await waitFor(() => {
      expect(result.current[3]).toEqual(false);
    });

    useClientMock.mockResolvedValueOnce([
      {
        _id: "1",
        brewing_method: "Espresso",
        rating: 4,
        coffee_bean_id: "1",
        user_id: "1",
        user_name: "User 1",
      },
      { _id: "2", rating: 4, user_id: "1", user_name: "User 1" },
    ]);

    await result.current[1]();

    expect(useClientMock).toHaveBeenCalledWith({
      function: DrinksService.listDrinksApiV1DrinksGet,
      args: [1, 5, undefined, undefined],
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "1",
          brewing_method: "Espresso",
          rating: 4,
          coffee_bean_id: "1",
          user_id: "1",
          user_name: "User 1",
        },
        { _id: "2", rating: 4, user_id: "1", user_name: "User 1" },
      ]);
    });

    expect(resetTriggeredMock).toHaveBeenCalledTimes(2);
  });

  it("Should fetch next page when loadNextPage gets called", async () => {
    const useClientMock = vi.fn();
    let fetchMore: () => Promise<void> = () => Promise.resolve();
    const useInfiniteScrollMock = ({
      functionToTrigger,
    }: {
      functionToTrigger: () => Promise<void>;
    }): [boolean, () => void] => {
      fetchMore = functionToTrigger;
      return [true, () => {}];
    };

    vi.mocked(useSelector).mockReturnValue("1");

    vi.mocked(useClientService).mockReturnValue([useClientMock]);
    vi.mocked(useInfiniteScroll).mockImplementation(useInfiniteScrollMock);

    useClientMock.mockResolvedValueOnce([
      {
        _id: "1",
        brewing_method: "Espresso",
        rating: 4,
        coffee_bean_id: "1",
        user_id: "1",
        user_name: "User 1",
      },
      { _id: "2", rating: 4, user_id: "1", user_name: "User 1" },
    ]);

    const { result } = renderHook(() => useManageCoffeeDrinksState());

    await waitFor(() => {
      expect(result.current[3]).toEqual(false);
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "1",
          brewing_method: "Espresso",
          rating: 4,
          coffee_bean_id: "1",
          user_id: "1",
          user_name: "User 1",
        },
        { _id: "2", rating: 4, user_id: "1", user_name: "User 1" },
      ]);
    });

    useClientMock.mockResolvedValueOnce([
      {
        _id: "3",
        brewing_method: "Espresso",
        rating: 4,
        coffee_bean_id: "1",
        user_id: "1",
        user_name: "User 1",
      },
      { _id: "4", rating: 4, user_id: "1", user_name: "User 1" },
    ]);

    await fetchMore();

    waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "1",
          brewing_method: "Espresso",
          rating: 4,
          coffee_bean_id: "1",
          user_id: "1",
          user_name: "User 1",
        },
        { _id: "2", rating: 4, user_id: "1", user_name: "User 1" },
        {
          _id: "3",
          brewing_method: "Espresso",
          rating: 4,
          coffee_bean_id: "1",
          user_id: "1",
          user_name: "User 1",
        },
        { _id: "4", rating: 4, user_id: "1", user_name: "User 1" },
      ]);
    });

    expect(useClientMock.mock.calls).toEqual([
      [
        {
          function: DrinksService.listDrinksApiV1DrinksGet,
          args: [1, 5, undefined, undefined],
        },
      ],
      [
        {
          function: DrinksService.listDrinksApiV1DrinksGet,
          args: [2, 5, "1", undefined],
        },
      ],
    ]);
  });

  it("Should add coffee to coffees", async () => {
    let callback: (coffee: Drink) => void = () => {};

    const setCallback = (func: () => () => void) => {
      console.log("Setting callback");
      console.log(func.toString());
      const call = func();
      console.log("Callback: ", call.toString());

      callback = call;
    };

    vi.mocked(useContext).mockReturnValue({
      setCallback,
    });

    const useClientMock = vi.fn();

    vi.mocked(useSelector).mockReturnValue(undefined);

    vi.mocked(useClientService).mockReturnValue([useClientMock]);

    useClientMock.mockResolvedValueOnce([
      {
        _id: "1",
        brewing_method: "Espresso",
        rating: 4,
        coffee_bean_id: "1",
        user_id: "1",
        user_name: "User 1",
      },
      { _id: "2", rating: 4, user_id: "1", user_name: "User 1" },
    ]);

    const { result } = renderHook(() => useManageCoffeeDrinksState());

    await waitFor(() => {
      expect(result.current[3]).toEqual(false);
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "1",
          brewing_method: "Espresso",
          rating: 4,
          coffee_bean_id: "1",
          user_id: "1",
          user_name: "User 1",
        },
        { _id: "2", rating: 4, user_id: "1", user_name: "User 1" },
      ]);
    });

    callback({
      _id: "3",
      brewing_method: "Espresso",
      rating: 4,
      coffee_bean_id: "1",
      user_id: "1",
      user_name: "User 1",
    } as Drink);

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "3",
          brewing_method: "Espresso",
          rating: 4,
          coffee_bean_id: "1",
          user_id: "1",
          user_name: "User 1",
        },
        {
          _id: "1",
          brewing_method: "Espresso",
          rating: 4,
          coffee_bean_id: "1",
          user_id: "1",
          user_name: "User 1",
        },
        { _id: "2", rating: 4, user_id: "1", user_name: "User 1" },
      ]);
    });
  });

  it("Should delete drink", async () => {
    const useClientMock = vi.fn();

    vi.mocked(useSelector).mockReturnValue(undefined);

    vi.mocked(useClientService).mockReturnValue([useClientMock]);

    useClientMock.mockResolvedValueOnce([
      {
        _id: "1",
        brewing_method: "Espresso",
        rating: 4,
        coffee_bean_id: "1",
        user_id: "1",
        user_name: "User 1",
      },
      { _id: "2", rating: 4, user_id: "1", user_name: "User 1" },
    ]);

    const { result } = renderHook(() => useManageCoffeeDrinksState());

    await waitFor(() => {
      expect(result.current[3]).toEqual(false);
    });

    result.current[2]("1");

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        { _id: "2", rating: 4, user_id: "1", user_name: "User 1" },
      ]);
    });
  });
});
