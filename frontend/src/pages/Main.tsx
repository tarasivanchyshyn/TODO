import { useState, useEffect } from 'react';

import Modal from '../components/Modals/Modal/Modal';
import Header from '../components/Header/Header';
import Input from '../components/InputBar/Input';
import Search from '../components/Search/Search';
import Todos from '../components/Todos/Todos';
import Spinner from '../components/UI/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { filters, getTodos, todosActions } from '../store/todosSlice';

const Main = () => {
  const [createTodoModalIsShown, setCreateTodoModalIsShown] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, isError, message } = useAppSelector(
    (state) => state.todos
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getTodos(filters.ALL));

    return () => {
      dispatch(todosActions.reset());
    };
  }, [user, dispatch, isError, message]);

  const toggleCreateTodoModal = () =>
    setCreateTodoModalIsShown(!createTodoModalIsShown);

  if (isLoading) {
    return <Spinner />;
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
