import classNames from 'classnames';
import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './ModelCard.module.sass';

interface ModelCardProps extends React.ComponentPropsWithoutRef<'div'> {
  cardTitle?: string;
  cardSubtitle?: string;
  image?: string;
  isActive?: boolean;
  loading?: boolean;
}

const ModelCard: FC<ModelCardProps> = ({
  className,
  cardTitle,
  cardSubtitle,
  image,
  isActive,
  loading,
  ...rest
}) => {
  const cardClassNames = classNames(styles.card, className, {
    [styles['card--active']]: isActive,
  });

  return (
    <div className={cardClassNames} {...rest}>
      <div className={styles.card__head}>
        {loading ? (
          <Skeleton count={2} className={styles.card__text_skeleton} />
        ) : (
          <>
            {cardTitle && <div className={styles.card__title}>{cardTitle}</div>}
            {cardSubtitle && (
              <div className={styles.card__subtitle}>{cardSubtitle}</div>
            )}
          </>
        )}
      </div>
      <div className={styles.card__img_wrap}>
        {loading ? (
          <Skeleton
            className={styles.card__img_skeleton}
            containerClassName={styles.card__img_skeleton_container}
          />
        ) : (
          <img
            src={image}
            alt={`Автомобиль ${cardTitle}`}
            className={styles.card__img}
          />
        )}
      </div>
    </div>
  );
};

export default ModelCard;
