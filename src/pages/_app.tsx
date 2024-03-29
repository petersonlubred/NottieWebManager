import './index.scss';
import '@carbon/styles/css/styles.css';
import '@carbon/charts/styles.css';

import type { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import ErrorBoundary from '@/components/shared/ErrorBoundary';
import Loader from '@/components/shared/Loader';
import Toast from '@/components/shared/Notification/Toast';
import { AppContextProvider } from '@/context';
import ThemeProvider from '@/providers';

import { persistor, wrapper } from '../redux/store';
import { GlobalStyles } from '../shared/globals';

const MyApp: FC<AppProps> = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <ThemeProvider>
        <GlobalStyles />
        <PersistGate loading={<Loader />} persistor={persistor}>
          <AppContextProvider>
            <ErrorBoundary>
              <Toast />
              <Component {...pageProps} />
            </ErrorBoundary>
          </AppContextProvider>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
