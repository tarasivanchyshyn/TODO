import { useSelector } from 'react-redux';

import TodoItem from './TodoItem';
import classes from './Todos.module.css';

import { TodosState } from '../store/store';

const Todos = () => {
  const items = useSelector((state: TodosState) => state.todos);

  return (
    <ul className={classes.todos}>
      {items.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          text={item.text}
          done={item.done}
          creationDate={item.creationDate}
          expirationDate={item.expirationDate}
        ></TodoItem>
      ))}
    </ul>
  );
};

export default Todos;
