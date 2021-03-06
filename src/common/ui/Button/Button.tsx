import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './Button.module.sass';

export type ButtonVariants = 'action' | undefined;
export type ButtonColors = 'blue' | 'red' | 'purple' | undefined;

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariants | undefined;
  color?: ButtonColors;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = '',
  color = '',
  disabled,
  className,
  ...rest
}) => {
  const buttonClassNames = classNames(styles.button, className, {
    [styles[`button--${variant}`]]: variant,
    [styles[`button--${color}`]]: color,
    [styles[`button--disabled`]]: disabled,
  });

  return (
    <button {...rest} className={buttonClassNames}>
      {children}
    </button>
  );
};

export default Button;
