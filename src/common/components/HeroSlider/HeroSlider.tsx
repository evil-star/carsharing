import React, { FC } from 'react';
import 'slick-carousel/slick/slick.css';
import styles from './HeroSlider.module.sass';
import Slider, { Settings } from 'react-slick';
import { ReactComponent as ArrowLeftIcon } from '../../../assets/images/icons/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from '../../../assets/images/icons/arrow-right.svg';
import Button, { ButtonColors } from '../../ui/Button/Button';
import { To, useNavigate } from 'react-router';

export interface ISlide {
  title: String;
  subtitle?: String;
  buttonHref?: To;
  buttonText?: String;
  backgroundImage?: String;
  buttonColor?: ButtonColors;
}

interface HeroSliderProps {
  slides: ISlide[];
}

const HeroSlider: FC<HeroSliderProps> = ({ slides, ...rest }) => {
  const navigate = useNavigate();

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
    <div {...props}>
      <ArrowLeftIcon />
    </div>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
    <div {...props}>
      <ArrowRightIcon />
    </div>
  );

  const settings: Settings = {
    dots: true,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Slider {...rest} className={styles.hero_slider} {...settings}>
      {slides.map((s, idx) => (
        <div key={idx}>
          <div
            className={styles.hero_slide}
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + s.backgroundImage
              })`,
            }}
          >
            <div className={styles.hero_slide__content}>
              {s.title || s.subtitle ? (
                <div className={styles.hero_slide__text}>
                  {s.title ? (
                    <div className={styles.hero_slide__title}>{s.title}</div>
                  ) : null}
                  {s.subtitle ? (
                    <div className={styles.hero_slide__subtitle}>
                      Оставляйте машину на платных городских парковках и
                      разрешенных местах, не нарушая ПДД, а также в аэропортах.
                    </div>
                  ) : null}
                </div>
              ) : null}
              {s.buttonText && s.buttonHref ? (
                <Button
                  onClick={() => s.buttonHref && navigate(s.buttonHref)}
                  variant='action'
                  color={s.buttonColor}
                >
                  {s.buttonText}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HeroSlider;
