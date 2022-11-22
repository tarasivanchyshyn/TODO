import ReactDOM from 'react-dom';
import { useRef, useState, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format, isBefore, isEqual } from 'date-fns';
import { faSort } from '@fortawesome/free-solid-svg-icons';

import Button from '../../UI/Button/Button';
import ErrorModal from '../ErrorModal/ErrorModal';
import formatDateString from '../../../helpers/formatDateString';
import { dateFormat, inputPlaceholder } from '../../../constants';
import { filters, todosActions } from '../../../store/todosSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

import classes from './Modal.module.scss';

type UniversalProps = {
  onClose: () => void;
  id?: string;
};

function Backdrop(props: UniversalProps) {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
}

function ModalOverlay(props: UniversalProps) {
  const todoTextRef = useRef<HTMLInputElement>(null);
  const todoCreatedRef = useRef<HTMLInputElement>(null);
  const todoExpirationtRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const [dateError, setDateError] = useState(false);
  const todos = useAppSelector((state) => state.todos.todos);

  const todo = todos.find((el) => el._id === props.id);

  function submitHandler(event: FormEvent) {
    event.preventDefault();
    const enteredText = todoTextRef.current!.value;
    const enteredCreatedDate = todoCreatedRef.current!.value;
    const enteredExpirationDate = todoExpirationtRef.current!.value;

    if (!enteredText.trim() || !enteredCreatedDate || !enteredExpirationDate) {
      return;
    }

    const enteredCreatedDateObj = new Date(enteredCreatedDate);
    const enteredExpirationDateObj = new Date(enteredExpirationDate);

    if (
      isBefore(enteredExpirationDateObj, enteredCreatedDateObj) ||
      isEqual(enteredExpirationDateObj, enteredCreatedDateObj)
    ) {
      setDateError(true);
      return;
    }

    const createdDate = format(enteredCreatedDateObj, dateFormat);
    const expiringDate = format(enteredExpirationDateObj, dateFormat);

    const { updateTodo, setIcon, addTodoFromModal, filterBy } = todosActions;

    if (todo) {
      dispatch(
        updateTodo({
          id: todo._id,
          enteredText,
          createdDate,
          expiringDate
        })
      );
      dispatch(setIcon(faSort));
    } else {
      dispatch(
        addTodoFromModal({
          id: uuidv4(),
          enteredText,
          createdDate,
          expiringDate
        })
      );
      dispatch(filterBy(filters.ALL));
      dispatch(setIcon(faSort));
    }

    props.onClose();
  }

  const { modal, header, form, control, label, input, actions, btn, cancel } =
    classes;

  const usedCreatedDate = formatDateString(todo?.creationDate);
  const usedExpirationDate = formatDateString(todo?.expirationDate);

  return (
    <>
      {dateError && <ErrorModal onClose={() => setDateError(false)} />}
      <div className={modal}>
        <h3 className={header}>Create Todo</h3>
        <form className={form} onSubmit={submitHandler}>
          <div className={control}>
            <label htmlFor="text" className={label}>
              Todo text
            </label>
            <input
              ref={todoTextRef}
              defaultValue={todo?.text ? todo.text : ''}
              type="text"
              className={input}
              id="text"
              placeholder={inputPlaceholder}
              required
            />
          </div>
          <div className={control}>
            <label htmlFor="created" className={label}>
              Created date
            </label>
            <input
              defaultValue={usedCreatedDate}
              ref={todoCreatedRef}
              type="datetime-local"
              className={input}
              id="created"
              required
            />
          </div>
          <div className={control}>
            <label htmlFor="expires" className={label}>
              Expiration date
            </label>
            <input
              defaultValue={usedExpirationDate}
              ref={todoExpirationtRef}
              type="datetime-local"
              className={input}
              id="expires"
              required
            />
          </div>
          <div className={actions}>
            <Button onClick={props.onClose} className={`${btn} ${cancel}`}>
              Cancel
            </Button>
            <Button type="submit" className={btn}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

const portalElement = document.getElementById('overlays')!;

function Modal(props: UniversalProps) {
  const { onClose, id } = props;

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={onClose} id={id} />,
        portalElement
      )}
    </>
  );
}

export default Modal;
