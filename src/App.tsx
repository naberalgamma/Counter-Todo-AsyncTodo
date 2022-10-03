import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AsyncTodo } from "./components/AsyncTodoList/AsyncTodo";
import { Counter } from "./components/Counter/Counter";
import { Navigation } from "./components/Navigation/Navigation";
import { Todo } from "./components/TodoList/Todo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Counter />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/asyncTodo" element={<AsyncTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
