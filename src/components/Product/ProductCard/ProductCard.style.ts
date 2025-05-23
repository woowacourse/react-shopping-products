import { css } from '@emotion/react';

export const cardCss = css({
  display: 'flex',
  position: 'relative',
  width: '182px',
  height: '250px',
  flexDirection: 'column',
  borderRadius: '8px 8px 0 0',
  backgroundColor: 'white'
});

export const imageCss = css({
  objectFit: 'cover',
  borderRadius: '8px 8px 0 0 ',
  height: '50%'
});

export const detailCss = css({
  padding: '15px 8px 0 8px',
  h2: {
    fontWeight: '700',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '20px'
  },
  p: { fontWeight: '500', fontSize: '14px', marginBottom: '1rem' }
});
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
