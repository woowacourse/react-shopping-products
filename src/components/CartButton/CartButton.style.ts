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
  color: 'black',
  border: ' 1px solid rgba(0, 0, 0, 0.10)',
  fontSize: '12px',
  borderRadius: '4px',
  height: '24px',
  padding: '4px 8px',
  justifyContent: 'center'
});

export const notInCartCss = css({
  backgroundColor: 'black',
  color: 'white',

  ':disabled': {
    backgroundColor: '#EAEAEA',
    color: 'white'
  }
});
