import { ReactNode } from 'react';
import classes from './Button.module.css';

type ButtonProps = {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

function Button(props: ButtonProps) {
  const { type, className, onClick, children } = props;

  return (
    <button
      type={type || 'button'}
      className={`${classes.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
