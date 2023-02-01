import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../shared/globals';
import { GlobalTheme } from '@carbon/react';
import theme from '../theme';
import './index.scss';
import useDarkMode from '@/hooks/useDarkMode';

function MyApp({ Component, pageProps }: AppProps) {
  const [themeMode] = useDarkMode();

  return (
    <ThemeProvider theme={theme}>
      <GlobalTheme theme={'g100'}>
        <GlobalStyles />
        <Component {...pageProps} theme={themeMode} />
      </GlobalTheme>
    </ThemeProvider>
  );
}

export default MyApp;
