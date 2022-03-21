import classNames from 'classnames';
import React, { useState } from 'react';
import config from '../../../config.json';
import Hamburger from '../../ui/Hamburger/Hamburger';
import MainMenu, { SocialMedia } from '../MainMenu/MainMenu';
import styles from './AppBar.module.sass';

const AppBar = () => {
  const { mainMenuLinks, socialMedia } = config;
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => setIsMenuActive(!isMenuActive);

  return (
    <>
      <MainMenu
        isActive={isMenuActive}
        links={mainMenuLinks}
        socialMedia={socialMedia as SocialMedia[]}
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
        className={styles.app_bar__mobile_burger}
        linesColor='#121212'
      />
    </>
  );
};

export default AppBar;
