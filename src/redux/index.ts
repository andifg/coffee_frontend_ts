import { configureStore } from "@reduxjs/toolkit";
import CoffeeIdsReducer from "./CoffeeReducer/CoffeesReducer";
import UserReducer from "./UserReducer/UserReducer";
import GeneralConfigState from "./GeneralConfigReducer";

export const store = configureStore({
  reducer: {
    coffeeIds: CoffeeIdsReducer,
    user: UserReducer,
    generalConfig: GeneralConfigState,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
