import { describe } from "vitest";
import {
  addCoffeeId,
  deleteAllCoffeeIds,
  deleteCoffeeId,
  setCoffeeIds,
} from "./CoffeeIdsReducer";

import CoffeeIdsReducer from "./CoffeeIdsReducer";
import { it, expect } from "vitest";

describe("CoffeeIdsReducer", () => {
  it("Should add coffee id to state", () => {
    expect(
      CoffeeIdsReducer(
        {
          coffeeIds: [],
        },
        addCoffeeId("1"),
      ),
    ).toEqual({
      coffeeIds: ["1"],
    });
  });

  it("Should add coffee id to beginning of state", () => {
    expect(
      CoffeeIdsReducer(
        {
          coffeeIds: ["1"],
        },
        addCoffeeId("2"),
      ),
    ).toEqual({ coffeeIds: ["2", "1"] });
  });

  it("Should delete coffee id from state", () => {
    expect(
      CoffeeIdsReducer(
        {
          coffeeIds: ["1", "2"],
        },
        deleteAllCoffeeIds(),
      ),
    ).toEqual({ coffeeIds: [] });
  });

  it("Should delete single coffee id from state", () => {
    expect(
      CoffeeIdsReducer(
        {
          coffeeIds: ["1", "2"],
        },
        deleteCoffeeId("1"),
      ),
    ).toEqual({ coffeeIds: ["2"] });
  });

  it("Should ignore non existing id in delete", () => {
    expect(
      CoffeeIdsReducer(
        {
          coffeeIds: ["1", "2"],
        },
        deleteCoffeeId("3"),
      ),
    ).toEqual({ coffeeIds: ["1", "2"] });
  });

  it("Should set coffee ids", () => {
    expect(
      CoffeeIdsReducer(
        { coffeeIds: ["2", "5"] },
        setCoffeeIds(["6", "8", "4"]),
      ),
    ).toEqual({ coffeeIds: ["6", "8", "4"] });
  });
});
