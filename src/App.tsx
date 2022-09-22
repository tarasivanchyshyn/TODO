import { useState } from 'react';

import Modal from './components/Modal';
import Header from './components/Header';
import Input from './components/Input';
import Todos from './components/Todos';
import './App.css';

function App() {
  const [createTodoModalIsShown, setCreateTodoModalIsShown] = useState(false);

  const showTodoModalHandler = () => setCreateTodoModalIsShown(true);
  const hideTodoModalHandler = () => setCreateTodoModalIsShown(false);

  return (
    <div>
      {createTodoModalIsShown && <Modal onClose={hideTodoModalHandler} />}
      <Header />
      <Input onOpenCreateTodoModal={showTodoModalHandler} />
      <Todos />
    </div>
  );
}

export default App;
