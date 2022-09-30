import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

import Button from '../../UI/Button/Button';
import { filters, todosActions } from '../../../store/todosSlice';
import { RootState } from '../../../store/store';

import classes from './FilterTodo.module.scss';

function FilterTodo() {
  const dispatch = useDispatch();
  const ref = useRef<HTMLButtonElement>(null);
  const [msgIsShown, setMessageIsShown] = useState(false);
  const items = useSelector((state: RootState) => state.todos.todos);

  const { filterBy, removeCompleted } = todosActions;
  const { ALL, ACTIVE, COMPLETED } = filters;

  const filterHandler = (chosenFilter: string) =>
    dispatch(filterBy(chosenFilter));

  const deleteCompletedHandler = () => {
    if (items.every((el) => !el.done)) return;

    dispatch(removeCompleted());
    ref.current!.focus();
    setMessageIsShown(true);
    setTimeout(() => {
      setMessageIsShown(false);
    }, 2000);
  };

  const { message, visible, hidden, actions, clear } = classes;

  return (
    <>
      <p className={`${message} ${msgIsShown ? visible : hidden}`}>
        Items deleted!
      </p>
      <div className={actions}>
        <Button onClick={() => filterHandler(ALL)} ref={ref}>
          <FontAwesomeIcon icon={faList} />
          All
        </Button>
        <Button onClick={() => filterHandler(ACTIVE)}>
          <FontAwesomeIcon icon={faSpinner} />
          Active
        </Button>
        <Button onClick={() => filterHandler(COMPLETED)}>
          <FontAwesomeIcon icon={faSquareCheck} />
          Completed
        </Button>
        <Button onClick={deleteCompletedHandler} className={clear}>
          <FontAwesomeIcon icon={faTrash} />
          Clear completed
        </Button>
      </div>
    </>
  );
}

export default FilterTodo;
