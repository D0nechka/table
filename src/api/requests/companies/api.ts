/* eslint-disable no-console */
import { createApi } from '@reduxjs/toolkit/query/react';
import { addCompanies, setCompanies, setLastCursor, startAddCompanies, startLoadingMultiDeletes, stopAddCompanies, stopLoadingMultiDeletes } from 'src/store/companies';
import { getCompanies, createCompany, baseQueryCompanies, editCompany, deleteCompanies } from '.';

export const companiesApi = createApi({
  reducerPath: 'companiesApi',
  baseQuery: baseQueryCompanies,
  tagTypes: ['Companies'],
  endpoints: (builder) => ({
    getCompanies: builder.query<getCompanies.TGetCompanyResult, getCompanies.TGetCompanyArgs>({
      query: getCompanies.getCompaniesQuery,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          if(arg.lastCursor !== 0) {
            dispatch(startAddCompanies());
          }

          const { data } = await queryFulfilled;
          const resultData = data.companies.map((company) => ({
            ...company,
            isSelected: false
          }));

          if(arg.lastCursor === 0) {
            dispatch(setCompanies(resultData));
          } else {
            dispatch(addCompanies(resultData));
          }
          dispatch(setLastCursor(data.lastCursor));
          dispatch(stopAddCompanies());
        } catch(e) {
          console.error('error get companies');
        }
      }
    }),
    createCompany: builder.mutation<createCompany.CreateCompanyResult, createCompany.CreateCompanyArgs>({
      query: createCompany.createCompanyQuery
    }),
    editCompany: builder.mutation<editCompany.TEditCompanyResult, editCompany.TEditCompanyArgs>({
      query: editCompany.editCompanyQuery
    }),
    deleteCompanies: builder.mutation<deleteCompanies.TDeleteCompaniesResult, deleteCompanies.TDeleteCompaniesArgs>({
      query: deleteCompanies.deleteCompaniesQuery,
      onQueryStarted: async ({ ids }, { queryFulfilled, dispatch }) => {
        try {
          if(ids.length > 1) {
            dispatch(startLoadingMultiDeletes());
          }
          await queryFulfilled;
          dispatch(stopLoadingMultiDeletes());
        } catch(e) {
          console.error('error delete companies', e);
        }
      }
    })
  })
});
