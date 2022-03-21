import React, { FC, useState } from 'react';
import Stepper, { Step } from '../../common/components/Stepper/Stepper';
import PageHeader from '../../common/components/PageHeader/PageHeader';
import styles from './order.module.sass';
import classNames from 'classnames';
import OrderInfo from '../../common/components/OrderInfo/OrderInfo';

const Order: FC = () => {
  const [activeStep, setActiveStep] = useState<Step>({
    text: 'Местоположение',
    id: 'location',
  });

  const orderSteps = [
    { text: 'Местоположение', id: 'location' },
    { text: 'Модель', id: 'model' },
    { text: 'Дополнительно', id: 'extra' },
    { text: 'Итого', id: 'total' },
  ];

  const handleChangeStep = (step: Step) => {
    console.log(step);
    setActiveStep(step);
  };

  return (
    <div className={styles.order}>
      <div className='container'>
        <PageHeader />
      </div>

      <Stepper
        steps={orderSteps}
        activeStep={activeStep}
        onStepChange={handleChangeStep}
      />

      <div className={styles.order__content}>
        <div
          className={classNames('container', styles.order__content_container)}
        >
          <div className={styles.order__main}>1</div>
          <div className={styles.order__sidebar}>
            <OrderInfo
              title='Ваш заказ:'
              infoList={[
                { text: 'Пункт выдачи', value: <>Ульяновск, <br /> Нариманова 42</> },
                { text: 'Модель', value: 'Hyndai, i30 N' },
              ]}
              totalPrice="от 10 000 до 32 000 ₽"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
