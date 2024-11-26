import { TCompanyServer } from '../../../../types/companies';

export type CreateCompanyArgs = {
  name: string;
  address: string;
}

export type CreateCompanyResult = {
  company: TCompanyServer;
}
