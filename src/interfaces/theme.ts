export interface Media {
  // eslint-disable-next-line no-unused-vars
  custom: (maxNumber: number) => string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

export interface IFontSizes {
  s: string;
  m: string;
  l: string;
  xl: string;
  xxl: string;
  xxxl: string;
  xxxxl: string;
}

export interface IFontFamilies {
  heading: string;
  default: string;
}

export interface IColors {
  deepBlack: string;
  bgPrimary: string;
  bgPrimaryLight: string;
  borderLight: string;
  lightBackground: string;
  lightBackgroundtext: string;
  darkPrimary20: string;
  bgHover: string;
  darkPrimary50: string;
  normalText: string;
  lightText: string;
  white: string;
  black: string;
  button: string;
  danger: string;
  grey: string;
  tagBackground: string;
  secondary: string;
  secondaryLight: string;
  dangerLight: string;
  successLight: string;
  primaryLight: string;
  success: string;
  slabackground: string;
}
export interface ITheme {
  colors: IColors;
  media: Media;
  fontFamilies: IFontFamilies;
  fontSizes: IFontSizes;
}
