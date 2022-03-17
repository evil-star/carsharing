import React, { FC } from 'react';
import styles from './MainLayout.module.sass';

const MainLayout: FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={`${styles.app_bar} ${styles.layout__app_bar}`}>
        <div className={`${styles.burger} ${styles.app_bar__burger}`}>
          <span className={styles.burger__line}></span>
          <span className={styles.burger__line}></span>
          <span className={styles.burger__line}></span>
        </div>
        <div className={styles.app_bar__lang}>Eng</div>
      </div>
      <div className={styles.layout__main}>{children}</div>
    </div>
  );
};

export default MainLayout;
