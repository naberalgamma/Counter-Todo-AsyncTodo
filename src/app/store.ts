import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import asyncTodo from "../slices/asyncTodo";
import countSlice from "../slices/countSlice";
import todoSlice from "../slices/todoSlice";

export const store = configureStore({
  reducer: {
    counter: countSlice,
    todoList: todoSlice,
    asyncTodo: asyncTodo,
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
