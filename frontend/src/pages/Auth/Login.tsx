import { useState, FormEvent, ChangeEvent, useEffect, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Spinner from '../../components/UI/Spinner/Spinner';
import { login, authActions } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import classes from './Auth.module.scss';

const Login: FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const [msg, setMsg] = useState('some error');
  const [msgIsShown, setMsgIsShown] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      navigate('/');
    }

    if (isError) {
      setMsg(String(message));
      setMsgIsShown(true);
    }
    if (isSuccess) {
      navigate('/');
    }

    dispatch(authActions.reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMsgIsShown(false);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setMsg('Please fill all the fields');
      setMsgIsShown(true);
      return;
    }

    const userData = { email, password };
    dispatch(login(userData));
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
        <FontAwesomeIcon icon={faSignInAlt} /> Log in
      </h1>
      <form onSubmit={submitHandler} className={form}>
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
          value={password}
          minLength={4}
          placeholder="Enter password"
          onChange={inputChangeHandler}
        />
        <p className={`${errMsg} ${msgIsShown ? visible : hidden}`}>{msg}</p>
        <button type="submit" className={button}>
          Log in
        </button>
        <p className={altLink}>
          New user? <Link to={'#'}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;