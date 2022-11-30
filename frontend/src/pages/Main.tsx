import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../components/Modals/Modal/Modal';
import Header from '../components/Header/Header';
import Input from '../components/InputBar/Input';
import Search from '../components/Search/Search';
import Todos from '../components/Todos/Todos';
import Spinner from '../components/UI/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getTodos, todosActions } from '../store/todosSlice';
import { authActions, logout } from '../store/authSlice';

const Main = () => {
  const [createTodoModalIsShown, setCreateTodoModalIsShown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading, isError, message } = useAppSelector(
    (state) => state.todos
  );

  const isTokenActive = localStorage.getItem('user');

  useEffect(() => {
    if (!isTokenActive) {
      dispatch(logout());
      dispatch(authActions.reset());
      dispatch(todosActions.reset());
    }
  }, [dispatch, isTokenActive]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
    dispatch(getTodos());

    return () => {
      dispatch(todosActions.reset());
    };
  }, [user, navigate, dispatch, isError, message]);

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
