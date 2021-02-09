import { createSlice } from '@reduxjs/toolkit';
import { closeAuthModal, showAuthModal } from './actions/system.action';

export interface SystemState {
  layer: boolean;
  auth: {
    visible: boolean;
  };
  popup: {
    visible: boolean;
    title: string;
    message: string;
  };
}

const initialState: SystemState = {
  layer: false,
  auth: {
    visible: false,
  },
  popup: {
    visible: false,
    title: '',
    message: '',
  },
};

const system = createSlice({
  name: 'system',
  initialState,
  reducers: {
    showAuthModal,
    closeAuthModal,
  },
});

export default system;
