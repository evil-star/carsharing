import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './Hamburger.module.sass';

type HamburgerVariants = 'cross' | undefined | null;

interface HamburgerProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
  linesColor?: string;
  variant?: HamburgerVariants;
}

const Hamburger: FC<HamburgerProps> = ({
  className,
  linesColor,
  variant,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={classNames(styles.burger, className, {
        [styles['burger--cross']]: variant === 'cross',
      })}
    >
      <span
        className={styles.burger__line}
        style={{ backgroundColor: linesColor }}
      ></span>
      <span
        className={styles.burger__line}
        style={{ backgroundColor: linesColor }}
      ></span>
      <span
        className={styles.burger__line}
        style={{ backgroundColor: linesColor }}
      ></span>
    </div>
  );
};

export default Hamburger;
