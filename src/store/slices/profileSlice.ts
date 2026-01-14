/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  data: null,
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state: any, action: PayloadAction<boolean>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null
    },
    setProfileLoading: (state: any, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProfileError: (state: any, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearHomeData: (state: any) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
    setProfileLoading,
    setProfileData,
    setProfileError,
    clearHomeData,
} = profileSlice.actions;

export default profileSlice.reducer;