import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../shared/globals';
import theme from '../theme';
import './index.scss';
import { Provider } from 'react-redux';
import { wrapper } from '../redux/store';
import { FC } from 'react';
// import { PersistGate } from 'redux-persist/integration/react';

const MyApp: FC<AppProps> = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <Component {...pageProps} /> {/* </PersistGate> */}
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
