import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { todosActions } from '../store/store';
import classes from './Input.module.css';

type InputProps = {
  onOpenCreateTodoModal: () => void;
};

function Input(props: InputProps) {
  const dispatch = useDispatch();
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }
    dispatch(todosActions.addTodo({ enteredText, id: uuidv4() }));
    todoTextInputRef.current!.value = '';
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <input ref={todoTextInputRef} type="text" placeholder="Enter todo text" />
      <button type="button" onClick={props.onOpenCreateTodoModal}>
        +
      </button>
    </form>
  );
}

export default Input;
