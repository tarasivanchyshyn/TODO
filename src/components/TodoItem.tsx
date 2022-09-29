import { ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Modal from './Modal';
import { todosActions, Todo } from '../store/todosSlice';

import classes from './TodoItem.module.scss';

type TodoItemProps = {
  children?: ReactNode;
  item: Todo;
};

const TodoItem = (props: TodoItemProps) => {
  const { text, creationDate, expirationDate, id, done } = props.item;
  const dispatch = useDispatch();

  const [editModalIsShown, setEditModalIsShown] = useState(false);

  const toggleCreateTodoModal = () => setEditModalIsShown(!editModalIsShown);

  const editHandler = () => toggleCreateTodoModal();
  const toggleHandler = () => dispatch(todosActions.toggleTodo(id));
  const deleteHandler = () => dispatch(todosActions.removeTodo(id));

  const crossed = `${done ? classes.crossed : ''}`;
  const { item, input, txt, other, icons } = classes;
  const { icon, pencil, cross, dates, date, header } = classes;

  return (
    <>
      {editModalIsShown && <Modal onClose={toggleCreateTodoModal} id={id} />}
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
              icon={faPencil}
              className={`${icon} ${pencil}`}
              onClick={editHandler}
            />
            <FontAwesomeIcon
              icon={faXmark}
              className={`${icon} ${cross}`}
              onClick={deleteHandler}
            />
          </div>
          <div className={`${dates} ${crossed}`}>
            <div className={date}>
              <span className={header}>Created: </span>
              {creationDate}
            </div>
            <div className={date}>
              <span className={header}>Expires: </span>
              {expirationDate}
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default TodoItem;
