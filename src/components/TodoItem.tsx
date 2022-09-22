import { ReactNode } from 'react';

import dateFormater from '../helpers/dateFormater';
import classes from './TodoItem.module.css';

type TodoItemProps = {
  children?: ReactNode;
  id: string;
  text: string;
  done: boolean;
  creationDate: Date;
  expirationDate: Date;
};

const TodoItem = (props: TodoItemProps) => {
  return (
    <li className={classes.item}>
      <div className={classes.text}>{props.text}</div>
      <div className={classes.other}>
        <div className={classes.icons}></div>
        <div className={classes.dates}>
          <div>
            <span>Created:</span> {dateFormater(props.creationDate)}
          </div>
          <div>
            <span>Expires:</span> {dateFormater(props.expirationDate)}
          </div>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
