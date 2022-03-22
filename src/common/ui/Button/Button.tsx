import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './Button.module.sass';

export type ButtonVariants = 'action' | undefined;
export type ButtonColors = 'blue' | 'red' | 'purple' | undefined;

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariants | undefined;
  color?: ButtonColors;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = '',
  color = '',
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={classNames(styles.button, className, {
        [styles[`button--${variant}`]]: variant,
        [styles[`button--${color}`]]: color,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
