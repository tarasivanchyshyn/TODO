import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import classes from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.message}>
        <h1>Page doesn't exist</h1>
        <FontAwesomeIcon icon={faFaceFrown}></FontAwesomeIcon>
      </div>
      <Link to="/login" className={classes.link}>
        Return
      </Link>
    </div>
  );
};

export default NotFound;
