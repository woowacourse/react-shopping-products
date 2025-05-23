import { css } from '@emotion/react';

export const wrapperStyle = css({
  position: 'relative',
  width: '125px'
});

export const selectBoxStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '125px',
  borderRadius: '8px',
  padding: '12px',
  fontSize: '14px',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  cursor: 'pointer',
  textAlign: 'left'
});
// 애니메이션은 어떻게 넣을까요?
export const openStyle = css({
  borderColor: '#0070f3',
  img: {
    transform: 'rotate(180deg)'
  }
});

export const selectedStyle = css({
  color: '#333'
});

export const unSelectedStyle = css({
  color: '#aaa'
});

export const listStyle = css({
  position: 'absolute',
  top: '100%',
  left: 0,
  zIndex: 10,
  width: '100%',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderTop: 'none',
  maxHeight: '200px'
});

export const itemStyle = css({
  width: '125px',
  padding: '10px 12px',
  fontSize: '14px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f1f1f1'
  }
});
