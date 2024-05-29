import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    typography: {
      title: string;
      option: string;
      product: {
        name: string;
        price: string;
        toggleButton: string;
      };
      toast: string;
    };
    color: {
      black: string;
      darkBlack: string;
      white: string;
      pink: string;
      gray: string;
      borderGray: string;
    };
  }
}
