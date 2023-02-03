import { reduxBatch } from '@manaflair/redux-batch';
import { configureStore } from '@reduxjs/toolkit';
// import { persistStore } from 'redux-persist';
import { rootReducer } from '../root-reducer';
import { authApi } from '../services/index';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }),
    authApi.middleware,
  ],
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch],
});

// export const persistor = persistStore(store);

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);


