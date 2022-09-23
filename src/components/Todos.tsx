import { useSelector } from 'react-redux';

import TodoItem from './TodoItem';
import { TodosState } from '../store/store';

import classes from './Todos.module.css';

const Todos = () => {
  const items = useSelector((state: TodosState) => state.todos);

  let content = <p className={classes.message}>No todos yet</p>;

  if (items.length) {
    content = (
      <ul className={classes.todos}>
        {items.map((item) => (
          <TodoItem key={item.id} item={item}></TodoItem>
        ))}
      </ul>
    );
  }

  return <>{content}</>;
};

export default Todos;
