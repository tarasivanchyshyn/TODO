import { useState, useEffect } from 'react';

import Modal from '../components/Modals/Modal/Modal';
import Header from '../components/Header/Header';
import Input from '../components/InputBar/Input';
import Search from '../components/Search/Search';
import Todos from '../components/Todos/Todos';
import Spinner from '../components/UI/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getTodos } from '../store/todosSlice';

const Main = () => {
  const [createTodoModalIsShown, setCreateTodoModalIsShown] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, isError, message } = useAppSelector(
    (state) => state.todos
  );
  const filter = useAppSelector((state) => state.todos.filterBy);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [isError, message]);

  useEffect(() => {
    dispatch(getTodos(filter));
  }, [dispatch, filter]);

  const toggleCreateTodoModal = () =>
    setCreateTodoModalIsShown(!createTodoModalIsShown);

  if (isLoading) {
    return (
      <>
        <Header />
        <Input onOpenCreateTodoModal={toggleCreateTodoModal} />
        <Search />
        <Spinner />;
      </>
    );
  }

  return (
    <>
      {createTodoModalIsShown && <Modal onClose={toggleCreateTodoModal} />}
      <Header />
      <Input onOpenCreateTodoModal={toggleCreateTodoModal} />
      <Search />
      <Todos />;
    </>
  );
};

export default Main;
