import { renderHook, waitFor } from "@testing-library/react";
import { describe, vi, it, expect, beforeEach } from "vitest";
import useClientService from "../../../hooks/useClientService";
import {
  CoffeesService,
  CoffeeImagesService,
  Coffee as CoffeeSchema,
} from "../../../client";
import { useUpdateCoffeeData } from "./useUpdateCoffeeData";
import { useContext } from "react";

describe("useUpdateCoffeeData", () => {
  const updateCoffeeNameMock = vi.fn();
  const updateCoffeeImageMock = vi.fn();

  vi.mock("react", async (importOriginal) => {
    const actual = await importOriginal<typeof import("react")>();
    return {
      ...actual,
      useContext: vi.fn(),
    };
  });

  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

  vi.mock("../../../hooks/useClientService", () => ({
    default: vi.fn(),
  }));

  vi.mock("../../../hooks/useClientService", () => ({
    default: vi.fn().mockReturnValue([vi.fn()]),
  }));

  beforeEach(() => {
    vi.mocked(useContext)
      .mockReturnValueOnce(updateCoffeeNameMock)
      .mockReturnValueOnce(updateCoffeeImageMock);
  });

  it("Don't update name or roasting company if its same as before", () => {
    const useClientServiceMock = vi.fn();

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    const { result } = renderHook(() =>
      useUpdateCoffeeData({
        coffee_id: "1",
        initalCoffeeName: "Test Coffee",
        initialRoastingCompany: "Roasting Company",
        initalCoffeeImageURL: "teststring",
      }),
    );

    result.current[0]("Test Coffee", "Roasting Company" , "1", "Test Owner");

    expect(useClientServiceMock).not.toHaveBeenCalled();
  });

  it("Update name if its different from before", async () => {
    const useClientServiceMock = vi.fn();

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    useClientServiceMock.mockResolvedValueOnce({
      _id: "1",
      name: "Test Coffee 2",
      roasting_company: "Roasting Company",
      owner_id: "1",
      owner_name: "Test Owner",
      rating_count: 2,
      rating_average: 3,
    } as CoffeeSchema);

    const { result } = renderHook(() =>
      useUpdateCoffeeData({
        coffee_id: "1",
        initalCoffeeName: "Test Coffee",
        initialRoastingCompany: "Roasting Company Old",
        initalCoffeeImageURL: "teststring",
      }),
    );

    await result.current[0]("Test Coffee 2", "Roasting Company 3",  "1", "Test Owner");

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeesService.patchCoffeeApiV1CoffeesCoffeeIdPatch,
      rethrowError: true,
      args: [
        "1",
        { name: "Test Coffee 2", roasting_company: "Roasting Company 3", owner_id: "1", owner_name: "Test Owner" },
      ],
    });

    await waitFor(() => {
      expect(updateCoffeeNameMock).toHaveBeenCalledWith({
        _id: "1",
        name: "Test Coffee 2",
        roasting_company: "Roasting Company 3",
        owner_id: "1",
        owner_name: "Test Owner",
      } as CoffeeSchema);
    });
  });

  it("Should update image", async () => {
    const useClientServiceMock = vi.fn();

    const image = new File([""], "test.png", {
      type: "image/png",
    });

    useClientServiceMock.mockResolvedValueOnce({});

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    const { result } = renderHook(() =>
      useUpdateCoffeeData({
        coffee_id: "1",
        initalCoffeeName: "Test Coffee",
        initialRoastingCompany: "Roasting Company",
        initalCoffeeImageURL: "teststring",
      }),
    );

    await result.current[1](image);

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeeImagesService.createImageApiV1CoffeesCoffeeIdImagePost,
      rethrowError: true,
      args: ["1", { file: image }],
    });
    await waitFor(() => {
      expect(updateCoffeeImageMock).toHaveBeenCalledWith(image);
    });
  });
});
