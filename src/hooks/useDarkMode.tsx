import React from 'react';

const useDarkMode = () => {
  const [themeMode, setTheme] = React.useState('dark');

  const toggleDarkMode = () => {
    themeMode === 'light' ? setTheme('dark') : setTheme('light');
  };

  return [themeMode, toggleDarkMode];
};

export default useDarkMode;
