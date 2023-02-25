import { createSlice } from '@reduxjs/toolkit';

interface IState {
  mode: string;
  selectedColor: string;
  notifications: any[];
  tab: number;
}

const initialState: IState = {
  mode: 'dark',
  selectedColor: '#00000',
  notifications: [],
  tab: 0,
};

const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setMode: (state, { payload }) => {
      localStorage.setItem('theme', payload);
      state.mode = payload;
    },
    setSelectedColor: (state, { payload }) => {
      state.selectedColor = payload;
    },
    setNotifications: (state, { payload }) => {
      state.notifications = [payload, ...state.notifications];
    },
    setTab: (state, { payload }) => {
      state.tab = payload;
    },
  },
});

export const { setMode, setSelectedColor, setNotifications, setTab } = sharedSlice.actions;
const { reducer } = sharedSlice;
export default reducer;
