const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

interface Media {
  // eslint-disable-next-line no-unused-vars
  custom: (maxNumber: number) => string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

const media: Media = {
  custom: customMediaQuery,
  sm: customMediaQuery(592),
  md: customMediaQuery(768),
  lg: customMediaQuery(992),
  xl: customMediaQuery(1024),
  xxl: customMediaQuery(1200),
  xxxl: customMediaQuery(1440),
};

const fontSizes = {
  s: '12px',
  m: '14px',
  l: '16px',
  xl: '18px',
  xxl: '20px',
  xxxl: '22px',
  xxxxl: '28px',
};

const fontFamilies = {
  heading: 'Source Sans Pro, sans-serif',
  default: 'IBM Plex Sans, sans-serif',
};

const theme = {
  colors: {
    bgPrimary: '#161616',
    bgPrimaryLight: '#262626',
    darkPrimary20: '#525252',
    bgHover: '#6F6F6F',
    darkPrimary50: '#393939',
    normalText: '#F2B301',
    lightText: '#c6c6c6',
    white: '#FFF',
    black: '#000',
    button: '#F4B400',
  },
  media,
  fontFamilies,
  fontSizes,
};

export const lightTheme = {
  colors: {
    bgPrimary: '#ffffff',
    bgPrimaryLight: '#f4f4f4',
    darkPrimary20: '#525252',
    bgHover: '#e8e8e8',
    darkPrimary50: '#f4f4f4',
    normalText: '#F2B301',
    lightText: '#8d8d8d',
    white: '#000',
    black: '#FFF',
    button: '#F4B400',
  },
  media,
  fontFamilies,
  fontSizes,
};
export type ThemeType = typeof theme & typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

export default theme;
