import { TCompanyValidate } from 'src/types/companies';

export const validateCreateForm = ({ name, address }: TCompanyValidate) => name.trim() && address.trim();
