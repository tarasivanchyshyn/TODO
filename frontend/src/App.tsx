import { Routes, Route, Navigate } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Auth/Login';
import NotFound from './pages/NotFound/NotFound';
import { useAppSelector } from './hooks/hooks';

function App() {
  const user = useAppSelector((state) => state.auth.user);

  const routes = !!user ? (
    <>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Navigate replace to="/" />} />
    </>
  ) : (
    <>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
    </>
  );

  return (
    <Routes>
      {routes}
      <Route path={'*'} element={<NotFound />} />
    </Routes>
  );
}

export default App;
