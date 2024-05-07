import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Coffee } from "../../client";

export interface CoffeesInitalState {
  coffees: Coffee[];
}
const initialState: CoffeesInitalState = {
  coffees: [],
};

export const coffeesSlice = createSlice({
  name: "coffees",
  initialState,
  reducers: {
    addCoffee: (state, action: PayloadAction<Coffee>) => {
      state.coffees = [action.payload, ...state.coffees];
    },
    deleteAllCoffees: (state) => {
      console.log("cleanup callled");
      state.coffees = [];
    },
    deleteCoffee: (state, action: PayloadAction<Coffee>) => {
      state.coffees = state.coffees.filter((coffee) => coffee._id !== action.payload._id);
    },
    setCoffees: (state, action: PayloadAction<Coffee[]>) => {
      state.coffees = action.payload;
    },
  },
});

export const { addCoffee, deleteAllCoffees, deleteCoffee, setCoffees } =
  coffeesSlice.actions;
export default coffeesSlice.reducer;
