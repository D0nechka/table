import { TCompany } from '../../types/companies';

export type TCompaniesState = {
    companies: TCompany[];
    lastCursor: number;
    isLoadingAddCompanies: boolean;
    isSelectedAllCompanies: boolean;
    isLoadingMultiDeletes: boolean;
    isAddCompanyModalOpen: boolean;
    isEditCompanyModalOpen: boolean,
}
