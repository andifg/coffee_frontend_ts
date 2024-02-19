import { expect, vi, it, describe } from "vitest";
import { renderHook } from "@testing-library/react";
import useReloadChildren from "./useReloadChildren";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

describe("useReloadChildren", () => {
  vi.mock("react-redux", () => ({
    useDispatch: vi.fn(),
  }));

  it("Should store number of children", () => {
    const actionCreatorMock = vi.fn();

    const { result } = renderHook(() =>
      useReloadChildren(
        3,
        actionCreatorMock as unknown as ActionCreatorWithPayload<
          boolean,
          string
        >,
      ),
    );

    console.log(result.current);
  });

  it("Should call actionCreatorWithPayload when all children are loaded", async () => {
    const actionCreatorMock = vi
      .fn()
      .mockReturnValue({ type: "test", payload: "test" });

    const useDispatchMock = vi.fn();

    vi.mocked(useDispatch).mockReturnValue(useDispatchMock);

    const { result } = renderHook(() =>
      useReloadChildren(
        3,
        actionCreatorMock as unknown as ActionCreatorWithPayload<
          boolean,
          string
        >,
      ),
    );

    result.current[0]();
    result.current[0]();

    expect(actionCreatorMock).toHaveBeenCalledTimes(0);

    result.current[0]();

    expect(actionCreatorMock).toHaveBeenCalledWith(false);
    expect(actionCreatorMock).toHaveBeenCalledTimes(1);

    expect(useDispatchMock).toHaveBeenCalledWith({
      type: "test",
      payload: "test",
    });
  });

  it("Should reset childrenLoadedCount", () => {
    const actionCreatorMock = vi
      .fn()
      .mockReturnValue({ type: "test", payload: "test" });

    const useDispatchMock = vi.fn();

    vi.mocked(useDispatch).mockReturnValue(useDispatchMock);

    const { result } = renderHook(() =>
      useReloadChildren(
        3,
        actionCreatorMock as unknown as ActionCreatorWithPayload<
          boolean,
          string
        >,
      ),
    );

    result.current[0]();
    result.current[0]();

    expect(actionCreatorMock).toHaveBeenCalledTimes(0);

    result.current[1]();

    result.current[0]();

    expect(actionCreatorMock).toHaveBeenCalledTimes(0);

    result.current[0]();
    result.current[0]();

    expect(actionCreatorMock).toHaveBeenCalledWith(false);
  });
});
