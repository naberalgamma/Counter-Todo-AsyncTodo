import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.scss";

export const Navigation = () => {
  return (
    <div className="containerNavigation">
      <nav className="links">
        <Link className="link link_counter" to="/">
          Counter
        </Link>
        <Link className="link link_todo" to="/todo">
          Todo List
        </Link>
        <Link className="link link_asyncTodo" to="/asyncTodo">
          Async Todo List
        </Link>
      </nav>
    </div>
  );
};
