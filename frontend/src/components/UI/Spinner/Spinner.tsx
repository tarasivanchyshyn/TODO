import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import classes from './Spinner.module.scss';

const Spinner: FC = () => {
  return (
    <div className={classes.spinner}>
      <FontAwesomeIcon icon={faSpinner} spinPulse />
    </div>
  );
};

export default Spinner;
