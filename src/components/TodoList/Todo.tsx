import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addTodo, removeTodo, toggleCompleted } from "../../slices/todoSlice";
import "./Todo.scss";

export const Todo = () => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector((state) => state.todoList.todo);
  const [text, setText] = useState("");

  const handleAction = () => {
    dispatch(addTodo(text));
    setText("");
  };

  return (
    <div>
      <div className="input_todo">
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={handleAction}>Add todo</button>
      </div>
      <ul className="todo_list">
        {todo.map((todo) => (
          <label key={todo.id} className="todo">
            <input
              className="checkbox"
              type="checkbox"
              checked={todo.completed}
              onClick={() => dispatch(toggleCompleted(todo.id))}
            />
            {!todo.completed ? (
              <li className="todo_element">{todo.text}</li>
            ) : (
              <li className="todo_element_cheked">{todo.text}</li>
            )}

            <button
              className="remove"
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              X
            </button>
          </label>
        ))}
      </ul>
    </div>
  );
};

// <div>
//   <div className="btn_container">
//     <input type="text" />
//     <button className="btn" onClick={}>
//       AddTodo
//     </button>
//   </div>
//   <ul>
//     {todo.map((todo, index) => (
//       <label key={todo.id} className="todo">
//         <input
//           className="checkbox"
//           type="checkbox"
//           checked={check}
//           onClick={() => isCheck(index.toString())}
//         />
//         {!check ? (
//           <li className="todo_element">{todo.text}</li>
//         ) : (
//           <li className="todo_element_cheked">{todo.text}</li>
//         )}
//         <button className="remove">X</button>
//       </label>
//     ))}
//   </ul>
// </div>
