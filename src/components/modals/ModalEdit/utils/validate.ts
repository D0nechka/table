import { TCompanyValidate } from 'src/types/companies';

export const validate = (selectedCompany: TCompanyValidate, newCompany: TCompanyValidate) => {
  return selectedCompany.name === newCompany.name.trim()
  && selectedCompany.address === newCompany.address.trim();
};
