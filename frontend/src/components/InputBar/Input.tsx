import { useState, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { faSort } from '@fortawesome/free-solid-svg-icons';

import Button from '../UI/Button/Button';
import SortButton from './SortButton/SortButton';
import { filters, todosActions } from '../../store/todosSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { inputPlaceholder } from '../../constants';

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

    dispatch(todosActions.addTodo({ enteredText, id: uuidv4() }));
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
