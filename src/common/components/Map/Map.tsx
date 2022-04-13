import React from 'react';
import { YMaps, Map as YandexMap, MapProps } from 'react-yandex-maps';

const Map: React.ComponentType<MapProps> = ({ children, ...rest }) => {
  return (
    <YMaps
      query={{
        load: 'package.full',
        apikey: process.env.REACT_APP_YANDEX_MAP_TOKEN,
      }}
    >
      <YandexMap {...rest}>{children}</YandexMap>
    </YMaps>
  );
};

export default Map;
