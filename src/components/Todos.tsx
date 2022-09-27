import { useSelector } from 'react-redux';

import { filters, TodosState } from '../store/store';
import TodoItem from './TodoItem';
import FilterTodo from './FilterTodo';

import classes from './Todos.module.css';
import { useMemo } from 'react';

const Todos = () => {
  const items = useSelector((state: TodosState) => state.todos);
  const filter = useSelector((state: TodosState) => state.filterBy);

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
