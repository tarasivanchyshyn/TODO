import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownShortWide,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';

import Button from './Button';
import { todosActions } from '../store/store';

import classes from './SortButton.module.css';

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

  const sortByDateHandler = (order: string) => {
    dispatch(todosActions.sortBy({ type: 'date', order: order }));
    setOpen(false);
  };
  const sortByTextHandler = (order: string) => {
    dispatch(todosActions.sortBy({ type: 'text', order: order }));
    setOpen(false);
  };

  const { sort, dropdown, dropdownHeader, dropdownList, dropdownItem, sortUp } =
    classes;

  return (
    <div ref={ref}>
      <Button className={sort} onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faArrowDownShortWide} />
      </Button>
      {open && (
        <div className={dropdown}>
          <p className={dropdownHeader}>Sort by:</p>
          <ul className={dropdownList}>
            <li
              className={`${dropdownItem} ${sortUp}`}
              onClick={() => sortByDateHandler('ascend')}
            >
              Date
              <FontAwesomeIcon icon={faSortUp} />
            </li>
            <li
              className={dropdownItem}
              onClick={() => sortByDateHandler('descend')}
            >
              Date
              <FontAwesomeIcon icon={faSortDown} />
            </li>
            <li
              className={`${dropdownItem} ${sortUp}`}
              onClick={() => sortByTextHandler('ascend')}
            >
              Text
              <FontAwesomeIcon icon={faSortUp} />
            </li>
            <li
              className={dropdownItem}
              onClick={() => sortByTextHandler('descend')}
            >
              Text
              <FontAwesomeIcon icon={faSortDown} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SortButton;
