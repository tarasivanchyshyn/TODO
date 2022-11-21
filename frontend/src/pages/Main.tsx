import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../components/Modals/Modal/Modal';
import Header from '../components/Header/Header';
import Input from '../components/InputBar/Input';
import Search from '../components/Search/Search';
import Todos from '../components/Todos/Todos';
import { useAppSelector } from '../hooks/hooks';

const Main = () => {
  const [createTodoModalIsShown, setCreateTodoModalIsShown] = useState(false);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const toggleCreateTodoModal = () =>
    setCreateTodoModalIsShown(!createTodoModalIsShown);

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
