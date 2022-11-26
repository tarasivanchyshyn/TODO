import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';
import { faArrowDownZA, faArrowUpAZ } from '@fortawesome/free-solid-svg-icons';
import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpShortWide } from '@fortawesome/free-solid-svg-icons';

import Button from '../../UI/Button/Button';
import { getTodos, todosActions } from '../../../store/todosSlice';
import { dateSortOption, textSortOption } from '../../../constants';
import { ascendOrder, descendOrder } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

import classes from './SortButton.module.scss';

function SortButton() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const icon = useAppSelector((state) => state.todos.sortIcon);

  const toggleSortWindow = () => setOpen(!open);

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

  const { sortBy, setIcon } = todosActions;

  const sortByDateHandler = (order: string) => {
    dispatch(sortBy({ type: dateSortOption, order: order }));
    order === ascendOrder
      ? dispatch(setIcon(faArrowUpShortWide))
      : dispatch(setIcon(faArrowDownShortWide));
    setOpen(false);
  };
  const sortByTextHandler = (order: string) => {
    dispatch(sortBy({ type: textSortOption, order: order }));
    order === ascendOrder
      ? dispatch(setIcon(faArrowUpAZ))
      : dispatch(setIcon(faArrowDownZA));
    setOpen(false);
  };

  const resetSorting = () => {
    dispatch(getTodos());
    dispatch(setIcon(faSort));
    setOpen(false);
  };

  const { sort, dropdown, dropdownHeader, dropdownList, dropdownItem, sortUp } =
    classes;

  return (
    <div ref={ref}>
      <Button className={sort} onClick={toggleSortWindow}>
        <FontAwesomeIcon icon={icon} />
      </Button>
      {open && (
        <div className={dropdown}>
          <p className={dropdownHeader}>Sort by:</p>
          <ul className={dropdownList}>
            <li
              className={`${dropdownItem} ${sortUp}`}
              onClick={() => sortByDateHandler(ascendOrder)}
            >
              Date
              <FontAwesomeIcon icon={faSortUp} />
            </li>
            <li
              className={dropdownItem}
              onClick={() => sortByDateHandler(descendOrder)}
            >
              Date
              <FontAwesomeIcon icon={faSortDown} />
            </li>
            <li
              className={`${dropdownItem} ${sortUp}`}
              onClick={() => sortByTextHandler(ascendOrder)}
            >
              Text
              <FontAwesomeIcon icon={faSortUp} />
            </li>
            <li
              className={dropdownItem}
              onClick={() => sortByTextHandler(descendOrder)}
            >
              Text
              <FontAwesomeIcon icon={faSortDown} />
            </li>
            <li className={dropdownItem} onClick={resetSorting}>
              Reset
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SortButton;
