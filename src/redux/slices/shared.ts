import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark',
};

const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setMode: (state, { payload }) => {
      localStorage.setItem('theme', payload);
      state.mode = payload;
    },
  },
});

export const { setMode } = sharedSlice.actions;
const { reducer } = sharedSlice;
export default reducer;
