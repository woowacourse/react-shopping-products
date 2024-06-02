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
    font-size: 0.875rem;
    font-weight: 500;
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
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
  `,
    buttonLabel: `
    font-family: Noto Sans;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 15px;
`,
  },
  color: {
    black: '#000000',
    white: '#FFFFFF',
    lightGray: '#EAEAEA',
    captionBlack: '#0A0D13',
    borderGray: '#0000001A',
    errorPink: '#FFC9C9',
  },
};

export default theme;
