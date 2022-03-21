import classNames from 'classnames';
import React, { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { To } from 'react-router';
import styles from './MainMenu.module.sass';
import { ReactComponent as TelegramIcon } from '../../../assets/images/icons/social-media/telegram-circle.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/images/icons/social-media/facebook-circle.svg';
import { ReactComponent as InstagramIcon } from '../../../assets/images/icons/social-media/instagram-circle.svg';
import Hamburger from '../../ui/Hamburger/Hamburger';
import { SocialMedia } from '../../../interfaces/SocialMedia.interface';

export interface MenuLinks {
  text: string;
  href: To;
}

interface MainMenuProps extends React.ComponentPropsWithoutRef<'div'> {
  isActive: boolean;
  menuLinks: MenuLinks[];
  socialMedia: SocialMedia[];
  handleClose?: () => void;
}

const MainMenu: FC<MainMenuProps> = ({
  isActive,
  menuLinks,
  socialMedia,
  handleClose = () => {},
}) => {
  useEffect(() => {
    document.body.style.overflow = isActive ? 'hidden' : '';
  }, [isActive]);

  return (
    <div
      className={classNames(styles.menu, {
        [styles['menu--active']]: isActive,
      })}
      onClick={handleClose}
    >
      <div className={styles.menu__main} onClick={(e) => e.stopPropagation()}>
        <div className={styles.menu__content}>
          <div className={styles.menu__cross} onClick={handleClose}>
            <Hamburger variant='cross' />
          </div>
          <div className={styles.menu__links}>
            {menuLinks.map((link, index) => (
              <NavLink
                to={link.href}
                className={styles.menu__link}
                onClick={handleClose}
                key={index}
              >
                {link.text}
              </NavLink>
            ))}
          </div>
          <div className={styles.menu__socials}>
            {socialMedia.map((socialItem, index) => (
              <a
                href={socialItem.href}
                target='_blank'
                rel='noreferrer'
                className={styles.menu__social}
                key={index}
              >
                {socialItem.type === 'telegram' && <TelegramIcon />}
                {socialItem.type === 'facebook' && <FacebookIcon />}
                {socialItem.type === 'instagram' && <InstagramIcon />}
              </a>
            ))}
          </div>
          <div className={styles.menu__lang}>Eng</div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
