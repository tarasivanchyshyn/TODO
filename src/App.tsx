import { useState } from 'react';

import Modal from './components/Modal';
import Header from './components/Header';
import Input from './components/Input';
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
      <Todos />
    </>
  );
}

export default App;
