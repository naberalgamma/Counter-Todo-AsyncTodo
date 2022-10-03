import { createSlice } from "@reduxjs/toolkit";

export type todoElem = {
  id: string;
  text: string;
  completed: boolean;
};
export type todoSliceType = {
  todo: todoElem[];
};
const initialState: todoSliceType = {
  todo: [],
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todo.push({
        id: new Date().toISOString(),
        text: action.payload,
        completed: false,
      });
    },
    toggleCompleted(state, action) {
      const toggleTodo = state.todo.find((todo) => todo.id === action.payload);
      toggleTodo!.completed = !toggleTodo!.completed;
    },
    removeTodo(state, action) {
      state.todo = state.todo.filter((todo) => todo.id !== action.payload);
    },
  },
});
export default todoSlice.reducer;
export const { addTodo, toggleCompleted, removeTodo } = todoSlice.actions;
