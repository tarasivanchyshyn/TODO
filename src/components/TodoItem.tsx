import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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

  const toggleHandler = () => dispatch(todosActions.toggleTodo(id));
  const deleteHandler = () => dispatch(todosActions.removeTodo(id));

  const crossed = `${done ? classes.crossed : ''}`;

  const { item, input, txt, other, icons, icon, cross, dates, date, header } =
    classes;

  return (
    <li className={item}>
      <input
        type="checkbox"
        checked={done}
        onChange={toggleHandler}
        className={input}
      />
      <div className={`${txt} ${crossed}`}>{text}</div>
      <div className={other}>
        <div className={icons}>
          <FontAwesomeIcon
            icon={faXmark}
            className={`${icon} ${cross}`}
            onClick={deleteHandler}
          />
        </div>
        <div className={`${dates} ${crossed}`}>
          <div className={date}>
            <span className={header}>Created: </span>
            {dateFormater(creationDate)}
          </div>
          <div className={date}>
            <span className={header}>Expires: </span>
            {dateFormater(expirationDate)}
          </div>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
