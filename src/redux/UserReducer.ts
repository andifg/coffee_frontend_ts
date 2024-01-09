import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserRole = "User" | "Admin";

export interface UserState {
  username?: string;
  givenName?: string;
  userRole: UserRole;
}

const State: UserState = {
  userRole: "Admin",
};

export const UserSlice = createSlice({
  name: "User",
  initialState: State,
  reducers: {
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.userRole = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setGivenName: (state, action: PayloadAction<string>) => {
      state.givenName = action.payload;
    },
  },
});

export const { setUserRole, setUserName, setGivenName } = UserSlice.actions;
export default UserSlice.reducer;
