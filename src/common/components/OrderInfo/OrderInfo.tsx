import React, { FC } from 'react';
import styles from './OrderInfo.module.sass';

interface InfoList {
  text: string | JSX.Element;
  value: string | JSX.Element;
}

interface OrderInfoProps {
  title?: string | JSX.Element;
  infoList?: InfoList[];
  totalPriceLabel?: string | JSX.Element;
  totalPrice?: string | JSX.Element;
  footer?: JSX.Element;
}

const OrderInfo: FC<OrderInfoProps> = ({
  title,
  infoList,
  totalPrice,
  totalPriceLabel = 'Цена:',
  footer,
}) => {
  return (
    <div className={styles.order_info}>
      {title ? <div className={styles.order_info__title}>{title}</div> : null}
      {infoList && infoList.length ? (
        <div className={styles.order_info__list}>
          {infoList.map((i) => (
            <div className={styles.order_param}>
              <div className={styles.order_param__label}>{i.text}</div>
              <div className={styles.order_param__value}>{i.value}</div>
            </div>
          ))}
        </div>
      ) : null}
      {totalPrice || totalPriceLabel ? (
        <div className={styles.order_info__price}>
          <span className={styles.order_price_label}>{totalPriceLabel}</span>{' '}
          <span className={styles.order_price_value}>{totalPrice}</span>
        </div>
      ) : null}
      {footer}
    </div>
  );
};

export default OrderInfo;
