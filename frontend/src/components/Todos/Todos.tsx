import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';

import TodoItem from './TodoItem/TodoItem';
import FilterTodo from './FilterTodo/FilterTodo';
import { filters, todosActions } from '../../store/todosSlice';
import { RootState } from '../../store/store';
import { getAllTodos } from '../../api/services/todos';

import classes from './Todos.module.scss';

const Todos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllTodos();
        dispatch(todosActions.setTodos(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);

  let items = useSelector((state: RootState) => state.todos.todos);
  items = useMemo(() => items, [items]);
  const filter = useSelector((state: RootState) => state.todos.filterBy);
  const searchValue = useSelector(
    (state: RootState) => state.todos.searchedValue
  );

  if (searchValue.trim()) {
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
