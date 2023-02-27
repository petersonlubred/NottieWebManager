import React, { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { setMode } from '@/redux/slices/util';
import { RootState } from '@/redux/store';
import theme, { lightTheme } from '@/theme';

const Provider = ({ children }: PropsWithChildren) => {
  const { mode } = useSelector((state: RootState) => state.sharedReducer);
  const Theme = mode === 'dark' ? theme : lightTheme;

  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
      setMode(savedTheme);
    } else if (prefersDark) {
      setMode('dark');
    }
  }, []);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const body = <ThemeProvider theme={Theme}>{children}</ThemeProvider>;

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>;
  }
  return body;
};

export default Provider;
