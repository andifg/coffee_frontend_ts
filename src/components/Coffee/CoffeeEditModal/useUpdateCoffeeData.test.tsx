import { renderHook } from "@testing-library/react";
import { describe, vi, it, expect } from "vitest";
import useClientService from "../../../hooks/useClientService";
import { CoffeesService, CoffeeImagesService } from "../../../client";
import { useUpdateCoffeeData } from "./useUpdateCoffeeData";

describe("useUpdateCoffeeData", () => {
  vi.mock("./useClientService", () => ({
    default: vi.fn(),
  }));

  it("Don't update name if its same as before", () => {
    const useClientServiceMock = vi.fn();

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    const { result } = renderHook(() =>
      useUpdateCoffeeData({
        coffee_id: "1",
        initalCoffeeName: "Test Coffee",
        updateCoffeeName: vi.fn(),
        initalCoffeeImageURL: "teststring",
        updateCoffeeImage: vi.fn(),
      }),
    );

    result.current[0]("Test Coffee", "1", "Test Owner");

    expect(useClientServiceMock).not.toHaveBeenCalled();
  });

  it("Update name if its different from before", async () => {
    const useClientServiceMock = vi.fn();

    const updateCoffeeNameMock = vi.fn();

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    useClientServiceMock.mockResolvedValueOnce({
      _id: "1",
      name: "Test Coffee 2",
    });

    const { result } = renderHook(() =>
      useUpdateCoffeeData({
        coffee_id: "1",
        initalCoffeeName: "Test Coffee",
        updateCoffeeName: updateCoffeeNameMock,
        initalCoffeeImageURL: "teststring",
        updateCoffeeImage: vi.fn(),
      }),
    );

    await result.current[0]("Test Coffee 2", "1", "Test Owner");

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeesService.patchCoffeeApiV1CoffeesCoffeeIdPatch,
      rethrowError: true,
      args: [
        "1",
        { name: "Test Coffee 2", owner_id: "1", owner_name: "Test Owner" },
      ],
    });

    expect(updateCoffeeNameMock).toHaveBeenCalledWith("Test Coffee 2");
  });

  it("Should update image", async () => {
    const useClientServiceMock = vi.fn();

    const upateCoffeeFileMock = vi.fn();

    const image = new File([""], "test.png", {
      type: "image/png",
    });

    useClientServiceMock.mockResolvedValueOnce({});

    vi.mocked(useClientService).mockReturnValue([useClientServiceMock]);

    const { result } = renderHook(() =>
      useUpdateCoffeeData({
        coffee_id: "1",
        initalCoffeeName: "Test Coffee",
        updateCoffeeName: vi.fn(),
        initalCoffeeImageURL: "teststring",
        updateCoffeeImage: upateCoffeeFileMock,
      }),
    );

    await result.current[1](image);

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeeImagesService.createImageApiV1CoffeesCoffeeIdImagePost,
      rethrowError: true,
      args: ["1", { file: image }],
    });

    expect(upateCoffeeFileMock).toHaveBeenCalledWith(image);
  });
});
