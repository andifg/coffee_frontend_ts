import { configureStore } from "@reduxjs/toolkit";
import CoffeeIdsReducer from "./CoffeeIdsReducer";
export const store = configureStore({
  reducer: {
    coffeeIds: CoffeeIdsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
