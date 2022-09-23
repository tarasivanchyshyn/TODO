import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';

import dateFormater from '../helpers/dateFormater';
import { todosActions } from '../store/store';
import { Todo } from '../store/store';

import classes from './TodoItem.module.css';

type TodoItemProps = {
  children?: ReactNode;
  item: Todo;
};

const TodoItem = (props: TodoItemProps) => {
  const { text, creationDate, expirationDate, id, done } = props.item;
  const dispatch = useDispatch();

  const togglehandler = () => {
    dispatch(todosActions.toggleTodo(id));
  };

  const crossed = `${done ? classes.crossed : ''}`;

  return (
    <li className={classes.item}>
      <input type="checkbox" checked={done} onChange={togglehandler} />
      <div className={`${classes.text} ${crossed}`}>{text}</div>
      <div className={classes.other}>
        <div className={classes.icons}></div>
        <div className={`${classes.dates} ${crossed}`}>
          <div className={classes.date}>
            <span className={classes.header}>Created: </span>
            {dateFormater(creationDate)}
          </div>
          <div className={classes.date}>
            <span className={classes.header}>Expires: </span>
            {dateFormater(expirationDate)}
          </div>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
