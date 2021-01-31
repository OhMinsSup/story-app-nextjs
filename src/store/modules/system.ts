import { createSlice } from '@reduxjs/toolkit';

export interface SystemState {}

const initialState: SystemState = {};

const system = createSlice({
  name: 'system',
  initialState,
  reducers: {},
});

export default system;
