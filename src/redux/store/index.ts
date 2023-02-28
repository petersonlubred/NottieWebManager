import { reduxBatch } from '@manaflair/redux-batch';
import { configureStore } from '@reduxjs/toolkit';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

<<<<<<< HEAD
import { databaseApi, roleApi, smtpApi, userApi, smscApi } from '../api';
=======
import { alertApi, databaseApi, roleApi, smtpApi, userApi } from '../api';
>>>>>>> 7bd1e48e08b7c9539b30488701f6b38734fdaf9b
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
    smscApi.middleware,
    roleApi.middleware,
    userApi.middleware,
<<<<<<< HEAD
    smtpApi.middleware,
=======
    alertApi.middleware,
>>>>>>> 7bd1e48e08b7c9539b30488701f6b38734fdaf9b
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
