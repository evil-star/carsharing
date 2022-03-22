import classNames from 'classnames';
import React, { FC, useState } from 'react';
import Hamburger from '../../common/ui/Hamburger/Hamburger';
import MainMenu from '../../common/components/MainMenu/MainMenu';
import styles from './MainLayout.module.sass';
import { mainMenuLinks, socialMedia } from '../../consts';

const MainLayout: FC = ({ children }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => setIsMenuActive((isMenuActive) => !isMenuActive);

  return (
    <div className={styles.layout}>
      <MainMenu
        isActive={isMenuActive}
        menuLinks={mainMenuLinks}
        socialMedia={socialMedia}
        handleClose={toggleMenu}
      />
      <div
        className={classNames(styles.app_bar, styles.layout__app_bar, {
          [styles['app_bar--dark']]: isMenuActive,
        })}
      >
        <div className={styles.app_bar__burger_wrap}>
          <Hamburger
            variant={isMenuActive ? 'cross' : null}
            onClick={toggleMenu}
            className={styles.app_bar__burger}
          />
        </div>
        <div className={styles.app_bar__lang}>Eng</div>
      </div>
      <Hamburger
        variant={isMenuActive ? 'cross' : null}
        onClick={toggleMenu}
        className={styles.layout__mobile_burger}
        linesColor='#121212'
      />
      <div className={styles.layout__main}>{children}</div>
    </div>
  );
};

export default MainLayout;
