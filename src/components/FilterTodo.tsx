import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faList,
  faSpinner,
  faSquareCheck,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

import Button from './Button';
import { filters, todosActions } from '../store/store';
import classes from './FilterTodo.module.css';

function FilterTodo() {
  const dispatch = useDispatch();
  const ref = useRef<HTMLButtonElement>(null);
  const [msgIsShown, setMessageIsShown] = useState(false);

  const { filterBy, removeCompleted } = todosActions;
  const { ALL, ACTIVE, COMPLETED } = filters;

  const filterHandler = (chosenFilter: string) =>
    dispatch(filterBy(chosenFilter));

  const deleteCompletedHandler = () => {
    dispatch(removeCompleted());
    ref.current!.focus();
    setMessageIsShown(true);
    setTimeout(() => {
      setMessageIsShown(false);
    }, 2000);
  };

  return (
    <>
      {msgIsShown && <p className={classes.message}>Items deleted!</p>}
      <div className={classes.actions}>
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
        <Button onClick={deleteCompletedHandler}>
          <FontAwesomeIcon icon={faTrash} />
          Clear completed
        </Button>
      </div>
    </>
  );
}

export default FilterTodo;
