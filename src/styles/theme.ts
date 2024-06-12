import { Theme } from '@emotion/react';

interface Colors {
  white: string;
  black: string;
  border: string;
  gray: string;
  darkGray: string;
  divider: string;
}

interface BorderRadius {
  small: string;
  medium: string;
  full: string;
}

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
    borderRadius: BorderRadius;
  }
}

const colors: Colors = {
  white: 'white',
  black: '#000000',
  gray: '#eaeaea',
  darkGray: '#333333',
  border: '#0000001A',
  divider: '#0000001A',
};

const borderRadius: BorderRadius = {
  small: '4px',
  medium: '8px',
  full: '100%',
};

const theme: Theme = {
  colors,
  borderRadius,
};

export default theme;
