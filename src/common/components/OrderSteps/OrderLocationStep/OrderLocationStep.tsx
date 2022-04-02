import React, { FC } from 'react';
import { OrderFormData } from '../../../../pages/Order/Order';
import { useGetCityQuery } from '../../../../services/cityApi';
import { useGetPointQuery } from '../../../../services/pointApi';
import Select, { Option } from '../../../ui/Select/Select';
import styles from './OrderLocationStep.module.sass';
import mapImg from '../../../../assets/images/map.jpg';

interface OrderLocationStepProps {
  values: OrderFormData;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const OrderLocationStep: FC<OrderLocationStepProps> = ({
  values,
  setFieldValue = () => {},
}) => {
  const { cities = [], isFetching: isCitiesFetching } = useGetCityQuery(null, {
    selectFromResult: ({ data, isFetching }) => ({
      isFetching,
      cities: data?.data,
    }),
  });
  const { points = [], isFetching: isPointsFetching } = useGetPointQuery(null, {
    selectFromResult: ({ data, isFetching }) => ({
      isFetching,
      points: data?.data?.filter((point) => point.cityId),
    }),
  });

  const pointOptions = points
    .filter((point) =>
      values.city ? point.cityId.id === values.city.value : true
    )
    .map((point) => ({
      label: `${point.name} (${point.address})`,
      value: point.id,
    }));
  const cityOptions = cities
    .filter((city) => points.some((point) => point.cityId?.id === city.id))
    .map((city) => ({
      label: city.name,
      value: city.id,
    }));

  const handleCityChange = (value: Option | null) => {
    setFieldValue('city', value);
    setFieldValue('point', null);
  };

  return (
    <div className={styles.order}>
      <div className={styles.order__field_list}>
        <div className={styles.order__field}>
          <Select
            selectClassName={styles.order__select}
            sideLabel={<div className={styles.order__select_label}>Город</div>}
            placeholder='Начните вводить город ...'
            value={values.city}
            isLoading={isCitiesFetching}
            onChange={handleCityChange}
            options={cityOptions}
          />
        </div>
        <div className={styles.order__field}>
          <Select
            selectClassName={styles.order__select}
            sideLabel={
              <div className={styles.order__select_label}>Пункт выдачи</div>
            }
            placeholder='Начните вводить пункт ...'
            value={values.point}
            isLoading={isPointsFetching}
            onChange={(value) => setFieldValue('point', value)}
            options={pointOptions}
          />
        </div>
      </div>

      <div className={styles.order_map}>
        <div className={styles.order_map__label}>Выбрать на карте:</div>
        <div className={styles.order_map__map}>
          <img src={mapImg} alt='Карта' />
        </div>
      </div>
    </div>
  );
};

export default OrderLocationStep;
