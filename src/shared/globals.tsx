import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
html {
  scroll-behavior: smooth
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

*, *::after, *::before {
  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6 {
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

input {
  outline: none;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
`;
