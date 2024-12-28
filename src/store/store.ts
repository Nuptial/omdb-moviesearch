import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../slices/appSlice"; // Example slice

const store = configureStore({
  reducer: {
    appStore: appReducer,
  },
});

// TypeScript-specific: Export types for dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
