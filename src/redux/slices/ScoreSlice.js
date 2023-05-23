import { createSlice } from "@reduxjs/toolkit";

const ScoreSlice = createSlice({
  name: "score",
  initialState: 0,
  reducers: {
    addScore: (state, action) => state + action.payload,
  },
});

export const { addScore } = ScoreSlice.actions;

export default ScoreSlice.reducer;
