import { ReactNode } from 'react';

import dateFormater from '../helpers/dateFormater';
import { Todo } from '../store/store';

import classes from './TodoItem.module.css';

type TodoItemProps = {
  children?: ReactNode;
  item: Todo;
};

const TodoItem = (props: TodoItemProps) => {
  const { text, creationDate, expirationDate } = props.item;

  return (
    <li className={classes.item}>
      <div className={classes.text}>{text}</div>
      <div className={classes.other}>
        <div className={classes.icons}></div>
        <div className={classes.dates}>
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
