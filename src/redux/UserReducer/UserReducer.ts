import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserRole = "User" | "Admin";

export interface UserState {
  username?: string;
  givenName?: string;
  familyName?: string;
  userId?: string;
  userRole: UserRole;
}

const State: UserState = {
  userRole: "Admin",
};

export const UserSlice = createSlice({
  name: "User",
  initialState: State,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setGivenName: (state, action: PayloadAction<string>) => {
      state.givenName = action.payload;
    },
    setFamilyName: (state, action: PayloadAction<string>) => {
      state.familyName = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.userRole = action.payload;
    },
  },
});

export const {
  setUserRole,
  setUserName,
  setGivenName,
  setFamilyName,
  setUserId,
} = UserSlice.actions;
export default UserSlice.reducer;
