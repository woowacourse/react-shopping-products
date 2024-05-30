import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    typography: {
      header: string;
      title: string;
      selectOption: string;
      buttonLabel: string;
      price: string;
      itemName: string;
    };
    color: {
      black: string;
      white: string;
      lightGray: string;
      captionBlack: string;
      borderGray: string;
      errorPink: string;
    };
  }
}
