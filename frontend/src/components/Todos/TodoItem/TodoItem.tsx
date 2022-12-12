import { ReactNode, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';

import Modal from '../../Modals/Modal/Modal';
import {
  Todo,
  updateTodo,
  deleteTodo,
  getTodos
} from '../../../store/todosSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

import classes from './TodoItem.module.scss';

type TodoItemProps = {
  children?: ReactNode;
  item: Todo;
};

const TodoItem = (props: TodoItemProps) => {
  const { text, creationDate, expirationDate, _id, done } = props.item;
  const [editModalIsShown, setEditModalIsShown] = useState(false);
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  const filter = useAppSelector((state) => state.todos.filterBy);

  const todoIndex = todos.findIndex((el) => el._id === _id);
  const todo = todos[todoIndex];

  const toggleCreateTodoModal = () => setEditModalIsShown(!editModalIsShown);

  const editHandler = () => toggleCreateTodoModal();
  const toggleHandler = async () => {
    await dispatch(updateTodo({ id: _id, done: !todo.done }));
    await dispatch(getTodos(filter));
  };
  const deleteHandler = () => dispatch(deleteTodo(_id));

  const crossed = `${done ? classes.crossed : ''}`;
  const { item, input, txt, other, icons } = classes;
  const { icon, pencil, cross, dates, date, header } = classes;

  return (
    <>
      {editModalIsShown && <Modal onClose={toggleCreateTodoModal} id={_id} />}
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
