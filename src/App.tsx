import { useState } from 'react';

import Modal from './components/Modal';
import Header from './components/Header';
import Input from './components/Input';
import Search from './components/Search';
import Todos from './components/Todos';

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
