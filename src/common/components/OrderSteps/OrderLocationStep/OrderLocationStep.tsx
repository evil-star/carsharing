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

interface IPlacemark {
  coords: number[];
  pointId: string;
  cityId: string;
}

const OrderLocationStep: FC<OrderLocationStepProps> = ({
  values,
  setFieldValue = () => {},
}) => {
  const [mapPlacemarks, setMapPlacemarks] = useState<IPlacemark[]>([]);
  const activePlacemark = values.point?.value
    ? mapPlacemarks.find(
        (placemark) => placemark.pointId === values.point?.value
      )
    : null;
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

  const handlePlacemarkClick = (placemark: IPlacemark) => {
    const { pointId, cityId } = placemark;
    const city = cities.find((city) => city.id === cityId);
    const point = points.find((point) => point.id === pointId);
    setFieldValue('city', { label: city?.name, value: city?.id });
    setFieldValue('point', {
      label: `${point?.name} (${point?.address})`,
      value: point?.id,
    });
  };

  const handleMapLoad = async (ymaps: YMapsApi) => {
    const placemarks = await Promise.all(
      points.map(async (point) => {
        const res = await ymaps.geocode(
          `${point.cityId.name} ${point.address}`
        );
        const coords = res.geoObjects.get(0).geometry.getCoordinates();
        return { coords, pointId: point.id, cityId: point.cityId.id };
      })
    );
    setMapPlacemarks(placemarks);
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
          state={{
            center: activePlacemark?.coords ||
              mapPlacemarks[0]?.coords || [0, 0],
            zoom: 14,
            controls: ['zoomControl'],
          }}
        >
          {mapPlacemarks.map((placemark) => (
            <Placemark
              key={placemark.pointId}
              onClick={() => handlePlacemarkClick(placemark)}
              geometry={placemark.coords}
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
