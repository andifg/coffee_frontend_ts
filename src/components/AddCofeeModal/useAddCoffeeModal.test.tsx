import { describe, it, vi, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { useAddCoffeeModal } from "./useAddCoffeeModal";

import callClientServiceMethod from "../../hooks/useClientService";
import { CoffeesService, CoffeeImagesService } from "../../client";
import { useDispatch } from "react-redux";
import { ApiError } from "../../client";

describe("useAddCoffeeModal", () => {
  vi.mock("react-redux", () => ({
    useDispatch: vi.fn(),
  }));

  vi.mock("react-redux", () => ({
    useDispatch: vi.fn(),
  }));

  vi.mock("./useClientService", () => ({
    default: vi.fn().mockReturnValue([vi.fn()]),
  }));

  it("Handle cancle", () => {
    const cancleMock = vi.fn();

    const { result } = renderHook(() =>
      useAddCoffeeModal({
        closeModal: cancleMock,
        open: true,
        currentUUID: "123",
      }),
    );

    result.current.handleCancel();

    expect(cancleMock).toHaveBeenCalled();
  });

  it("Set error", async () => {
    const { result } = renderHook(() =>
      useAddCoffeeModal({
        closeModal: () => {},
        open: true,
        currentUUID: "123",
      }),
    );

    result.current.setError("Error");

    await waitFor(() => {
      expect(result.current.error).toEqual("Error");
    });
  });

  it("Set loading", async () => {
    const { result } = renderHook(() =>
      useAddCoffeeModal({
        closeModal: () => {},
        open: true,
        currentUUID: "123",
      }),
    );

    result.current.setLoading(true);

    await waitFor(() => {
      expect(result.current.loading).toEqual(true);
    });
  });

  it("Handle submit with empty new name", async () => {
    const { result } = renderHook(() =>
      useAddCoffeeModal({
        closeModal: () => {},
        open: true,
        currentUUID: "123",
      }),
    );

    await result.current.handleSubmit("", undefined);

    await waitFor(() => {
      expect(result.current.error).toEqual("Coffee name cannot be empty");
    });
  });

  it("Handle submit with new name", async () => {
    const useDispatchMock = vi.fn();

    vi.mocked(useDispatch).mockReturnValue(useDispatchMock);

    const closeModelMock = vi.fn();

    const useClientServiceMock = vi.fn();

    useClientServiceMock.mockResolvedValueOnce({
      _id: "1",
      name: "Test Coffee",
    });

    useClientServiceMock.mockResolvedValueOnce({});

    vi.mocked(callClientServiceMethod).mockReturnValue([useClientServiceMock]);

    const { result } = renderHook(() =>
      useAddCoffeeModal({
        closeModal: closeModelMock,
        open: true,
        currentUUID: "123",
      }),
    );

    const file = new File([""], "filename", { type: "text/plain" });

    await result.current.handleSubmit("New Coffee", file);

    await waitFor(() => {
      expect(result.current.loading).toEqual(true);
    });

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeesService.postCoffeeApiV1CoffeesPost,
      args: [{ _id: "123", name: "New Coffee" }],
    });

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeeImagesService.createImageApiV1CoffeesCoffeeIdImagePost,
      args: ["123", { file }],
    });

    await waitFor(() => {
      expect(useDispatchMock).toHaveBeenCalledWith({
        type: "coffeeIDs/addCoffeeId",
        payload: "123",
      });
    });

    await waitFor(() => {
      expect(closeModelMock).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(result.current.loading).toEqual(false);
    });
  });

  it("Handle trimming of coffee name", async () => {
    const useDispatchMock = vi.fn();

    vi.mocked(useDispatch).mockReturnValue(useDispatchMock);

    const useClientServiceMock = vi.fn();

    useClientServiceMock.mockResolvedValueOnce({
      _id: "1",
      name: "Test Coffee",
    });

    useClientServiceMock.mockResolvedValueOnce({});

    vi.mocked(callClientServiceMethod).mockReturnValue([useClientServiceMock]);

    const { result } = renderHook(() =>
      useAddCoffeeModal({
        closeModal: vi.fn(),
        open: true,
        currentUUID: "123",
      }),
    );

    await result.current.handleSubmit("New Coffee ", undefined);

    await waitFor(() => {
      expect(result.current.loading).toEqual(true);
    });

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeesService.postCoffeeApiV1CoffeesPost,
      args: [{ _id: "123", name: "New Coffee" }],
    });
  });

  it("Handle error during image upload", async () => {
    const useDispatchMock = vi.fn();

    vi.mocked(useDispatch).mockReturnValue(useDispatchMock);

    const useClientServiceMock = vi.fn();

    useClientServiceMock.mockResolvedValueOnce({
      _id: "1",
      name: "Test Coffee",
    });

    useClientServiceMock.mockRejectedValueOnce(
      new ApiError(
        { method: "POST", url: "mockurl" },
        {
          url: "mockurl",
          ok: true,
          status: 500,
          statusText: "Server Error",
          body: { detail: "Mock Error" },
        },
        "Error during post",
      ),
    );

    vi.mocked(callClientServiceMethod).mockReturnValue([useClientServiceMock]);

    const { result } = renderHook(() =>
      useAddCoffeeModal({
        closeModal: vi.fn(),
        open: true,
        currentUUID: "123",
      }),
    );

    const file = new File([""], "filename", { type: "text/plain" });

    await result.current.handleSubmit("New Coffee", file);

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeesService.postCoffeeApiV1CoffeesPost,
      args: [{ _id: "123", name: "New Coffee" }],
    });

    expect(useClientServiceMock).toHaveBeenCalledWith({
      function: CoffeeImagesService.createImageApiV1CoffeesCoffeeIdImagePost,
      args: ["123", { file }],
    });

    await waitFor(() => {
      expect(result.current.error).toEqual("Mock Error");
    });

    await waitFor(() => {
      expect(result.current.loading).toEqual(false);
    });
  });
});
