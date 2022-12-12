import { useMemo } from 'react';

import TodoItem from './TodoItem/TodoItem';
import FilterTodo from './FilterTodo/FilterTodo';
import { useAppSelector } from '../../hooks/hooks';

import classes from './Todos.module.scss';

const Todos = () => {
  const { searchedValue } = useAppSelector((state) => state.todos);
  let items = useAppSelector((state) => state.todos.todos);
  items = useMemo(() => items, [items]);

  let todos;

  if (items.length) {
    if (searchedValue.trim()) {
      items = items.filter((el) =>
        el.text.toLowerCase().includes(searchedValue.toLowerCase())
      );
    }

    todos = items.map((item) => (
      <TodoItem key={item._id} item={item}></TodoItem>
    ));
  }

  const message = <p className={classes.message}>No todos yet</p>;
  const content = items.length ? todos : message;

  return (
    <div className={classes.todos}>
      <ul className={classes.list}>{content}</ul>
      <FilterTodo />
    </div>
  );
};

export default Todos;
