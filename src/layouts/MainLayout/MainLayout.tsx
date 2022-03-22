import React, { FC } from 'react';
import styles from './MainLayout.module.sass';
import AppBar from '../../common/components/AppBar/AppBar';

const MainLayout: FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <AppBar />
      <div className={styles.layout__main}>{children}</div>
    </div>
  );
};

export default MainLayout;
