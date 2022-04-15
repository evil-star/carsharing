import React, { FC, useState } from 'react';
import { OrderLocationStepProps } from '../../../../interfaces/OrderStep.interface';
import {
  useGetCarCategoriesQuery,
  useGetCarQuery,
} from '../../../../services/carApi';
import Radio from '../../../ui/Radio/Radio';
import ModelCard from '../../ModelCard/ModelCard';
import styles from './OrderModelStep.module.sass';
import Skeleton from 'react-loading-skeleton';

const OrderModelStep: FC<OrderLocationStepProps> = ({
  setFieldValue,
  values,
}) => {
  const { car: selectedCar } = values;
  const [activeCategory, setActiveCategory] = useState('ALL');
  const { data: carsData, isFetching: isCarsFetching } = useGetCarQuery();
  const { data: categoriesData, isFetching: isCategoriesFetching } =
    useGetCarCategoriesQuery();
  const categories = categoriesData?.data;
  const cars = carsData?.data;

  const handleModelClick = (car: any) => {
    setFieldValue('car', { id: car.id, name: car.name, colors: car.colors });
  };

  return (
    <div className={styles.order}>
      <div className={styles.order__radio_list}>
        <Radio
          className={styles.order__radio}
          name='model_sort'
          checked={activeCategory === 'ALL'}
          onChange={() => setActiveCategory('ALL')}
        >
          Все модели
        </Radio>
        {isCategoriesFetching ? (
          <Skeleton
            count={4}
            containerClassName={styles.order__categories_skeletons}
            className={styles.order__categories_skeleton}
          />
        ) : (
          categories?.map((category) => (
            <Radio
              key={category.id}
              className={styles.order__radio}
              name='model_sort'
              checked={category.id === activeCategory}
              onChange={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Radio>
          ))
        )}
      </div>
      <div className={styles.order__cards}>
        {isCarsFetching
          ? [...Array(4)].map((card, index) => (
              <ModelCard key={index} className={styles.order__card} loading />
            ))
          : cars?.map(
              (car) =>
                (activeCategory === 'ALL' ||
                  activeCategory === car.categoryId.id) && (
                  <ModelCard
                    key={car.id}
                    isActive={car.id === selectedCar.id}
                    cardTitle={car.name}
                    cardSubtitle={`${car.priceMin} - ${car.priceMax} ₽`}
                    className={styles.order__card}
                    image={car.thumbnail.path}
                    onClick={() => handleModelClick(car)}
                  />
                )
            )}
      </div>
    </div>
  );
};

export default OrderModelStep;
