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
      toastTitle: string;
      cartLabel: string;
      cartItem: {
        name: string;
        price: string;
        quantity: string;
        deleteButton: string;
      };
    };
    color: {
      black: string;
      darkBlack: string;
      white: string;
      pink: string;
      gray: string;
      borderGray: string;
      error: string;
      errorLight: string;
    };
  }
}
