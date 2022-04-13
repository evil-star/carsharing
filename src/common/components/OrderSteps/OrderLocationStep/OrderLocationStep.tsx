import React, { FC, useState } from 'react';
import { OrderFormData } from '../../../../pages/Order/Order';
import { useGetCityQuery } from '../../../../services/cityApi';
import { useGetPointQuery } from '../../../../services/pointApi';
import Select, { Option } from '../../../ui/Select/Select';
import styles from './OrderLocationStep.module.sass';
import Map from '../../Map/Map';
import { Placemark, YMapsApi } from 'react-yandex-maps';
import mapMarker from '../../../../assets/images/icons/map-marker.svg';

interface OrderLocationStepProps {
  values: OrderFormData;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const OrderLocationStep: FC<OrderLocationStepProps> = ({
  values,
  setFieldValue = () => {},
}) => {
  const [placemarksCoords, setPlacemarksCoords] = useState<any[]>([]);
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
  const filteredPoints = points.filter((point) =>
    values.city ? point.cityId.id === values.city.value : true
  );

  const pointOptions = filteredPoints.map((point) => ({
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

  const handleMapLoad = async (ymaps: YMapsApi) => {
    const pointsCoords = await Promise.all(
      filteredPoints.map(async (point) => {
        const res = await ymaps.geocode(
          `${point.cityId.name} ${point.address}`
        );
        const coords = res.geoObjects.get(0).geometry.getCoordinates();
        return coords;
      })
    );
    setPlacemarksCoords(pointsCoords);
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
        <Map
          onLoad={handleMapLoad}
          className={styles.order_map__map}
          state={{ center: placemarksCoords[0] || [55.75, 37.57], zoom: 11 }}
        >
          {placemarksCoords.map((coords) => (
            <Placemark
              key={coords}
              geometry={coords}
              options={{
                iconLayout: 'default#image',
                iconImageHref: mapMarker,
                iconImageSize: [18, 18],
                iconImageOffset: [-8, -8],
              }}
            />
          ))}
        </Map>
      </div>
    </div>
  );
};

export default OrderLocationStep;
