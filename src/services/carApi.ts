import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GetCarCategoriesResponse {
  count: number;
  data: {
    createdAt: number;
    id: string;
    name: string;
    description: string;
    updatedAt: number;
  }[];
  fields: object;
}

interface GetCarResponse {
  count: number;
  data: {
    categoryId: {
      id: string;
      name: string;
      description: string;
    };
    colors: string[];
    createdAt: number;
    description: string;
    id: string;
    name: string;
    number: string;
    priceMax: number;
    priceMin: number;
    tank: number;
    thumbnail: {
      mimetype: string;
      originalname: string;
      path: string;
      size: string;
    };
    updatedAt: number;
  }[];
  fields: object;
}

export const carApi = createApi({
  reducerPath: 'carApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-factory.simbirsoft1.com/api/db/',
    prepareHeaders: (headers) => {
      if (!process.env.REACT_APP_API_APPLICATION_ID) return headers;
      headers.set(
        'X-Api-Factory-Application-Id',
        process.env.REACT_APP_API_APPLICATION_ID
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCar: builder.query<GetCarResponse, void | null>({
      query: () => 'car',
    }),
    getCarCategories: builder.query<GetCarCategoriesResponse, void | null>({
      query: () => 'category',
    }),
  }),
});

export const { useGetCarCategoriesQuery, useGetCarQuery } = carApi;
