import { Slide } from './common/components/HeroSlider/HeroSlider';
import { MenuLinks } from './common/components/MainMenu/MainMenu';
import { SocialMedia } from './interfaces/SocialMedia.interface';
import { ReactComponent as TelegramIcon } from './assets/images/icons/social-media/telegram-circle.svg';
import { ReactComponent as FacebookIcon } from './assets/images/icons/social-media/facebook-circle.svg';
import { ReactComponent as InstagramIcon } from './assets/images/icons/social-media/instagram-circle.svg';

// Ссылки в меню
export const mainMenuLinks: MenuLinks[] = [
  {
    text: 'Парковка',
    href: '/',
  },
  {
    text: 'Страховка',
    href: '/',
  },
  {
    text: 'Бензин',
    href: '/',
  },
  {
    text: 'Обслуживание',
    href: '/',
  },
];

// Ссылки на соц сети
export const socialMedia: SocialMedia[] = [
  {
    href: '/',
    icon: <TelegramIcon />,
  },
  {
    href: '/',
    icon: <FacebookIcon />,
  },
  {
    href: '/',
    icon: <InstagramIcon />,
  },
];

// Слайды на главной странице
export const homePageSlides: Slide[] = [
  {
    title: 'Бесплатная парковка',
    subtitle:
      'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
    buttonHref: '/',
    buttonText: 'Подробнее',
    backgroundImage: '/images/home-page-slides/1.jpg',
  },
  {
    title: 'Страховка',
    subtitle: 'Полная страховка страховка автомобиля',
    buttonHref: '/',
    buttonText: 'Подробнее',
    buttonColor: 'blue',
    backgroundImage: '/images/home-page-slides/2.jpg',
  },
  {
    title: 'Бензин',
    subtitle: 'Полный бак на любой заправке города за наш счёт',
    buttonHref: '/',
    buttonText: 'Подробнее',
    buttonColor: 'red',
    backgroundImage: '/images/home-page-slides/3.jpg',
  },
  {
    title: 'Обслуживание',
    subtitle: 'Автомобиль проходит еженедельное ТО',
    buttonHref: '/',
    buttonText: 'Подробнее',
    buttonColor: 'purple',
    backgroundImage: '/images/home-page-slides/4.jpg',
  },
];
