import React, { FC, useState } from 'react';
import Stepper, { Step, StepId } from '../../common/components/Stepper/Stepper';
import PageHeader from '../../common/components/PageHeader/PageHeader';
import styles from './Order.module.sass';
import classNames from 'classnames';
import OrderInfo from '../../common/components/OrderInfo/OrderInfo';
import OrderLocationStep from '../../common/components/OrderSteps/OrderLocationStep/OrderLocationStep';
import Button from '../../common/ui/Button/Button';
import { Option } from '../../common/ui/Select/Select';
import { useGetPointQuery } from '../../services/pointApi';
import { FormikProps, useFormik } from 'formik';

export interface OrderFormData {
  city: Option | null;
  point: Option | null;
  modelName: string | null;
  color: string | null;
  rentDateFrom: string | null;
  rentDateTo: string | null;
  rate: string | null;
  fullTank: boolean;
  babyChair: boolean;
  rightHandDrive: boolean;
}

type OrderField = keyof OrderFormData;
type OrderStepId = 'location' | 'model' | 'extra' | 'total';

interface OrderStep extends Step {
  buttonText: string;
  required?: OrderField[];
  nextStep?: OrderStepId;
}

const Order: FC = () => {
  const { points = [] } = useGetPointQuery(null, {
    selectFromResult: ({ data }) => ({
      points: data?.data,
    }),
  });

  const { values, setFieldValue }: FormikProps<OrderFormData> =
    useFormik<OrderFormData>({
      initialValues: {
        city: null,
        point: null,
        modelName: null,
        color: null,
        rentDateFrom: null,
        rentDateTo: null,
        rate: null,
        fullTank: false,
        babyChair: false,
        rightHandDrive: false,
      },
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  const [activeStep, setActiveStep] = useState<StepId>('location');

  const orderSteps: OrderStep[] = [
    {
      text: 'Местоположение',
      id: 'location',
      isAvailable: true,
      buttonText: 'Выбрать модель',
      nextStep: 'model',
      required: ['city', 'point'],
    },
    {
      text: 'Модель',
      id: 'model',
      isAvailable: !!values.city && !!values.point,
      buttonText: 'Дополнительно',
      nextStep: 'extra',
      required: ['modelName'],
    },
    {
      text: 'Дополнительно',
      id: 'extra',
      isAvailable: !!values.modelName,
      buttonText: 'Итого',
      nextStep: 'total',
      required: ['color', 'rentDateFrom', 'rentDateTo'],
    },
    {
      text: 'Итого',
      id: 'total',
      isAvailable:
        !!values.color &&
        !!values.rentDateFrom &&
        !!values.rentDateTo &&
        !!values.rate,
      buttonText: 'Заказать',
    },
  ];
  const activeStepData = orderSteps.find((step) => step.id === activeStep);
  const stepperSteps = orderSteps.map(({ text, id, isAvailable }) => ({
    text,
    id,
    isAvailable,
  }));

  const orderInfoList = [
    {
      text: 'Пункт выдачи',
      value: values.point && values.city && (
        <>
          {values.city.label} <br />
          {points.find((point) => point.id === values.point?.value)?.address}
        </>
      ),
    },
  ];

  return (
    <div className={styles.order}>
      <div className='container'>
        <PageHeader />
      </div>

      <Stepper
        className={styles.order__stepper}
        steps={stepperSteps}
        activeStep={activeStepData || orderSteps[0]}
        onStepChange={setActiveStep}
      />

      <div className={styles.order__content}>
        <div
          className={classNames('container', styles.order__content_container)}
        >
          <div className={styles.order__main}>
            <div className={styles.order__main_container}>
              {activeStep === 'location' && (
                <OrderLocationStep
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}
            </div>
          </div>
          <div className={styles.order__sidebar}>
            <OrderInfo
              title='Ваш заказ:'
              infoList={orderInfoList}
              footer={
                <Button
                  className={styles.order__info_button}
                  onClick={() => setActiveStep(activeStepData?.nextStep)}
                  disabled={
                    !activeStepData?.required?.every((item) => values[item])
                  }
                >
                  {activeStepData?.buttonText}
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
