import { modalDeleteSlice } from '.';
import { RootState } from '../types';
import { TModalDeleteState } from './types';

const selector = (store: RootState): TModalDeleteState =>
  store['modalDelete'] || modalDeleteSlice.getInitialState();

export const getDeleteIdsSelector = (store: RootState) => selector(store).deleteIds;
