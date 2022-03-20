import React, { FC } from 'react';
import styles from './Home.module.sass';
import Button from '../../common/ui/Button/Button';
import HeroSlider, {
  ISlide,
} from '../../common/components/HeroSlider/HeroSlider';
import config from '../../config.json';
import PageHeader from '../../common/components/PageHeader/PageHeader';

const Home: FC = () => {
  const { homePageSlides } = config;

  return (
    <div className={styles.home}>
      <div className={styles.home__main_col}>
        <PageHeader className={styles.home__header} />

        <div className={styles.home__main}>
          <div className={styles.home__main_text}>
            <h1 className={styles.home__title}>
              Каршеринг
              <br />
              <span className={styles.home__title_primary}>Need for drive</span>
            </h1>
            <div className={styles.home__subtitle}>
              Поминутная аренда авто твоего города
            </div>
          </div>
          <Button className={styles.home__button}>Забронировать</Button>
        </div>

        <div className={styles.home__extra}>
          <div className={styles.home__copyright}>
            © 2016-2019 «Need for drive»
          </div>
          <a href='tel:84952342244' className={`${styles.home__phone} link`}>
            8 (495) 234-22-44
          </a>
        </div>
      </div>

      <div className={styles.home__slider_col}>
        <HeroSlider slides={homePageSlides as ISlide[]} />
      </div>
    </div>
  );
};

export default Home;
