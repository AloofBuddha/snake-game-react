import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ScoreState {
  currentGameScore: number;
  highScore: number;
}

const initialState: ScoreState = {
  currentGameScore: 0,
  highScore: 0,
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    increment: (state) => {
      state.currentGameScore += 1;

      if (state.currentGameScore >= state.highScore) {
        state.highScore += 1;
      }
    },
    resetCurrentGameScore: (state) => {
      state.currentGameScore = 0;
    },
  },
});

export const { increment, resetCurrentGameScore } = scoreSlice.actions;

export const selectCurrentGameScore = (state: RootState) =>
  (state.score as ScoreState).currentGameScore;

export const selectHighScore = (state: RootState) =>
  (state.score as ScoreState).highScore;

export default scoreSlice.reducer;
