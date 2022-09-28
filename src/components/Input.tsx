import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Button from './Button';
import SortButton from './SortButton';
import { filters, todosActions } from '../store/store';

import classes from './Input.module.css';

type InputProps = {
  onOpenCreateTodoModal: () => void;
};

function Input(props: InputProps) {
  const dispatch = useDispatch();
  const [enteredText, setEnteredText] = useState('');

  const inputChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.replace(
      /[$&+~,:;=?[\]@#|{}'<>.^*()%!-/]/,
      ''
    );
    setEnteredText(value);
  };

  function submitHandler(event: FormEvent) {
    event.preventDefault();
    if (enteredText.trim().length === 0) {
      return;
    }
    dispatch(todosActions.addTodo({ enteredText, id: uuidv4() }));
    dispatch(todosActions.filterBy(filters.ALL));
    setEnteredText('');
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <SortButton />
      <input
        className={classes.input}
        type="text"
        placeholder="Enter todo text"
        value={enteredText}
        onChange={inputChangeHandler}
      />
      <Button className={classes.plus} onClick={props.onOpenCreateTodoModal}>
        +
      </Button>
    </form>
  );
}

export default Input;
