import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoState = {
  list: Todo[];
  loading: boolean;
  error: string | null;
};

export const fetchTodo = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>("todo/fetchTodo", async function (_, { rejectWithValue }) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  if (!response.ok) {
    return rejectWithValue("Server error");
  }
  const data = await response.json();

  return data;
});

export const addNewTodo = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string }
>("todos/addNewTodo", async function (text, { rejectWithValue }) {
  const todo = {
    title: text,
    userId: 1,
    completed: false,
  };

  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    return rejectWithValue("Can't add task. Server error.");
  }

  return (await response.json()) as Todo;
});

export const toggleStatus = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string; state: { asyncTodo: TodoState } }
>(
  "todos/toggleStatus",
  async function (id: string, { rejectWithValue, getState }) {
    const todo = getState().asyncTodo.list.find((todo) => todo.id === id);
    if (todo) {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );

      if (!response.ok) {
        return rejectWithValue("Can't toggle status. Server error.");
      }
      return (await response.json()) as Todo;
    }
    return rejectWithValue("No such todo in the list.");
  }
);

export const deleteTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todos/deleteTodo", async function (id, { rejectWithValue }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    return rejectWithValue("Can't delete task. Server error.");
  }
  return id;
});

const initialState: TodoState = {
  list: [],
  loading: false,
  error: null,
};

const asyncTodoSlice = createSlice({
  name: "asyncTodoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        const toggleTodo = state.list.find(
          (todo) => todo.id === action.payload.id
        );
        if (toggleTodo) {
          toggleTodo.completed = !toggleTodo.completed;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo.id !== action.payload);
      });
  },
});
export default asyncTodoSlice.reducer;
