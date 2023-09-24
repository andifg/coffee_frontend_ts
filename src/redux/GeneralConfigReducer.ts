import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GeneralConfigState {
  recursiveLoading: boolean;
  realoadCount: number;
}

const State: GeneralConfigState = {
  recursiveLoading: false,
  realoadCount: 0,
};

export const GeneralConfigState = createSlice({
  name: "UserRole",
  initialState: State,
  reducers: {
    setRecursiveLoading: (state, action: PayloadAction<boolean>) => {
      state.recursiveLoading = action.payload;
    },
    incrementRealoadCount: (state) => {
      console.log("incrementRealoadCount");
      state.realoadCount += 1;
    },
  },
});

export const { setRecursiveLoading, incrementRealoadCount } =
  GeneralConfigState.actions;
export default GeneralConfigState.reducer;
