import { reduxBatch } from '@manaflair/redux-batch';
import { configureStore } from '@reduxjs/toolkit';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { alertApi, databaseApi, roleApi, smtpApi, userApi, templateApi } from '../api';
import { rootReducer } from '../root-reducer';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk: true,
    }),
    sagaMiddleware,
    databaseApi.middleware,
    smtpApi.middleware,
    roleApi.middleware,
    userApi.middleware,
    alertApi.middleware,
    templateApi.middleware
  ],
  enhancers: [reduxBatch],
});

export const persistor = persistStore(store);

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

sagaMiddleware.run(rootSaga);
