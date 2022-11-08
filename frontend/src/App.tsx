import { useState } from 'react';

import Modal from './components/Modals/Modal/Modal';
import Header from './components/Header/Header';
import Input from './components/InputBar/Input';
import Search from './components/Search/Search';
import Todos from './components/Todos/Todos';

function App() {
  const [createTodoModalIsShown, setCreateTodoModalIsShown] = useState(false);

  const toggleCreateTodoModal = () =>
    setCreateTodoModalIsShown(!createTodoModalIsShown);

  return (
    <>
      {createTodoModalIsShown && <Modal onClose={toggleCreateTodoModal} />}
      <Header />
      <Input onOpenCreateTodoModal={toggleCreateTodoModal} />
      <Search />
      <Todos />
    </>
  );
}

export default App;
