// import { useContext } from "react";
// import { describe, vi, it, expect } from "vitest";
// import useClientService from "../../hooks/useClientService";
// import { useManageCoffeeDrinksState } from "./useManageCoffeeDrinksState";
// import { renderHook, waitFor } from "@testing-library/react";
// import { BrewingMethod, CoffeesService } from "../../client";
// import { useSelector } from "react-redux";
// import { Coffee as CoffeeSchema } from "../../client";
// import useInfiniteScroll from "../useInfiniteScroll/useInfinteScroll";

// describe("useManageCoffeesState", () => {
//   vi.mock("react", async (importOriginal) => {
//     const actual = await importOriginal<typeof import("react")>();
//     return {
//       ...actual,
//       useContext: vi.fn().mockReturnValue({
//         setCallback: vi.fn(),
//       }),
//     };
//   });

//   vi.mock("react-redux", () => ({
//     useSelector: vi.fn(),
//   }));

//   vi.mock("./useInfinteScroll", () => ({
//     default: vi.fn(),
//   }));

//   vi.mock("../../hooks/useClientService", () => ({
//     default: vi.fn().mockReturnValue(vi.fn()),
//   }));

//   it("Should fetch first coffee page on intial render", async () => {
//     const useClientMock = vi.fn();
//     const resetTriggeredMock = vi.fn();

//     vi.mocked(useSelector).mockReturnValue(undefined);

//     vi.mocked(useInfiniteScroll).mockReturnValue([true, resetTriggeredMock]);
//     vi.mocked(useClientService).mockReturnValue([useClientMock]);

//     useClientMock.mockResolvedValue([
//       {
//         _id: "1",
//         name: "Coffee 1",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//       {
//         _id: "2",
//         name: "Coffee 2",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//     ]);

//     const { result } = renderHook(() => useManageCoffeeDrinksState());

//     expect(result.current[2]).toEqual(true);

//     await waitFor(() => {
//       expect(result.current[2]).toEqual(false);
//     });

//     await waitFor(() => {
//       expect(result.current[0]).toEqual([
//         {
//           _id: "1",
//           name: "Coffee 1",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//         {
//           _id: "2",
//           name: "Coffee 2",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//       ]);
//     });

//     expect(useClientMock).toHaveBeenCalledWith({
//       function: CoffeesService.listCoffeesWithRatingSummaryApiV1CoffeesGet,
//       args: [1, 5, undefined, undefined],
//     });

//     expect(resetTriggeredMock).toHaveBeenCalled();
//   });

// it("Should fetch coffees when personlized changes", async () => {
//   const useClientMock = vi.fn();
//   const resetTriggeredMock = vi.fn();

//   vi.mocked(useSelector).mockReturnValue("1");

//   vi.mocked(useClientService).mockReturnValue([useClientMock]);
//   vi.mocked(useInfiniteScroll).mockReturnValue([true, resetTriggeredMock]);

//   useClientMock.mockResolvedValueOnce([]);

//   const initialProps = {
//     personalized: false,
//   };

//   const { rerender, result } = renderHook(
//     (props = { personalized: false }) => useManageCoffeeDrinksState(),
//     {
//       initialProps,
//     },
//   );

//   await waitFor(() => {
//     expect(result.current[2]).toEqual(false);
//   });

//   useClientMock.mockResolvedValueOnce([
//     {
//       _id: "1",
//       name: "Coffee 1",
//       owner_id: "1",
//       owner_name: "Owner 1",
//       rating_average: 4,
//       rating_count: 1,
//     },
//     {
//       _id: "2",
//       name: "Coffee 2",
//       owner_id: "1",
//       owner_name: "Owner 1",
//       rating_average: 4,
//       rating_count: 1,
//     },
//   ]);

//   rerender({ personalized: true });

//   expect(useClientMock).toHaveBeenCalledWith({
//     function: CoffeesService.listCoffeesWithRatingSummaryApiV1CoffeesGet,
//     args: [1, 5, "1", undefined],
//   });

//   expect(useClientMock).toHaveBeenCalledTimes(2);

//   await waitFor(() => {
//     expect(result.current[2]).toEqual(false);
//   });

//   await waitFor(() => {
//     expect(result.current[0]).toEqual([
//       {
//         _id: "1",
//         name: "Coffee 1",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//       {
//         _id: "2",
//         name: "Coffee 2",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//     ]);
//   });
// });

//   it("Should fetch coffees when fetchFirstPage gets called", async () => {
//     const useClientMock = vi.fn();
//     const resetTriggeredMock = vi.fn();

//     vi.mocked(useSelector).mockReturnValue("1");

//     vi.mocked(useClientService).mockReturnValue([useClientMock]);
//     vi.mocked(useInfiniteScroll).mockReturnValue([true, resetTriggeredMock]);

//     useClientMock.mockResolvedValueOnce([]);

//     const { result } = renderHook(() => useManageCoffeeDrinksState());

//     await waitFor(() => {
//       expect(result.current[2]).toEqual(false);
//     });

//     useClientMock.mockResolvedValueOnce([
//       {
//         _id: "1",
//         name: "Coffee 1",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//       {
//         _id: "2",
//         name: "Coffee 2",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//     ]);

//     await result.current[1]();

//     expect(useClientMock).toHaveBeenCalledWith({
//       function: CoffeesService.listCoffeesWithRatingSummaryApiV1CoffeesGet,
//       args: [1, 5, "1", undefined],
//     });

//     await waitFor(() => {
//       expect(result.current[0]).toEqual([
//         {
//           _id: "1",
//           name: "Coffee 1",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//         {
//           _id: "2",
//           name: "Coffee 2",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//       ]);
//     });

//     expect(resetTriggeredMock).toHaveBeenCalledTimes(2);
//   });

//   it("Should fetch next page when loadNextPage gets called", async () => {
//     const useClientMock = vi.fn();
//     let fetchMore: () => Promise<void> = () => Promise.resolve();
//     const useInfiniteScrollMock = ({
//       functionToTrigger,
//     }: {
//       functionToTrigger: () => Promise<void>;
//     }): [boolean, () => void] => {
//       fetchMore = functionToTrigger;
//       return [true, () => {}];
//     };

//     vi.mocked(useSelector).mockReturnValue("1");

//     vi.mocked(useClientService).mockReturnValue([useClientMock]);
//     vi.mocked(useInfiniteScroll).mockImplementation(useInfiniteScrollMock);

//     useClientMock.mockResolvedValueOnce([
//       {
//         _id: "1",
//         name: "Coffee 1",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//       {
//         _id: "2",
//         name: "Coffee 2",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//       {
//         _id: "3",
//         name: "Coffee 3",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//       {
//         _id: "4",
//         name: "Coffee 4",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//       {
//         _id: "5",
//         name: "Coffee 5",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//     ]);

//     const { result } = renderHook(() => useManageCoffeeDrinksState());

//     await waitFor(() => {
//       expect(result.current[2]).toEqual(false);
//     });

//     await waitFor(() => {
//       expect(result.current[0]).toEqual([
//         {
//           _id: "1",
//           name: "Coffee 1",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//         {
//           _id: "2",
//           name: "Coffee 2",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//         {
//           _id: "3",
//           name: "Coffee 3",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//         {
//           _id: "4",
//           name: "Coffee 4",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//         {
//           _id: "5",
//           name: "Coffee 5",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//       ]);
//     });

//     useClientMock.mockResolvedValueOnce([
//       {
//         _id: "6",
//         name: "Coffee 6",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//       {
//         _id: "7",
//         name: "Coffee 7",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//     ]);

//     await fetchMore();

//     waitFor(() => {
//       expect(result.current[0]).toEqual([
//         {
//           _id: "1",
//           name: "Coffee 1",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//         {
//           _id: "2",
//           name: "Coffee 2",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//         {
//           _id: "3",
//           name: "Coffee 3",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//         {
//           _id: "4",
//           name: "Coffee 4",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//         {
//           _id: "5",
//           name: "Coffee 5",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//         {
//           _id: "6",
//           name: "Coffee 6",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//         {
//           _id: "7",
//           name: "Coffee 7",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//       ]);
//     });

//     expect(useClientMock.mock.calls).toEqual([
//       [
//         {
//           function: CoffeesService.listCoffeesWithRatingSummaryApiV1CoffeesGet,
//           args: [1, 5, "1", undefined],
//         },
//       ],
//       [
//         {
//           function: CoffeesService.listCoffeesWithRatingSummaryApiV1CoffeesGet,
//           args: [2, 5, "1", "1"],
//         },
//       ],
//     ]);
//   });

//   it("Should add coffee to coffees", async () => {
//     let callback: (coffee: CoffeeSchema) => void = () => {};

//     const setCallback = (func: () => () => void) => {
//       console.log("Setting callback");
//       console.log(func.toString());
//       const call = func();
//       console.log("Callback: ", call.toString());

//       callback = call;
//     };

//     vi.mocked(useContext).mockReturnValue({
//       setCallback,
//     });

//     const useClientMock = vi.fn();

//     vi.mocked(useSelector).mockReturnValue(undefined);

//     vi.mocked(useClientService).mockReturnValue([useClientMock]);

//     useClientMock.mockResolvedValueOnce([]);

//     const { result } = renderHook(() => useManageCoffeeDrinksState());

//     await waitFor(() => {
//       expect(result.current[2]).toEqual(false);
//     });

//     useClientMock.mockResolvedValueOnce([
//       {
//         _id: "1",
//         name: "Coffee 1",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//       {
//         _id: "2",
//         name: "Coffee 2",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//     ]);

//     callback({
//       _id: "3",
//       name: "Coffee 3",
//       roasting_company: "Roasting Company 3",
//       owner_id: "1",
//       owner_name: "Owner 1",
//       rating_average: 4,
//       rating_count: 1,
//     });

//     await waitFor(() => {
//       expect(result.current[0]).toEqual([
//         {
//           _id: "3",
//           name: "Coffee 3",
//           roasting_company: "Roasting Company 3",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//       ]);
//     });

//     callback({
//       _id: "4",
//       name: "Coffee 4",
//       roasting_company: "Roasting Company 4",
//       owner_id: "1",
//       owner_name: "Owner 1",
//       rating_average: 4,
//       rating_count: 1,
//     });

//     await waitFor(() => {
//       expect(result.current[0]).toEqual([
//         {
//           _id: "4",
//           name: "Coffee 4",
//           roasting_company: "Roasting Company 4",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//         {
//           _id: "3",
//           name: "Coffee 3",
//           roasting_company: "Roasting Company 3",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//       ]);
//     });
//   });

//   it("Should update coffee in coffees", async () => {
//     const useClientMock = vi.fn();

//     vi.mocked(useSelector).mockReturnValue(undefined);

//     vi.mocked(useClientService).mockReturnValue([useClientMock]);

//     useClientMock.mockResolvedValueOnce([
//       {
//         _id: "1",
//         name: "Coffee 1",
//         roasting_company: "Roasting Company 1",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//       {
//         _id: "2",
//         name: "Coffee 2",
//         roasting_company: "Roasting Company 2",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//     ]);

//     const { result } = renderHook(() => useManageCoffeeDrinksState());

//     await waitFor(() => {
//       expect(result.current[2]).toEqual(false);
//     });

//     const coffee: CoffeeSchema = {
//       _id: "1",
//       name: "Coffee 1 Updated",
//       roasting_company: "Roasting Company 1",
//       owner_id: "1",
//       owner_name: "Owner 1",
//       rating_average: 4,
//       rating_count: 1,
//     };

//     result.current[3](coffee);

//     await waitFor(() => {
//       expect(result.current[0]).toEqual([
//         {
//           _id: "1",
//           name: "Coffee 1 Updated",
//           roasting_company: "Roasting Company 1",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//         {
//           _id: "2",
//           name: "Coffee 2",
//           roasting_company: "Roasting Company 2",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//       ]);
//     });
//   });

//   it("Should add rating to coffee in coffees", async () => {
//     const useClientMock = vi.fn();

//     vi.mocked(useSelector).mockReturnValue(undefined);

//     vi.mocked(useClientService).mockReturnValue([useClientMock]);

//     useClientMock.mockResolvedValueOnce([
//       {
//         _id: "1",
//         name: "Coffee 1",
//         roasting_company: "Roasting Company 1",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//       {
//         _id: "2",
//         name: "Coffee 2",
//         roasting_company: "Roasting Company 2",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//     ]);

//     const { result } = renderHook(() => useManageCoffeeDrinksState());

//     await waitFor(() => {
//       expect(result.current[2]).toEqual(false);
//     });

//     const rating = {
//       _id: "1",
//       coffee_id: "1",
//       brewing_method: "Espresso" as BrewingMethod,
//       rating: 5,
//     };

//     result.current[4](rating);

//     await waitFor(() => {
//       expect(result.current[0]).toEqual([
//         {
//           _id: "1",
//           name: "Coffee 1",
//           roasting_company: "Roasting Company 1",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4.5,
//           rating_count: 2,
//         },
//         {
//           _id: "2",
//           name: "Coffee 2",
//           roasting_company: "Roasting Company 2",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//       ]);
//     });
//   });

//   it("Should delete coffee from coffees", async () => {
//     const useClientMock = vi.fn();

//     vi.mocked(useSelector).mockReturnValue(undefined);

//     vi.mocked(useClientService).mockReturnValue([useClientMock]);

//     useClientMock.mockResolvedValueOnce([
//       {
//         _id: "1",
//         name: "Coffee 1",
//         roasting_company: "Roasting Company 1",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//       {
//         _id: "2",
//         name: "Coffee 2",
//         roasting_company: "Roasting Company 2",
//         owner_id: "1",
//         owner_name: "Owner 1",
//         rating_average: 4,
//         rating_count: 1,
//       },
//     ]);

//     const { result } = renderHook(() => useManageCoffeeDrinksState());

//     await waitFor(() => {
//       expect(result.current[2]).toEqual(false);
//     });

//     result.current[5]("1");

//     await waitFor(() => {
//       expect(result.current[0]).toEqual([
//         {
//           _id: "2",
//           name: "Coffee 2",
//           roasting_company: "Roasting Company 2",
//           owner_id: "1",
//           owner_name: "Owner 1",
//           rating_average: 4,
//           rating_count: 1,
//         },
//       ]);
//     });
//   });
// });
