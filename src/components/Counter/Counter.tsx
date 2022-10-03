import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { decrement, increment } from "../../slices/countSlice";
import "./Counter.scss";

export const Counter = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.count);
  return (
    <div className="containerCounter">
      <header className="header">
        <h1>{count}</h1>
      </header>

      <button className="btn increment" onClick={() => dispatch(increment())}>
        increment
      </button>
      <button className="btn decrement" onClick={() => dispatch(decrement())}>
        decrement
      </button>
    </div>
  );
};
