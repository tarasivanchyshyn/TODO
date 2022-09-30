import React, { ReactNode, useImperativeHandle, useRef } from 'react';
import classes from './Button.module.scss';

type ButtonProps = {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

const Button = React.forwardRef((props: ButtonProps, ref) => {
  const { type, className, onClick, children } = props;
  const btnRef = useRef<HTMLButtonElement>(null);

  const activate = () => btnRef.current!.focus();

  useImperativeHandle(ref, () => {
    return {
      focus: activate
    };
  });

  return (
    <button
      ref={btnRef}
      type={type || 'button'}
      className={`${classes.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default Button;
