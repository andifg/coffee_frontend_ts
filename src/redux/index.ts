import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer/UserReducer";
import GeneralConfigState from "./GeneralConfigReducer/GeneralConfigReducer";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    generalConfig: GeneralConfigState,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
