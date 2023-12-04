import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import scoreReducer from "./slices/scoreSlice";
import gameStatusSlice from "./slices/gameStatusSlice";

export const store = configureStore({
  reducer: {
    score: scoreReducer,
    gameStatus: gameStatusSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
