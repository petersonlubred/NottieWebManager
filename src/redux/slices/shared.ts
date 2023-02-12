import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark',
  selectedColor: '#00000',
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
  },
});

export const { setMode, setSelectedColor } = sharedSlice.actions;
const { reducer } = sharedSlice;
export default reducer;
