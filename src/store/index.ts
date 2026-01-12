import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./slices/homeSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    profile: profileReducer,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
