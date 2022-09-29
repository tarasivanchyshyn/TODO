import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import TodoItem from './TodoItem';
import FilterTodo from './FilterTodo';
import { filters } from '../store/todosSlice';

import classes from './Todos.module.css';
import { RootState } from '../store/store';

const Todos = () => {
  let items = useSelector((state: RootState) => state.todos.todos);
  const filter = useSelector((state: RootState) => state.todos.filterBy);
  const searchValue = useSelector(
    (state: RootState) => state.todos.searchedValue
  );

  if (searchValue && searchValue.trim().length) {
    items = items.filter((el) =>
      el.text.toLowerCase().includes(searchValue.toLowerCase())
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
    switch (filter) {
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
          <TodoItem key={item.id} item={item}></TodoItem>
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
