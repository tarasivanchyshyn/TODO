import ReactDOM from 'react-dom';

import Button from './Button';
import { defaultErrorTitle, defaultErrorMessage } from '../constants';
import classes from './ErrorModal.module.css';

type UniversalProps = {
  title?: string;
  message?: string;
  onClose: () => void;
};

const Backdrop = (props: UniversalProps) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props: UniversalProps) => {
  const { title, message, onClose } = props;
  const { modal, header, content, button } = classes;

  return (
    <div className={modal}>
      <header className={header}>
        {title ? <h2>{title}</h2> : <h2>{defaultErrorTitle}</h2>}
      </header>
      <div className={content}>
        {message ? <p>{message}</p> : <p>{defaultErrorMessage}</p>}
      </div>
      <Button onClick={onClose} className={button}>
        Close
      </Button>
    </div>
  );
};

const portalElement = document.getElementById('error')!;

const ErrorModal = (props: UniversalProps) => {
  const { onClose } = props;
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay onClose={onClose} />, portalElement)}
    </>
  );
};

export default ErrorModal;
