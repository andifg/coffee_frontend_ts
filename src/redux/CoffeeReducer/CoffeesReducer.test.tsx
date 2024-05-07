import { describe } from "vitest";
import {
  addCoffee,
  deleteAllCoffees,
  deleteCoffee,
  setCoffees,
} from "./CoffeesReducer";

import CoffeesReducer from "./CoffeesReducer";
import { it, expect } from "vitest";

describe("CoffeesReducer", () => {
  it("Should add coffee to state", () => {
    expect(
      CoffeesReducer(
        {
          coffees: [],
        },
        addCoffee({ _id: "1", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }),
      ),
    ).toEqual({
      coffees: [{ _id: "1", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }],
    });
  });

  it("Should add coffee to beginning of state", () => {
    expect(
      CoffeesReducer(
        {
          coffees: [{ _id: "1", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }],
        },
        addCoffee({ _id: "2", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }),
      ),
    ).toEqual({ coffees: [{ _id: "2", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 },{ _id: "1", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }] });
  });

  it("Should delete all coffees from state", () => {
    expect(
      CoffeesReducer(
        {
          coffees: [{ _id: "1", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }, { _id: "2", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }],
        },
        deleteAllCoffees(),
      ),
    ).toEqual({ coffees: [] });
  });

  it("Should delete single coffee id from state", () => {
    expect(
      CoffeesReducer(
        {
          coffees: [{ _id: "1", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }, { _id: "2", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }],
        },
        deleteCoffee({ _id: "1", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }),
      ),
    ).toEqual({ coffees: [{ _id: "2", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }] });
  });

  it("Should ignore non existing coffee in delete", () => {
    expect(
      CoffeesReducer(
        {
          coffees: [{ _id: "1", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }, { _id: "2", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }],
        },
        deleteCoffee({ _id: "3", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }),
      ),
    ).toEqual({ coffees: [{ _id: "1", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }, { _id: "2", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }] });
  });

  it("Should set coffee ids", () => {
    expect(
      CoffeesReducer(
        { coffees: [{ _id: "1", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }, { _id: "2", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }] },
        setCoffees([{ _id: "6", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }, { _id: "8", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }, { _id: "4", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }]),
      ),
    ).toEqual({ coffees: [{ _id: "6", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }, { _id: "8", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }, { _id: "4", name: "test", owner_id: "1", owner_name: "test", rating_average: 0, rating_count: 0 }] });
  });
});
