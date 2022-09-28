import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';

import classes from './SortButton.module.css';
import { todosActions } from '../store/store';

function SortButton() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (e: any) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const sortByDateHandler = () => {
    dispatch(todosActions.sortBy('date'));
    setOpen(false);
  };
  const sortByTextHandler = () => {
    dispatch(todosActions.sortBy('text'));
    setOpen(false);
  };

  return (
    <div ref={ref}>
      <Button className={classes.sort} onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faArrowDownShortWide} />
      </Button>
      {open && (
        <div className={classes.dropdown}>
          <p className={classes.dropdownHeader}>Sort by:</p>
          <ul className={classes.dropdownList}>
            <li className={classes.dropdownItem} onClick={sortByDateHandler}>
              Date
            </li>
            <li className={classes.dropdownItem} onClick={sortByTextHandler}>
              Text
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SortButton;
