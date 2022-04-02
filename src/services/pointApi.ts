import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GetPointResponse {
  count: number;
  data: {
    address: string;
    cityId: {
      id: string;
      name: string;
    };
    id: string;
    name: string;
  }[];
  fields: object;
}

export const pointApi = createApi({
  reducerPath: 'pointApi',
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
    getPoint: builder.query<GetPointResponse, void | null>({
      query: () => 'point',
    }),
  }),
});

export const { useGetPointQuery } = pointApi;
