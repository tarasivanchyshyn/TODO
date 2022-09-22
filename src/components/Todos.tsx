import { useSelector } from 'react-redux';

import TodoItem from './TodoItem';
import { TodosState } from '../store/store';

import classes from './Todos.module.css';

const Todos = () => {
  const items = useSelector((state: TodosState) => state.todos);

  return (
    <ul className={classes.todos}>
      {items.map((item) => (
        <TodoItem key={item.id} item={item}></TodoItem>
      ))}
    </ul>
  );
};

export default Todos;
