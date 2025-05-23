import { css } from '@emotion/react';

export const cartItem = css({
  display: 'flex',
  gap: '16px',
  padding: '12px 0',
  borderBottom: '1px solid #eee'
});

export const cartImageWrapper = css({
  width: '80px',
  height: '80px',

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px'
  }
});

export const cartTextBlock = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '4px',
  fontSize: '14px'
});
