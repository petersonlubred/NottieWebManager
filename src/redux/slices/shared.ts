import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  mode: 'light',
};

const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setMode: (state, { payload }) => {
      state.mode = payload;
    },
  },
});

export const { setMode } = sharedSlice.actions;
const { reducer } = sharedSlice;
export default reducer;
