import { css } from '@emotion/react';
export const listCss = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  width: '400px',
  placeItems: 'center',
  margin: '0 auto',
  minHeight: '800px'
});

export const dropdownDivCss = css({
  display: 'flex',
  width: '385px',
  justifyContent: 'space-between',
  marginBottom: '24px'
});
