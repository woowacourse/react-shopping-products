import { css } from '@emotion/react';

export const theme = {
  colors: {
    caption: '#8b95a1',
    background: '#f9f9f9',
    cardBackground: '#333333',
    cardText: '#ffffff',
    border: '#cccccc',
    error: '#ff0000',
    black: '#000000',
  },
  fonts: {
    inter: 'Inter, sans-serif',
  },
  heading: css`
    font-size: 28px;
    font-weight: 700;
  `,
  title: css`
    font-size: 16px;
    font-weight: 700;
  `,
  body1: css`
    font-size: 16px;
    font-weight: 500;
  `,
  body2: css`
    font-size: 14px;
    font-weight: 500;
  `,
};

export type AppTheme = typeof theme;
