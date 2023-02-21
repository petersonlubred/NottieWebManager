import { createSlice } from '@reduxjs/toolkit';

interface IState {
  mode: string;
  selectedColor: string;
  notifications: any[];
}

const initialState: IState = {
  mode: 'dark',
  selectedColor: '#00000',
  notifications: [],
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
  },
});

export const { setMode, setSelectedColor, setNotifications } =
  sharedSlice.actions;
const { reducer } = sharedSlice;
export default reducer;
