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

  const showAllHandler = () => dispatch(filterBy(filters.ALL));
  const showActiveHandler = () => dispatch(filterBy(filters.ACTIVE));
  const showCompletedHandler = () => dispatch(filterBy(filters.COMPLETED));
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
        <Button onClick={showAllHandler} ref={ref}>
          <FontAwesomeIcon icon={faList} />
          All
        </Button>
        <Button onClick={showActiveHandler}>
          <FontAwesomeIcon icon={faSpinner} />
          Active
        </Button>
        <Button onClick={showCompletedHandler}>
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
