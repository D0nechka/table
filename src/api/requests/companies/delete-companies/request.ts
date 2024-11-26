import { BaseQuery } from 'src/types/api';
import { TDeleteCompaniesArgs } from './types';

export const deleteCompaniesQuery: BaseQuery<TDeleteCompaniesArgs> = (args) => ({
  url: '/companies-delete',
  method: 'POST',
  body: args
});
