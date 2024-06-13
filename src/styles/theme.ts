import { Theme } from '@emotion/react';

const theme: Theme = {
  typography: {
    header: `
      font-family: Noto Sans;
      font-weight: 800;
      font-size: 1.25rem;
      line-height: 1rem;
    `,
    title: `
      font-family: Noto Sans KR;
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 2.17rem;
    `,
    selectOption: `
    font-family: Inter;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 20px; 
    `,
    price: `
    font-family: Noto Sans KR;
    font-weight: 700;
    font-size: 0.75rem;
    line-height: 15px;
    `,
    itemName: `
    font-family: Inter;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    `,
    buttonLabel: `
    font-family: Noto Sans;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 15px;
    `,
    modalItemName: `
    font-family: Noto Sans KR;
    font-weight: 700;
    font-size: 1rem;
    line-height: 23.17px;
    `,
    modalItemPrice: `
    font-family: Noto Sans;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 15px;
    `,
    cartItemCount: `
    font-family: Montserrat;
    font-weight: 700;
    font-size: 0.625rem;
    `,
    totalPurchasePrice: `
    font-family: Noto Sans KR;
    font-weight: 700;
    font-size: 1.5rem;
    `,
  },
  color: {
    black: '#000000',
    white: '#FFFFFF',
    gray: '#4f4f4f',
    lightGray: '#EAEAEA',
    captionBlack: '#0A0D13',
    borderGray: '#0000001A',
    errorPink: '#FFC9C9',
    lightBlack: '#acacac',
  },
  opacity: {
    disabled: 0.1,
    hover: 0.6,
  },
};

export default theme;
