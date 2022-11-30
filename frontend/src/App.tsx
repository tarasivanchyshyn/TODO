import { Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Auth/Login';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
