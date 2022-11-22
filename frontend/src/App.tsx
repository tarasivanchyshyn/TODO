import { Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Auth/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
