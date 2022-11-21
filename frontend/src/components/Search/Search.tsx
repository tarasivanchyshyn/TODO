import { FormEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { todosActions } from '../../store/todosSlice';
import { searchPlaceholder } from '../../constants';
import { useAppDispatch } from '../../hooks/hooks';

import classes from './Search.module.scss';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();

  const inputChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.replace(
      /[$&+~,:;=?[\]@#|{}'<>.^*()%!-/]/,
      ''
    );
    setSearchValue(value);
  };

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
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={inputChangeHandler}
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </div>
  );
}

export default Search;
