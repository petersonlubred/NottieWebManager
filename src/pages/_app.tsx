import type { AppProps } from 'next/app';
import { GlobalStyles } from '../shared/globals';
import './index.scss';
import { Provider } from 'react-redux';
import { persistor, wrapper } from '../redux/store';
import { FC } from 'react';
import ThemeProvider from '@/providers';
import { PersistGate } from 'redux-persist/integration/react';
import '@carbon/charts/styles.css';
import { AppContextProvider } from '@/context';
import Toast from '@/components/shared/Notification/Toast';
import Loader from '@/components/shared/Loader';

const MyApp: FC<AppProps> = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <ThemeProvider>
        <GlobalStyles />
        <PersistGate loading={<Loader />} persistor={persistor}>
          <AppContextProvider>
            <Toast />
            <Component {...pageProps} />
          </AppContextProvider>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
