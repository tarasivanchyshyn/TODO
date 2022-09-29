import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import classes from './Search.module.css';
import { todosActions } from '../store/todosSlice';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const inputChangeHandler = (e: FormEvent<HTMLInputElement>) =>
    setSearchValue(e.currentTarget.value);

  useEffect(() => {
    const debounce = setTimeout(() => {
      dispatch(todosActions.search(searchValue));
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchValue, dispatch]);

  return (
    <div className={classes.form}>
      <input
        className={classes.input}
        type="search"
        placeholder="Search for todos"
        onChange={inputChangeHandler}
      ></input>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </div>
  );
}

export default Search;
