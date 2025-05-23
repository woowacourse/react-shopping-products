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
