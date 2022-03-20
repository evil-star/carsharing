import React, { FC } from 'react';
import styles from './PageHeader.module.sass';
import { ReactComponent as LocationIcon } from '../../../assets/images/icons/location.svg';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const PageHeader: FC<React.ComponentPropsWithoutRef<'div'>> = ({
  className,
}) => {
  return (
    <div className={classNames(styles.header, className)}>
      <Link to='/' className={styles.header__title}>
        Need for drive
      </Link>
      <div className={styles.header__city}>
        <LocationIcon className={styles.header__city_icon} />
        <span className={styles.header__city_text}>Ульяновск</span>
      </div>
    </div>
  );
};

export default PageHeader;
