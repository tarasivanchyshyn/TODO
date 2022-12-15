import { useState, FormEvent, ChangeEvent, FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { register, authActions } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { filters, todosActions } from '../../store/todosSlice';

import classes from './Auth.module.scss';

const Register: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = formData;
  const [msg, setMsg] = useState('');
  const [msgIsShown, setMsgIsShown] = useState(false);

  const dispatch = useAppDispatch();
  const { user, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setMsg(String(message));
      setMsgIsShown(true);
    }

    dispatch(authActions.reset());
  }, [user, isSuccess, isError, message, dispatch]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMsgIsShown(false);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) {
      setMsg('Passwords dont match');
      setMsgIsShown(true);
      return;
    }

    const userData = { name, email, password };
    dispatch(register(userData));
    dispatch(todosActions.filterBy(filters.ALL));
  };

  const {
    wrapper,
    heading,
    form,
    input,
    errMsg,
    hidden,
    button,
    altLink,
    visible
  } = classes;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={wrapper}>
      <h1 className={heading}>
        <FontAwesomeIcon icon={faUser} /> Registration
      </h1>
      <form onSubmit={submitHandler} className={form}>
        <input
          type="text"
          className={input}
          name="name"
          value={name}
          placeholder="Enter name"
          onChange={inputChangeHandler}
        />
        <input
          type="email"
          className={input}
          name="email"
          value={email}
          placeholder="Enter email"
          onChange={inputChangeHandler}
        />
        <input
          type="password"
          className={input}
          name="password"
          minLength={4}
          value={password}
          placeholder="Enter password"
          onChange={inputChangeHandler}
        />
        <input
          type="password"
          className={input}
          name="password2"
          minLength={4}
          value={password2}
          placeholder="Confirm password"
          onChange={inputChangeHandler}
        />
        <p className={`${errMsg} ${msgIsShown ? visible : hidden}`}>{msg}</p>
        <Button type="submit" className={button}>
          Register
        </Button>
        <p className={altLink}>
          Already registered? <Link to={'/login'}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
