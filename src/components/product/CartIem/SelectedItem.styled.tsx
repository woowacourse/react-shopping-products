import styled from '@emotion/styled';

export const SelectedItemContainer = styled.li({
  position: 'relative',
  width: '397px',
  height: '88px',

  borderTop: '1px solid #E5E5E5',
  padding: '12px 0 0 0',
  display: 'flex',
  flexDirection: 'column',
});

export const SelectedItemContent = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '24px',
});

export const ProductImageBox = styled.img({
  width: '80px',
  height: '80px',
  border: '1px solid #E5E5E5',
  borderRadius: '8px',
});

export const ProductInfoBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'space-between',
  maxWidth: '246px',

  fontSize: '12px',
  fontWeight: 500,

  margin: 0,
  textOverflow: 'ellipsis',
});

export const ProductName = styled.p({
  display: 'inline-block',
  width: '100%',
  height: '26px',

  color: '#0A0D13',
  fontSize: '16px',
  fontWeight: '700',
  marginBottom: '4px',
});

export const ProductPrice = styled.p({
  display: 'inline-block',
  width: '100%',
  height: '15px',

  color: '#000000',
  fontSize: '12px',
  fontWeight: '500',
  marginBottom: '8px',
});

export const DeleteButton = styled.button({
  position: 'absolute',
  right: 0,
  height: '24px',
  border: '1px solid #E5E5E5',
  borderRadius: '4px',
  color: '#0A0D13',
  fontSize: '12px',
  fontWeight: '500',
  padding: '0 8px',

  '&:hover': {
    cursor: 'pointer',
  },
});
