import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logout, authActions } from '../../store/authSlice';

import classes from './Header.module.scss';

const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(authActions.reset());
    navigate('/');
  };

  const logoutSection = (
    <div className={classes.logout}>
      <span className={classes.welcome}>Welcome, {user?.name}</span>
      <button className={classes.button} onClick={onLogout}>
        <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
        <span>Logout</span>
      </button>
    </div>
  );

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.header}>My Todos</h1>
      {user ? logoutSection : null}
    </div>
  );
};

export default Header;
