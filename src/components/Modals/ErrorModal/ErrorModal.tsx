import ReactDOM from 'react-dom';

import Button from '../../UI/Button/Button';
import { defaultErrorTitle, defaultErrorMessage } from '../../../constants';

import classes from './ErrorModal.module.scss';

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

  const errorTitle = title ? title : defaultErrorTitle;
  const errorMessage = message ? message : defaultErrorMessage;

  return (
    <div className={modal}>
      <header className={header}>
        <h2>{errorTitle}</h2>
      </header>
      <div className={content}>
        <p>{errorMessage}</p>
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
