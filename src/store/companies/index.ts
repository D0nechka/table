import { TCompany } from './../../types/companies';
import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCompaniesState } from './types';

const initialState: TCompaniesState = {
  companies: [],
  lastCursor: 0,
  isSelectedAllCompanies: false,
  isLoadingMultiDeletes: false,
  isAddCompanyModalOpen: false,
  isLoadingAddCompanies: false,
  isEditCompanyModalOpen:false
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompanies(state,{ payload }: PayloadAction<TCompany[]>) {
      state.companies = [...state.companies, ...payload];
    },
    setCompanies(state,{ payload }: PayloadAction<TCompany[]>) {
      state.companies = payload;
    },
    toggleSelectCompany(state, { payload }:PayloadAction<number>) {
      state.companies = state.companies.map((company) => {
        if(company.id === payload) {
          company.isSelected = !company.isSelected;
        }
        return company;
      });
    },
    setSelectAllCompanies(state, { payload }: PayloadAction<boolean>) {
      state.isSelectedAllCompanies = payload;
    },
    toggleSelectAllCompanies(state) {
      state.isSelectedAllCompanies = !state.isSelectedAllCompanies;
      state.companies = state.companies.map((company) => ({
        ...company,
        isSelected: state.isSelectedAllCompanies
      }));
    },
    setLastCursor(state, { payload }: PayloadAction<number>) {
      state.lastCursor = payload;
    },
    startLoadingMultiDeletes(state) {
      state.isLoadingMultiDeletes = true;
    },
    stopLoadingMultiDeletes(state) {
      state.isLoadingMultiDeletes = false;
    },
    openAddCompanyModal(state) {
      state.isAddCompanyModalOpen = true;
    },
    closeAddCompanyModal(state) {
      state.isAddCompanyModalOpen = false;
    },
    startAddCompanies: (state) => {
      state.isLoadingAddCompanies = true;
    },
    stopAddCompanies: (state) => {
      state.isLoadingAddCompanies = false;
    },
    openEditCompanyModal(state) {
      state.isEditCompanyModalOpen = true;
    },
    closeEditCompanyModal(state) {
      state.isEditCompanyModalOpen = false;
    }
  }
});

export const {
  addCompanies,
  setCompanies,
  setLastCursor,
  startLoadingMultiDeletes,
  stopLoadingMultiDeletes,
  toggleSelectAllCompanies,
  toggleSelectCompany,
  openAddCompanyModal,
  closeAddCompanyModal,
  startAddCompanies,
  stopAddCompanies,
  openEditCompanyModal,
  setSelectAllCompanies,
  closeEditCompanyModal
} = companiesSlice.actions;
