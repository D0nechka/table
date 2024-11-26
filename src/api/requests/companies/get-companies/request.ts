import { BaseQuery } from 'src/types/api';
import { TGetCompanyArgs } from './types';

export const getCompaniesQuery: BaseQuery<TGetCompanyArgs> = (args) => ({
  url: '/companies-get',
  method: 'POST',
  body: args
});
