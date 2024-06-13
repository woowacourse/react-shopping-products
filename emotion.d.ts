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
      modalItemName: string;
      modalItemPrice: string;
      cartItemCount: string;
      totalPurchasePrice: string;
    };
    color: {
      black: string;
      white: string;
      gray: string;
      lightGray: string;
      captionBlack: string;
      borderGray: string;
      errorPink: string;
      lightBlack: string;
    };
    opacity: {
      disabled: number;
      hover: number;
    };
  }
}
