import React, { FC } from 'react';
import 'slick-carousel/slick/slick.css';
import styles from './Slider.module.sass';
import {
  default as SlickSlider,
  CustomArrowProps,
  Settings,
} from 'react-slick';
import { ReactComponent as ArrowLeftIcon } from '../../../assets/images/icons/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from '../../../assets/images/icons/arrow-right.svg';
import Button, { ButtonColors } from '../../ui/Button/Button';
import { To, useNavigate } from 'react-router';

export interface Slide {
  title: String;
  subtitle?: String;
  buttonHref?: To;
  buttonText?: String;
  backgroundImage?: String;
  buttonColor?: ButtonColors;
}

interface SliderProps {
  slides: Slide[];
}

const Slider: FC<SliderProps> = ({ slides, ...rest }) => {
  const navigate = useNavigate();

  const SlickArrowLeft = ({
    currentSlide,
    slideCount,
    ...props
  }: CustomArrowProps) => (
    <div {...props}>
      <ArrowLeftIcon />
    </div>
  );
  const SlickArrowRight = ({
    currentSlide,
    slideCount,
    ...props
  }: CustomArrowProps) => (
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
    <SlickSlider {...rest} className={styles.hero_slider} {...settings}>
      {slides.map((slide, idx) => (
        <div key={idx}>
          <div
            className={styles.hero_slide}
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + slide.backgroundImage
              })`,
            }}
          >
            <div className={styles.hero_slide__content}>
              <div className={styles.hero_slide__text}>
                {slide.title && (
                  <div className={styles.hero_slide__title}>{slide.title}</div>
                )}
                {slide.subtitle && (
                  <div className={styles.hero_slide__subtitle}>
                    Оставляйте машину на платных городских парковках и
                    разрешенных местах, не нарушая ПДД, а также в аэропортах.
                  </div>
                )}
              </div>
              {slide.buttonText && slide.buttonHref && (
                <Button
                  onClick={() => slide.buttonHref && navigate(slide.buttonHref)}
                  variant='action'
                  color={slide.buttonColor}
                >
                  {slide.buttonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </SlickSlider>
  );
};

export default Slider;
