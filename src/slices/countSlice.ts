import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  count: number;
};
const initialState: initialStateType = {
  count: 0,
};

const countSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
  },
});

export default countSlice.reducer;
export const { increment, decrement } = countSlice.actions;
