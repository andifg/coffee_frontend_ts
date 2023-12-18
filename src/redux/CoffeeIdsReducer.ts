import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CoffeesService, ApiError } from "../client";

export const fetchCoffeeIds = createAsyncThunk(
  "coffeeIds/fetchCoffeeIds",
  async (_, { rejectWithValue }) => {
    try {
      const data: string[] =
        await CoffeesService.listCoffeeIdsApiV1CoffeesIdsGet();
      return data;
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          return rejectWithValue("Unauthorized");
        }
        console.log(err);
      }
      return rejectWithValue("Error during fetchCoffeeIds");
    }
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
      state.coffeeIds = [action.payload, ...state.coffeeIds];
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
      state.coffeeIds = action.payload;
    });
  },
});

export const { addCoffeeId, deleteAllCoffeeIds, deleteCoffeeId } =
  coffeeIdsSlice.actions;
export default coffeeIdsSlice.reducer;
