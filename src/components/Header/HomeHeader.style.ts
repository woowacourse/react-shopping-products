import { css } from '@emotion/react';

export const logoCss = css({
  color: 'white',
  fontWeight: 800,
  fontSize: '20px'
});

export const cartIcon = css({
  position: 'relative',

  img: {
    width: '32px',
    height: '32px'
  },
  span: {
    position: 'absolute',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: 'white',
    bottom: '0%',
    right: '0%',
    textAlign: 'center',
    fontSize: '14px'
  }
});

export const modalContent = css({ maxHeight: '444px', overflowY: 'auto' });

export const totalPriceCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '& > p:first-of-type': {
    fontWeight: 700
  },
  '& > p:last-of-type': {
    fontSize: '24px',
    fontWeight: 700
  }
});

export const footerCss = css({
  width: '100%',
  gap: '24px',
  display: 'flex',
  flexDirection: 'column'
});
export const buttonCss = css({
  width: '100%'
});
