import { BaseQuery } from 'src/types/api';
import { CreateCompanyArgs } from './types';

export const createCompanyQuery: BaseQuery<CreateCompanyArgs> = (args) => ({
  url: '/companies-create',
  method: 'POST',
  body: args
});
