import { describe, it, expect } from "vitest";
import { store } from "./index";

describe("index", () => {
  it("should export the store", () => {
    expect(store).toHaveProperty("dispatch");
  });
  it("should export the RootState", () => {
    expect(store).toHaveProperty("subscribe");
  });
  it("should export the AppDispatch", () => {
    expect(store).toHaveProperty("getState");
  });
});
