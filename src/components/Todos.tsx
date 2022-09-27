import { useSelector } from 'react-redux';

import { filters, TodosState } from '../store/store';
import TodoItem from './TodoItem';
import FilterTodo from './FilterTodo';

import classes from './Todos.module.css';

const Todos = () => {
  const items = useSelector((state: TodosState) => state.todos);
  const filter = useSelector((state: TodosState) => state.filterBy);

  let content = <p className={classes.message}>No todos yet</p>;

  const filterTodo = () => {
    if (filter === filters.COMPLETED) {
      return items.filter((item) => item.done);
    }
    if (filter === filters.ACTIVE) {
      return items.filter((item) => !item.done);
    }
    return items;
  };

  if (items.length) {
    content = (
      <div className={classes.todos}>
        <ul className={classes.list}>
          {filterTodo().map((item) => (
            <TodoItem key={item.id} item={item}></TodoItem>
          ))}
        </ul>
        <FilterTodo />
      </div>
    );
  }

  return <>{content}</>;
};

export default Todos;
