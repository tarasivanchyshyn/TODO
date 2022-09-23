import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { todosActions } from '../store/store';
import Button from './Button';

import classes from './Modal.module.css';

type UniversalProps = {
  onClose: () => void;
};

function Backdrop(props: UniversalProps) {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
}

function ModalOverlay(props: UniversalProps) {
  const todoTextRef = useRef<HTMLInputElement>(null);
  const todoCreatedRef = useRef<HTMLInputElement>(null);
  const todoExpirationtRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    const enteredText = todoTextRef.current!.value;
    const enteredCreatedDate = todoCreatedRef.current!.value;
    const enteredExpirationDate = todoExpirationtRef.current!.value;

    if (
      enteredText.trim().length === 0 ||
      !enteredCreatedDate ||
      !enteredExpirationDate
    ) {
      return;
    }

    const createdDate: Date = new Date(enteredCreatedDate);
    const expiringDate: Date = new Date(enteredExpirationDate);

    dispatch(
      todosActions.addTodoFromModal({
        id: uuidv4(),
        enteredText,
        createdDate,
        expiringDate
      })
    );
    props.onClose();
  }

  return (
    <div className={classes.modal}>
      <h3 className={classes.header}>Create Todo</h3>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="text" className={classes.label}>
            Todo text
          </label>
          <input
            ref={todoTextRef}
            type="text"
            className={classes.input}
            id="text"
            placeholder="Enter todo text"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="created" className={classes.label}>
            Created date
          </label>
          <input
            ref={todoCreatedRef}
            type="datetime-local"
            className={classes.input}
            id="created"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="expires" className={classes.label}>
            Expiration date
          </label>
          <input
            ref={todoExpirationtRef}
            type="datetime-local"
            className={classes.input}
            id="expires"
            required
          />
        </div>
        <div className={classes.actions}>
          <Button
            onClick={props.onClose}
            className={`${classes.btn} ${classes.cancel}`}
          >
            Cancel
          </Button>
          <Button type="submit" className={classes.btn}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

const portalElement = document.getElementById('overlays')!;

function Modal(props: UniversalProps) {
  const { onClose } = props;

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay onClose={onClose} />, portalElement)}
    </>
  );
}

export default Modal;
