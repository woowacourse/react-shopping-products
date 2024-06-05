import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 182px;
  border-radius: 8px;
`;

export const ImageWrapper = styled.img`
  width: 182px;
  height: 112px;
  border-radius: 8px 8px 0px 0px;
  object-fit: cover;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: 100%;
  padding: 15px 8px 8px 8px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  strong {
    font-size: 14px;
    font-weight: 700;
  }

  p {
    font-size: 12px;
    font-weight: 500;
  }
`;

export const CartButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const AddCartIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const CartItemQuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  // font: var(--cart-label);
  // color: var(--grey-400);
`;
