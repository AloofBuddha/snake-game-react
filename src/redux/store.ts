import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import gameStateSlice from "./slices/gameStateSlice";

export const store = configureStore({
  reducer: gameStateSlice,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
