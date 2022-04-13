import classNames from 'classnames';
import React, { useState } from 'react';
import { mainMenuLinks, socialMedia } from '../../../consts';
import Hamburger from '../../ui/Hamburger/Hamburger';
import MainMenu from '../MainMenu/MainMenu';
import styles from './AppBar.module.sass';

const AppBar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const AppBarClassNames = classNames(styles.app_bar, {
    [styles['app_bar--dark']]: isMenuActive,
  });

  const toggleMenu = () => setIsMenuActive(!isMenuActive);

  return (
    <>
      <MainMenu
        isActive={isMenuActive}
        menuLinks={mainMenuLinks}
        socialMedia={socialMedia}
        handleClose={toggleMenu}
      />
      <div className={AppBarClassNames}>
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
        className={styles.app_bar__mobile_burger}
        linesColor='#121212'
      />
    </>
  );
};

export default AppBar;
