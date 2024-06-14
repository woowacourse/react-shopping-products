import { Theme } from '@emotion/react';

interface ZIndex {
  header: number;
  dropdown: number;
}

interface Colors {
  white: string;
  semiBlack: string;
  gray: string;
  black: string;
  border: string;
  text: string;
  divider: string;

  optionBorder: string;
  optionBg: string;

  btnBgColor: string;
  btnActiveBgColor: string;

  errorFallback: string;
  spinnerColor: string;
}

interface Size {
  applicationSize: string;
}

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
    zIndex: ZIndex;
    size: Size;
  }
}

const zIndex: ZIndex = {
  header: 20,
  dropdown: 10,
};

const colors: Colors = {
  white: 'white',
  black: '#000000',
  semiBlack: '#0000001A',
  gray: '#BEBEBE',

  text: '#0A0D13',
  divider: '#0000001A',
  border: '#eaeaea',

  optionBorder: '#ddd',
  optionBg: '#e1e1e1',

  btnBgColor: '#000000',
  btnActiveBgColor: '#eaeaea',

  errorFallback: '#ffc9c9B3',
  spinnerColor: '#CA5514',
};

const size: Size = {
  applicationSize: '430px',
};

const theme: Theme = {
  colors,
  zIndex,
  size,
};

export default theme;
