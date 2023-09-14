import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserRole = "User" | "Admin";

export interface UserRoleState {
  userRole: UserRole;
}

const State: UserRoleState = {
  userRole: "User",
};

export const UserRoleSlice = createSlice({
  name: "UserRole",
  initialState: State,
  reducers: {
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.userRole = action.payload;
    },
  },
});

export const { setUserRole } = UserRoleSlice.actions;
export default UserRoleSlice.reducer;
