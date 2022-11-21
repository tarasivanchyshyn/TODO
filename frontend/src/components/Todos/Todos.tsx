import { useEffect, useMemo } from 'react';

import TodoItem from './TodoItem/TodoItem';
import FilterTodo from './FilterTodo/FilterTodo';
import { filters } from '../../store/todosSlice';
import { getAllTodos } from '../../api/services/todos';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import classes from './Todos.module.scss';

const Todos = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllTodos(dispatch);
  }, [dispatch]);

  let items = useAppSelector((state) => state.todos.todos);
  items = useMemo(() => items, [items]);
  const { filterBy, searchedValue } = useAppSelector((state) => state.todos);

  if (searchedValue.trim()) {
    items = items.filter((el) =>
      el.text.toLowerCase().includes(searchedValue.toLowerCase())
    );
  }

  const filteredActive = useMemo(
    () => items.filter((item) => !item.done),
    [items]
  );
  const filteredCompleted = useMemo(
    () => items.filter((item) => item.done),
    [items]
  );

  const filterTodo = () => {
    switch (filterBy) {
      case filters.COMPLETED:
        return filteredCompleted;
      case filters.ACTIVE:
        return filteredActive;
      default:
        return items;
    }
  };

  let content = <p className={classes.message}>No todos yet</p>;
  let message = <p className={classes.noitems}>No items</p>;

  const filteredItems =
    filterTodo().length <= 0
      ? message
      : filterTodo().map((item) => (
          <TodoItem key={item._id} item={item}></TodoItem>
        ));

  if (items.length) {
    content = (
      <div className={classes.todos}>
        <ul className={classes.list}>{filteredItems}</ul>
        <FilterTodo />
      </div>
    );
  }

  return <>{content}</>;
};

export default Todos;
