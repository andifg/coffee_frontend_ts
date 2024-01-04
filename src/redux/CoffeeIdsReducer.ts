import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CoffeeIdsInitalState {
  coffeeIds: string[];
}
const initialState: CoffeeIdsInitalState = {
  coffeeIds: [],
};

export const coffeeIdsSlice = createSlice({
  name: "coffeeIDs",
  initialState,
  reducers: {
    addCoffeeId: (state, action: PayloadAction<string>) => {
      state.coffeeIds = [action.payload, ...state.coffeeIds];
    },
    deleteAllCoffeeIds: (state) => {
      console.log("cleanup callled");
      state.coffeeIds = [];
    },
    deleteCoffeeId: (state, action: PayloadAction<string>) => {
      state.coffeeIds = state.coffeeIds.filter((id) => id !== action.payload);
    },
    setCoffeeIds: (state, action: PayloadAction<string[]>) => {
      state.coffeeIds = action.payload;
    },
  },
});

export const { addCoffeeId, deleteAllCoffeeIds, deleteCoffeeId, setCoffeeIds } =
  coffeeIdsSlice.actions;
export default coffeeIdsSlice.reducer;
