import { companiesSlice } from '.';
import { RootState } from '../types';
import { TCompaniesState } from './types';

const selector = (store:RootState):TCompaniesState =>
  store['companies'] || companiesSlice.getInitialState;

export const getCompaniesSelector = (store:RootState) => selector(store).companies;
export const getIsSelectedAllCompaniesSelector = (store:RootState) => selector(store).isSelectedAllCompanies;
export const getIsLoadingMultipleDeletesSelector = (store:RootState) => selector(store).isLoadingMultiDeletes;
export const getLastCursorSelector = (store:RootState) => selector(store).lastCursor;
export const getisLoadingAddCompanies = (store:RootState) => selector(store).isLoadingAddCompanies;
export const getAddCompanyModalOpen = (store:RootState) => selector(store).isAddCompanyModalOpen;
export const getEditCompanyModalOpen = (store:RootState) => selector(store).isEditCompanyModalOpen;
