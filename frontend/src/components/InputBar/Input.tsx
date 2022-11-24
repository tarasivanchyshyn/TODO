import { useState, FormEvent } from 'react';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

import Button from '../UI/Button/Button';
import SortButton from './SortButton/SortButton';
import { createTodo, filters, todosActions } from '../../store/todosSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { dateFormat, inputPlaceholder } from '../../constants';

import classes from './Input.module.scss';

type InputProps = {
  onOpenCreateTodoModal: () => void;
};

function Input(props: InputProps) {
  const dispatch = useAppDispatch();
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
    if (!enteredText.trim()) return;

    const date = new Date();
    const now = format(date, dateFormat);
    const tomorrow = format(date.setHours(24, 0, 0, 0), dateFormat);

    dispatch(
      createTodo({
        text: enteredText,
        creationDate: now,
        expirationDate: tomorrow
      })
    );
    dispatch(todosActions.filterBy(filters.ALL));
    dispatch(todosActions.setIcon(faSort));
    setEnteredText('');
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <SortButton />
      <input
        className={classes.input}
        type="text"
        placeholder={inputPlaceholder}
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
