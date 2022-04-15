import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './OrderInfo.module.sass';

interface InfoList {
  text: string | JSX.Element | null;
  value: string | JSX.Element | null;
}

interface OrderInfoProps extends React.ComponentPropsWithoutRef<'div'> {
  infoTitle?: string | JSX.Element | null;
  infoList?: InfoList[] | null;
  totalPriceLabel?: string | JSX.Element | null;
  totalPrice?: string | JSX.Element | null;
  footer?: JSX.Element | null;
}

const OrderInfo: FC<OrderInfoProps> = ({
  infoTitle,
  infoList,
  totalPrice,
  totalPriceLabel = 'Цена:',
  footer,
  className,
}) => {
  return (
    <div className={classNames(styles.order_info, className)}>
      {infoTitle ? (
        <div className={styles.order_info__title}>{infoTitle}</div>
      ) : null}
      {infoList && infoList.length ? (
        <div className={styles.order_info__list}>
          {infoList.map(
            (info, index) =>
              info.value && (
                <div className={styles.order_param} key={index}>
                  <div className={styles.order_param__label}>{info.text}</div>
                  <div className={styles.order_param__value}>{info.value}</div>
                </div>
              )
          )}
        </div>
      ) : null}
      {totalPrice && totalPriceLabel ? (
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
