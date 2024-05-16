import { useContext } from "react";
import { describe, vi, it, expect } from "vitest";
import useClientService from "../../hooks/useClientService";
import { useManageCoffeesState } from "./useManageCoffeesState";
import { renderHook, waitFor } from "@testing-library/react";
import { CoffeesService } from "../../client";
import { useSelector } from "react-redux";
import { Coffee as CoffeeSchema } from "../../client";

describe("useManageCoffeesState", () => {
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

  vi.mock("../../hooks/useClientService", () => ({
    default: vi.fn().mockReturnValue(vi.fn()),
  }));

  it("Should fetch coffees on intial render", async () => {
    const useClientMock = vi.fn();

    vi.mocked(useSelector).mockReturnValue(undefined);

    vi.mocked(useClientService).mockReturnValue([useClientMock]);

    useClientMock.mockResolvedValue([
      {
        _id: "1",
        name: "Coffee 1",
        owner_id: "1",
        owner_name: "Owner 1",
        rating_average: 4,
        rating_count: 1,
      },
      {
        _id: "2",
        name: "Coffee 2",
        owner_id: "1",
        owner_name: "Owner 1",
        rating_average: 4,
        rating_count: 1,
      },
    ]);

    const { result } = renderHook(() =>
      useManageCoffeesState({
        personalized: false,
      }),
    );

    expect(result.current[2]).toEqual(true);

    await waitFor(() => {
      expect(result.current[2]).toEqual(false);
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "1",
          name: "Coffee 1",
          owner_id: "1",
          owner_name: "Owner 1",
          rating_average: 4,
          rating_count: 1,
        },
        {
          _id: "2",
          name: "Coffee 2",
          owner_id: "1",
          owner_name: "Owner 1",
          rating_average: 4,
          rating_count: 1,
        },
      ]);
    });

    expect(useClientMock).toHaveBeenCalledWith({
      function: CoffeesService.listCoffeesWithRatingSummaryApiV1CoffeesGet,
      args: [1, 10, undefined],
    });
  });

  it("Should fetch coffees when personlized changes", async () => {
    const useClientMock = vi.fn();

    vi.mocked(useSelector).mockReturnValue("1");

    vi.mocked(useClientService).mockReturnValue([useClientMock]);

    useClientMock.mockResolvedValueOnce([]);

    const initialProps = {
      personalized: false,
    };

    const { rerender, result } = renderHook(
      (props = { personalized: false }) => useManageCoffeesState(props),
      {
        initialProps,
      },
    );

    await waitFor(() => {
      expect(result.current[2]).toEqual(false);
    });

    useClientMock.mockResolvedValueOnce([
      {
        _id: "1",
        name: "Coffee 1",
        owner_id: "1",
        owner_name: "Owner 1",
        rating_average: 4,
        rating_count: 1,
      },
      {
        _id: "2",
        name: "Coffee 2",
        owner_id: "1",
        owner_name: "Owner 1",
        rating_average: 4,
        rating_count: 1,
      },
    ]);

    rerender({ personalized: true });

    expect(useClientMock).toHaveBeenCalledWith({
      function: CoffeesService.listCoffeesWithRatingSummaryApiV1CoffeesGet,
      args: [1, 10, "1"],
    });

    expect(useClientMock).toHaveBeenCalledTimes(2);

    await waitFor(() => {
      expect(result.current[2]).toEqual(false);
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "1",
          name: "Coffee 1",
          owner_id: "1",
          owner_name: "Owner 1",
          rating_average: 4,
          rating_count: 1,
        },
        {
          _id: "2",
          name: "Coffee 2",
          owner_id: "1",
          owner_name: "Owner 1",
          rating_average: 4,
          rating_count: 1,
        },
      ]);
    });
  });

  it("Should fetch coffees when fetchCoffees gets called", async () => {
    const useClientMock = vi.fn();

    vi.mocked(useSelector).mockReturnValue("1");

    vi.mocked(useClientService).mockReturnValue([useClientMock]);

    useClientMock.mockResolvedValueOnce([]);

    const { result } = renderHook(() =>
      useManageCoffeesState({
        personalized: true,
      }),
    );

    await waitFor(() => {
      expect(result.current[2]).toEqual(false);
    });

    useClientMock.mockResolvedValueOnce([
      {
        _id: "1",
        name: "Coffee 1",
        owner_id: "1",
        owner_name: "Owner 1",
        rating_average: 4,
        rating_count: 1,
      },
      {
        _id: "2",
        name: "Coffee 2",
        owner_id: "1",
        owner_name: "Owner 1",
        rating_average: 4,
        rating_count: 1,
      },
    ]);

    await result.current[1]();

    expect(useClientMock).toHaveBeenCalledWith({
      function: CoffeesService.listCoffeesWithRatingSummaryApiV1CoffeesGet,
      args: [1, 10, "1"],
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "1",
          name: "Coffee 1",
          owner_id: "1",
          owner_name: "Owner 1",
          rating_average: 4,
          rating_count: 1,
        },
        {
          _id: "2",
          name: "Coffee 2",
          owner_id: "1",
          owner_name: "Owner 1",
          rating_average: 4,
          rating_count: 1,
        },
      ]);
    });
  });

  it("Should add coffee to coffees", async () => {
    let callback: (coffee: CoffeeSchema) => void = () => {};

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

    useClientMock.mockResolvedValueOnce([]);

    const { result } = renderHook(() =>
      useManageCoffeesState({
        personalized: false,
      }),
    );

    await waitFor(() => {
      expect(result.current[2]).toEqual(false);
    });

    useClientMock.mockResolvedValueOnce([
      {
        _id: "1",
        name: "Coffee 1",
        owner_id: "1",
        owner_name: "Owner 1",
        rating_average: 4,
        rating_count: 1,
      },
      {
        _id: "2",
        name: "Coffee 2",
        owner_id: "1",
        owner_name: "Owner 1",
        rating_average: 4,
        rating_count: 1,
      },
    ]);

    callback({
      _id: "3",
      name: "Coffee 3",
      owner_id: "1",
      owner_name: "Owner 1",
      rating_average: 4,
      rating_count: 1,
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "3",
          name: "Coffee 3",
          owner_id: "1",
          owner_name: "Owner 1",
          rating_average: 4,
          rating_count: 1,
        },
      ]);
    });

    callback({
      _id: "4",
      name: "Coffee 4",
      owner_id: "1",
      owner_name: "Owner 1",
      rating_average: 4,
      rating_count: 1,
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "4",
          name: "Coffee 4",
          owner_id: "1",
          owner_name: "Owner 1",
          rating_average: 4,
          rating_count: 1,
        },
        {
          _id: "3",
          name: "Coffee 3",
          owner_id: "1",
          owner_name: "Owner 1",
          rating_average: 4,
          rating_count: 1,
        },
      ]);
    });
  });

  it("Should update coffee in coffees", async () => {
    const useClientMock = vi.fn();

    vi.mocked(useSelector).mockReturnValue(undefined);

    vi.mocked(useClientService).mockReturnValue([useClientMock]);

    useClientMock.mockResolvedValueOnce([
      {
        _id: "1",
        name: "Coffee 1",
        owner_id: "1",
        owner_name: "Owner 1",
        rating_average: 4,
        rating_count: 1,
      },
      {
        _id: "2",
        name: "Coffee 2",
        owner_id: "1",
        owner_name: "Owner 1",
        rating_average: 4,
        rating_count: 1,
      },
    ]);

    const { result } = renderHook(() =>
      useManageCoffeesState({
        personalized: false,
      }),
    );

    await waitFor(() => {
      expect(result.current[2]).toEqual(false);
    });

    const coffee: CoffeeSchema = {
      _id: "1",
      name: "Coffee 1 Updated",
      owner_id: "1",
      owner_name: "Owner 1",
      rating_average: 4,
      rating_count: 1,
    };

    result.current[3](coffee);

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "1",
          name: "Coffee 1 Updated",
          owner_id: "1",
          owner_name: "Owner 1",
          rating_average: 4,
          rating_count: 1,
        },
        {
          _id: "2",
          name: "Coffee 2",
          owner_id: "1",
          owner_name: "Owner 1",
          rating_average: 4,
          rating_count: 1,
        },
      ]);
    });
  });

  it("Should delete coffee from coffees", async () => {
    const useClientMock = vi.fn();

    vi.mocked(useSelector).mockReturnValue(undefined);

    vi.mocked(useClientService).mockReturnValue([useClientMock]);

    useClientMock.mockResolvedValueOnce([
      {
        _id: "1",
        name: "Coffee 1",
        owner_id: "1",
        owner_name: "Owner 1",
        rating_average: 4,
        rating_count: 1,
      },
      {
        _id: "2",
        name: "Coffee 2",
        owner_id: "1",
        owner_name: "Owner 1",
        rating_average: 4,
        rating_count: 1,
      },
    ]);

    const { result } = renderHook(() =>
      useManageCoffeesState({
        personalized: false,
      }),
    );

    await waitFor(() => {
      expect(result.current[2]).toEqual(false);
    });

    result.current[4]("1");

    await waitFor(() => {
      expect(result.current[0]).toEqual([
        {
          _id: "2",
          name: "Coffee 2",
          owner_id: "1",
          owner_name: "Owner 1",
          rating_average: 4,
          rating_count: 1,
        },
      ]);
    });
  });
});
