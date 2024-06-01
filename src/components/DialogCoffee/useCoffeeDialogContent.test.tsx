import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useCoffeeDialogContent } from "./useCoffeeDialogContent";
import { act } from "react-dom/test-utils";
import React, { ChangeEvent } from "react";
import { createDataURL } from "../../utils/FileReader";

describe("useCoffeeDialogContent", () => {
  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

  vi.mock("../../utils/FileReader", () => ({
    createDataURL: vi.fn(),
  }));

  it("Should set input name and roasting company", () => {
    const { result } = renderHook(() =>
      useCoffeeDialogContent({
        open: true,
        handleCancel: () => {},
        handleSubmit: async () => {},
        setError: () => {},
        imageURL: undefined,
        error: undefined,
        coffeeName: "Testcoffeename",
        roastingCompany: "Bean Company",
        loading: false,
        setLoading: () => {},
        title: "title",
      }),
    );

    expect(result.current[1].coffeeName).toEqual("Testcoffeename");
    expect(result.current[1].roastingCompany).toEqual("Bean Company");
  });

  it("Should reset input name and roasting company", () => {
    const handleCancleMock = vi.fn();
    const setErrorMock = vi.fn();
    const setLoadingMock = vi.fn();

    const { result } = renderHook(() =>
      useCoffeeDialogContent({
        open: true,
        handleCancel: handleCancleMock,
        handleSubmit: async () => {},
        setError: setErrorMock,
        imageURL: "123",
        error: undefined,
        coffeeName: "Testcoffeename",
        roastingCompany: "Bean Company",
        loading: false,
        setLoading: setLoadingMock,
        title: "title",
      }),
    );

    const [, , , , , , handleCancel] = result.current;

    act(() => {
      handleCancel();
    });

    expect(result.current[1].coffeeName).toEqual("");
    expect(result.current[1].roastingCompany).toEqual("");
    expect(result.current[0]).toEqual(undefined);

    expect(handleCancleMock).toHaveBeenCalled();
    expect(setErrorMock).toHaveBeenCalledWith(undefined);
    expect(setLoadingMock).toHaveBeenCalled();
  });

  it("Should handle file change", async () => {
    vi.mocked(createDataURL).mockResolvedValue("MockedDataURL");

    const { result } = renderHook(() =>
      useCoffeeDialogContent({
        open: true,
        handleCancel: () => {},
        handleSubmit: async () => {},
        setError: () => {},
        imageURL: undefined,
        error: undefined,
        coffeeName: "Testcoffeename",
        roastingCompany: "Bean Company",
        loading: false,
        setLoading: () => {},
        title: "title",
      }),
    );

    const [, , , , , , , handleFileChange] = result.current;

    const file = new File([""], "filename", {
      type: "image/png",
    });

    const event = {
      target: {
        files: [file],
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    await act(async () => {
      handleFileChange(event);
    });

    expect(result.current[0]).toEqual("MockedDataURL");

    expect(vi.mocked(createDataURL)).toHaveBeenCalledWith(file);
  });

  it("Should handle bean and company name change and reset error", async () => {
    const setErrorMock = vi.fn();

    const { result } = renderHook(() =>
      useCoffeeDialogContent({
        open: true,
        handleCancel: () => {},
        handleSubmit: async () => {},
        setError: setErrorMock,
        imageURL: undefined,
        error: "Coffee name input error",
        coffeeName: "Testcoffeename",
        roastingCompany: "Bean Company",
        loading: false,
        setLoading: () => {},
        title: "title",
      }),
    );

    const reactChangeEventCoffeeName = {
      target: { value: "New Coffee Name" },
    } as ChangeEvent<HTMLInputElement>;

    const reactChangeEventRoastingCompany = {
      target: { value: "New Roasting Company" },
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current[4](reactChangeEventRoastingCompany);
    });
    act(() => {
      result.current[3](reactChangeEventCoffeeName);
    });

    expect(result.current[1].coffeeName).toEqual("New Coffee Name");
    expect(result.current[1].roastingCompany).toEqual("New Roasting Company");
    expect(setErrorMock).toHaveBeenCalledTimes(2);
  });

  it("Should handle submit", async () => {
    const submitMock = vi.fn();

    vi.mocked(createDataURL).mockResolvedValue("MockedDataURL");

    const { result } = renderHook(() =>
      useCoffeeDialogContent({
        open: true,
        handleCancel: () => {},
        handleSubmit: submitMock,
        setError: () => {},
        imageURL: undefined,
        error: undefined,
        coffeeName: "Testcoffeename",
        roastingCompany: "Bean Company",
        loading: false,
        setLoading: () => {},
        title: "title",
      }),
    );

    const file = new File([""], "filename", {
      type: "image/png",
    });

    const reactChangeEventCoffeeName = {
      target: { value: "New Coffee Name" },
    } as ChangeEvent<HTMLInputElement>;

    const reactChangeEventRoastingCompany = {
      target: { value: "New Roasting Company" },
    } as ChangeEvent<HTMLInputElement>;

    const event = {
      target: {
        files: [file],
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    await act(async () => {
      result.current[7](event);
    });

    act(() => {
      result.current[4](reactChangeEventRoastingCompany);
    });
    act(() => {
      result.current[3](reactChangeEventCoffeeName);
    });

    expect(result.current[1].coffeeName).toEqual("New Coffee Name");
    expect(result.current[1].roastingCompany).toEqual("New Roasting Company");
    expect(result.current[0]).toEqual("MockedDataURL");

    const submitEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    act(() => {
      result.current[5](submitEvent);
    });

    expect(submitMock).toHaveBeenCalledWith("New Coffee Name","New Roasting Company",  file);
  });
});
