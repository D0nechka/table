import { configureStore } from '@reduxjs/toolkit';
import { companiesSlice } from './companies';
import { companiesApi } from 'src/api/requests/companies/api';
import { modalDeleteSlice } from './modalDelete';

export const store = configureStore({
  reducer: {
    companies: companiesSlice.reducer,
    modalDelete: modalDeleteSlice.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(companiesApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
