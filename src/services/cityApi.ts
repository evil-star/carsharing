import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GetCityResponse {
  count: number;
  data: {
    createdAt: number;
    id: string;
    name: string;
    updatedAt: number;
  }[];
  fields: object;
}

export const cityApi = createApi({
  reducerPath: 'cityApi',
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
    getCity: builder.query<GetCityResponse, void | null>({
      query: () => 'city',
    }),
  }),
});

export const { useGetCityQuery } = cityApi;
