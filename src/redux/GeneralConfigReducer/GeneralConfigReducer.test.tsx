import { describe, expect, it } from "vitest";
import GeneralConfigReducer from "./GeneralConfigReducer";
import {
  setRecursiveLoading,
  incrementRealoadCount,
} from "./GeneralConfigReducer";

describe("GeneralConfigReducer", () => {
  it("Should set recursive loading", () => {
    expect(
      GeneralConfigReducer(
        {
          realoadCount: 0,
          recursiveLoading: false,
        },
        setRecursiveLoading(true),
      ),
    ).toEqual({
      realoadCount: 0,
      recursiveLoading: true,
    });
  });

  it("Should increment reaload count", () => {
    expect(
      GeneralConfigReducer(
        {
          realoadCount: 0,
          recursiveLoading: false,
        },
        incrementRealoadCount(),
      ),
    ).toEqual({
      realoadCount: 1,
      recursiveLoading: false,
    });
  });
});
