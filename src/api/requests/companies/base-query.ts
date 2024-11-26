import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { BASE_URL_COMPANIES_DEV } from 'src/api/urls/companies';


export const baseQueryCompanies = fetchBaseQuery({ baseUrl: BASE_URL_COMPANIES_DEV });
