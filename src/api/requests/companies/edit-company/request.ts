import { BaseQuery } from 'src/types/api';
import { TEditCompanyArgs } from './types';

export const editCompanyQuery: BaseQuery<TEditCompanyArgs> = (args) => ({
  url: '/companies-edit',
  method: 'POST',
  body: args
});
