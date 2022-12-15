import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logout, authActions } from '../../store/authSlice';
import { filters, todosActions } from '../../store/todosSlice';

import classes from './Header.module.scss';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(authActions.reset());
  };

  const showAll = () => dispatch(todosActions.filterBy(filters.ALL));

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
      <h1 className={classes.header} onClick={showAll}>
        My Todos
      </h1>
      {user ? logoutSection : null}
    </div>
  );
};

export default Header;
