import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TModalDeleteState } from './types';

const initialState: TModalDeleteState = {
  deleteIds: []
};

export const modalDeleteSlice = createSlice({
  name: 'modalDelete',
  initialState,
  reducers: {
    addDeleteIds: (state, { payload }: PayloadAction<number[]>) => {
      state.deleteIds.push(...payload);
    },
    clearDeleteIds: (state) => {
      state.deleteIds = [];
    }
  }
});

export const {
  addDeleteIds,
  clearDeleteIds
} = modalDeleteSlice.actions;
