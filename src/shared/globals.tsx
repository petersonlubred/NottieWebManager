import { px } from '@/utils';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    padding: 0;
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fontFamilies.default};
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizes.m};
    line-height: 140.5%;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${({ theme }) => theme.fontFamilies.heading};
    font-weight: 400;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  p {
    margin: 0;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    outline: none;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  .cds--btn--primary,
  .btn-primary,
  .btn-primary:hover,
  .cds--btn--primary:hover,
  .btn-primary:active,
  .cds--btn--primary:active,
  .btn-primary:focus,
  .cds--btn--primary:focus,
  .btn-primary:visited,
  .cds--btn--primary:visited {
    background-color: ${({ theme }) => theme.colors.button};
    color: #161616;
    outline: none !important;
    border: none !important;
    font-weight: 500 !important;
    box-shadow: none;
  }

  .cds--btn--secondary,
  .btn-secondary,
  .btn-secondary:hover,
  .cds--btn--secondary:hover,
  .btn-secondary:active,
  .cds--btn--secondary:active,
  .btn-secondary:focus,
  .cds--btn--secondary:focus,
  .btn-secondary:visited,
  .cds--btn--secondary:visited {
    color: #fff !important;
    outline: none !important;
    border: none !important;
    font-weight: 500 !important;
    box-shadow: none;
  }

  input,
  button,
  input:focus,
  button:focus,
  input:active,
  button:active {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  .cds--radio-button__appearance {
    border: 1px solid ${({ theme }) => theme.colors.white} !important;
    outline: none !important;
    box-shadow: none !important;
  }

  .cds--radio-button__appearance::before {
    background-color: ${({ theme }) => theme.colors.white} !important;
    outline: none !important;
    box-shadow: none !important;
  }

  .cds--checkbox-label,.cds--list-box__menu-item__option {
    color: ${({ theme }) => theme.colors.white} !important;
  }
  .cds--list-box__menu-item__option > svg {
    fill: ${({ theme }) => theme.colors.white} !important;
  }

  .cds--checkbox-label::before {
    border: 1px solid ${({ theme }) => theme.colors.white} !important;
    outline: none !important;
    box-shadow: none !important;
  }

  .cds--checkbox-label::after {
    border-bottom: 2px solid ${({ theme }) => theme.colors.black} !important;
    border-left: 2px solid ${({ theme }) => theme.colors.black} !important;
  }
  .cds--checkbox:indeterminate + .cds--checkbox-label::before,
  .cds--checkbox-label[data-contained-checkbox-state='true']::before,
  .cds--checkbox:checked + .cds--checkbox-label::before {
    background-color: ${({ theme }) => theme.colors.white} !important;
  }

  .cds--list-box__menu {
    &:focus {
      outline: none !important;
    }
    & > div {
      background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
      &:hover {
        background-color: ${({ theme }) => theme.colors.bgHover} !important;
      }
      & > div {
        border: none;
      }
    }
  }
   .cds--list-box__menu-item--active {
    background-color: ${({ theme }) => theme.colors.bgHover} !important;
  }


  input[type='text'],
  select {
    height: ${px(48)} !important;
    width: 100% !important;
    border: none !important;
    background-color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
    color: ${({ theme }) => theme.colors.white} !important;
    ::placeholder {
      color: ${({ theme }) => theme.colors.darkPrimary20} !important;
    }
  }
`;
