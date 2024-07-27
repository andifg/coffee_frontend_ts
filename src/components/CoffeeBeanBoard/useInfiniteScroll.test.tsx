import { describe, it, expect, vi } from "vitest";
import useInfiniteScroll from "./useInfinteScroll";
import { renderHook } from "@testing-library/react";

describe("useInfiniteScroll", () => {
  it("Should add event listener on mount", () => {
    const addEventListenerMock = vi.fn();

    vi.spyOn(window, "addEventListener").mockImplementation(
      addEventListenerMock,
    );

    const { result } = renderHook(() =>
      useInfiniteScroll({ functionToTrigger: () => Promise.resolve() }),
    );

    expect(result.current[0]).toBe(false);

    expect(addEventListenerMock).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
  });

  // it("Call functionToTrigger when scroll is at the bottom", async () => {

  //     // To be done

  // } );
});
