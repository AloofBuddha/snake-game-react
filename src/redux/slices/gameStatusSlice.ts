import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum GameStatusType {
  mainMenuState,
  playingState,
  endState,
}

export interface GameStatusState {
  status: GameStatusType;
}

const initialState: GameStatusState = {
  status: GameStatusType.mainMenuState,
};

export const gameStatusSlice = createSlice({
  name: "gameStatus",
  initialState,
  reducers: {
    startGame: (state) => {
      state.status = GameStatusType.playingState;
    },
    endGame: (state) => {
      state.status = GameStatusType.endState;
    },
    restartGame: (state) => {
      state.status = GameStatusType.playingState;
    },
    returnToMenu: (state) => {
      state.status = GameStatusType.mainMenuState;
    },
  },
});

export const { startGame, endGame, restartGame, returnToMenu } =
  gameStatusSlice.actions;

export const selectGameStatus = (state: RootState) =>
  (state.gameStatus as GameStatusState).status;

export default gameStatusSlice.reducer;
