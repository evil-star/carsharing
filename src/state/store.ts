import { configureStore } from '@reduxjs/toolkit';
import { cityApi } from '../services/cityApi';
import { pointApi } from '../services/pointApi';

const store = configureStore({
  reducer: {
    [cityApi.reducerPath]: cityApi.reducer,
    [pointApi.reducerPath]: pointApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cityApi.middleware, pointApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
