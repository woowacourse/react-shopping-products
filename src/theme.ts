import { Theme } from '@emotion/react';

const theme: Theme = {
  typography: {
    title: `
      font-family: Noto Sans KR;
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 2.17rem;
    `,
    option: `
      font-family: Inter;
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1.25rem;
    `,
    product: {
      name: `
      font-family: Inter;
        font-size: 0.875rem;
        font-weight: 700;
        line-height: 1.25rem;
        `,
      price: `
        font-family: Noto Sans;
        font-size: 12px;
        font-weight: 500;
        line-height: 0.9375rem;
        text-align: left;
      `,
      toggleButton: `
        font-family: Noto Sans;
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 0.9375rem;
      `,
    },
    toast: `
      font-family: Noto Sans;
      font-size: 12px;
      font-weight: 500;
      line-height: 0.9375rem;
      text-align: left;
    `,
  },
  color: {
    black: '#000000',
    darkBlack: '#0A0D13',
    white: '#FFFFFF',
    pink: '#FFC9C9',
    gray: '#EAEAEA',
    borderGray: '#0000001A',
  },
};

export default theme;
