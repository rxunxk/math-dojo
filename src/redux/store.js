import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./slices/ScoreSlice";

export const store = configureStore({
  reducer: {
    score: scoreReducer,
  },
  devTools: true,
});
