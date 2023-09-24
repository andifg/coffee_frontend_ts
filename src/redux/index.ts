import { configureStore } from "@reduxjs/toolkit";
import CoffeeIdsReducer from "./CoffeeIdsReducer";
import UserRoleReducer from "./UserRoleReducer";
import GeneralConfigState from "./GeneralConfigReducer";

export const store = configureStore({
  reducer: {
    coffeeIds: CoffeeIdsReducer,
    userRole: UserRoleReducer,
    generalConfig: GeneralConfigState,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
