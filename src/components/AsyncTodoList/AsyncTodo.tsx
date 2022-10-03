import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addNewTodo,
  deleteTodo,
  fetchTodo,
  toggleStatus,
} from "../../slices/asyncTodo";
import "./asyncTodo.scss";

export const AsyncTodo: FC = () => {
  const dispatch = useAppDispatch();
  const { list, error, loading } = useAppSelector((state) => state.asyncTodo);
  const [text, setText] = useState("");

  const handleAction = () => {
    dispatch(addNewTodo(text));
    setText("");
  };
  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  return (
    <div>
      <div className="async_input_todo">
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={handleAction}>Add todo</button>
      </div>
      {loading && <h1>Loading...</h1>}
      {error && <h2>Error {error}</h2>}
      <ul className="async_list">
        {list.map((todo) => (
          <label key={todo.id} className="async_todo">
            <input
              className="checkbox"
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleStatus(todo.id))}
            />
            {!todo.completed ? (
              <li className="async_todo_element">{todo.title}</li>
            ) : (
              <li className="async_todo_element_cheked">{todo.title}</li>
            )}

            <button
              className="async_remove"
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              X
            </button>
          </label>
        ))}
      </ul>
    </div>
  );
};
