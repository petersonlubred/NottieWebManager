import { createSlice } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';

interface IState {
  intervals: string;
  number: number;
  lastSync: string;
}

const initialState: IState = {
  intervals: 'minute',
  number: 5,
  lastSync: 'Now',
};

export const dashboardPersistConfig = {
  storage: storageSession,
  key: 'dashboard',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setIntervals: (state, { payload }) => {
      localStorage.setItem('dashboard_intervals', payload);
      state.intervals = payload;
    },
    setNumber: (state, { payload }) => {
      localStorage.setItem('dashboard_intervals_number', payload);
      state.number = payload;
    },
    setLastSync: (state, { payload }) => {
      localStorage.setItem('dashboard_lastSync', payload);
      state.lastSync = payload;
    },
  },
});

export const { setNumber, setIntervals, setLastSync } = dashboardSlice.actions;

const { reducer } = dashboardSlice;
export default reducer;
