import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CoffeesService } from "../client";

export const fetchCoffeeIds = createAsyncThunk(
  "coffeeIds/fetchCoffeeIds",
  async () => {
    const data: string[] =
      await CoffeesService.listCoffeeIdsApiV1CoffeesIdsGet();
    console.log("data", data);
    return data;
  },
);

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
      state.coffeeIds = [...state.coffeeIds, action.payload];
    },
    deleteAllCoffeeIds: (state) => {
      console.log("cleanup callled");
      state.coffeeIds = [];
    },
    deleteCoffeeId: (state, action: PayloadAction<string>) => {
      state.coffeeIds = state.coffeeIds.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCoffeeIds.fulfilled, (state, action) => {
      // Add user to the state array
      state.coffeeIds = action.payload;
    });
  },
});

export const { addCoffeeId, deleteAllCoffeeIds, deleteCoffeeId } =
  coffeeIdsSlice.actions;
export default coffeeIdsSlice.reducer;
