import React, { FC } from 'react';
import AppBar from '../../common/components/AppBar/AppBar';
import styles from './MainLayout.module.sass';

const MainLayout: FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <AppBar />
      <div className={styles.layout__main}>{children}</div>
    </div>
  );
};

export default MainLayout;
