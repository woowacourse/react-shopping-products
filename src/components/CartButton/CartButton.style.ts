import { css } from '@emotion/react';
export const buttonCss = css({
  width: '64px',
  height: '26px',
  padding: '4px 8px',
  borderRadius: '4px',
  border: 'none',

  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  span: {
    display: 'inline-block'
  },
  justifySelf: 'flex-end'
});

export const inCartCss = css({
  backgroundColor: '#EAEAEA',
  color: 'black'
});

export const notInCartCss = css({
  backgroundColor: 'black',
  color: 'white'
});
