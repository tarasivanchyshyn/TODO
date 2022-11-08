import { FC } from 'react';
import classes from './Header.module.scss';

const Header: FC = () => {
  return <h1 className={classes.header}>My Todos</h1>;
};

export default Header;