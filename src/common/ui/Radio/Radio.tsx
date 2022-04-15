import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './Radio.module.sass';

const Radio: FC<React.ComponentPropsWithRef<'input'>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <label className={classNames(styles.radio, className)}>
      <input type='radio' className={styles.radio__input} {...rest} />
      <div className={styles.radio__dot}></div>
      <div className={styles.radio__text}>{children}</div>
    </label>
  );
};

export default Radio;
