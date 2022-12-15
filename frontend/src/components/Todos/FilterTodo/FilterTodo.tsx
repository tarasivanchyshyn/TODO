import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

import Button from '../../UI/Button/Button';
import { deleteTodo, filters, todosActions } from '../../../store/todosSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

import classes from './FilterTodo.module.scss';

function FilterTodo() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.todos.todos);
  const filter = useAppSelector((state) => state.todos.filterBy);

  const deleteCompletedHandler = () => {
    if (items.every((el) => !el.done)) return;
    dispatch(deleteTodo(null));
  };

  const getTodosHandler = (filter: string) =>
    dispatch(todosActions.filterBy(filter));

  const { ALL, ACTIVE, COMPLETED } = filters;

  return (
    <>
      <p className={classes.filter}>Filter by: {filter}</p>
      <div className={classes.actions}>
        <Button onClick={() => getTodosHandler(ALL)}>
          <FontAwesomeIcon icon={faList} />
          All
        </Button>
        <Button onClick={() => getTodosHandler(ACTIVE)}>
          <FontAwesomeIcon icon={faSpinner} />
          Active
        </Button>
        <Button onClick={() => getTodosHandler(COMPLETED)}>
          <FontAwesomeIcon icon={faSquareCheck} />
          Completed
        </Button>
        <Button onClick={deleteCompletedHandler} className={classes.clear}>
          <FontAwesomeIcon icon={faTrash} />
          Clear completed
        </Button>
      </div>
    </>
  );
}

export default FilterTodo;
