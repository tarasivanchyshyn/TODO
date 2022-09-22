import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { todosActions } from '../store/store';

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
      <h3>Create Todo</h3>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="text">Todo text</label>
          <input
            ref={todoTextRef}
            type="text"
            id="text"
            placeholder="Enter todo text"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="created">Created date</label>
          <input
            ref={todoCreatedRef}
            type="datetime-local"
            id="created"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="expires">Expiration date</label>
          <input
            ref={todoExpirationtRef}
            type="datetime-local"
            id="expires"
            required
          />
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onClose}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

const portalElement = document.getElementById('overlays')!;

function Modal(props: UniversalProps) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose} />,
        portalElement
      )}
    </>
  );
}

export default Modal;
