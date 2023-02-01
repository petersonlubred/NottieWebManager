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
    lightPrimary10: '#F4B400',
    lightPrimary20: '#9492C4',
    lightPrimary30: '#AEADD3',
    lightPrimary40: '#C9C8E2',
    lightPrimary50: '#C9C8E2',
    primary: '#525252',
    darkPrimary: '#161616',
    darkPrimary10: '#262626;',
    darkPrimary20: '#525252',
    darkPrimary30: '#6F6F6F',
    Label: '#C6C6C6',
    darkPrimary50: '#131221',
    normalText: '#F2B301',
    titleText: '#131221',
    bodyText: '#525171',
    helperText: '#706F77',
    mainBg: '#F8F8FB',
    secondaryBg: '#FFFFFF',
    white: '#FFF',
    black: '#000',
    button: '#F4B400',
  },
  gradients: {
    default: '-webkit-linear-gradient(0deg, #3671FF 34.03%, #625DF4 99.78%)',
    text: '-webkit-linear-gradient(0deg, #625DF4 42.74%, #00CBFF 100%)',
    text2:
      '-webkit-linear-gradient(0deg, #3671FF 42.74%, #625DF4 71.11%, #00CBFF 100%)',
  },
  media,
  fontFamilies,
  fontSizes,
};

export type ThemeType = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

export default theme;
