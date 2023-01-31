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
  h: '24px',
};

const fontFamilies = {
  default: 'Source Sans Pro, sans-serif',
  heading: 'sans-serif',
};

const theme = {
  colors: {
    lightPrimary10: '#7976B6',
    lightPrimary20: '#9492C4',
    lightPrimary30: '#AEADD3',
    lightPrimary40: '#C9C8E2',
    lightPrimary50: '#C9C8E2',
    primary: '#5E5BA7',
    darkPrimary10: '#4E4C8B',
    darkPrimary20: '#3F3D6F',
    darkPrimary30: '#2F2E54',
    darkPrimary40: '#1F1E38',
    darkPrimary50: '#131221',
    normalText: '##131221',
    titleText: '#131221',
    bodyText: '#525171',
    helperText: '#706F77',
    mainBg: '#F8F8FB',
    secondaryBg: '#FFFFFF',
    white: '#FFF',
    black: '#000',
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
