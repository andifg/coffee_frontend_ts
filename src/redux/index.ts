import { configureStore } from "@reduxjs/toolkit";
import CoffeeIdsReducer from "./CoffeeIdsReducer";
import UserRoleReducer from "./UserRoleReducer";
export const store = configureStore({
  reducer: {
    coffeeIds: CoffeeIdsReducer,
    userRole: UserRoleReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
