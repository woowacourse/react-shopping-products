import styled from '@emotion/styled';

export const CartItemCardContainer = styled.section`
  display: flex;
  gap: 10px;
  box-sizing: border-box;
  width: 100%;
  border-top: 1px solid #0000001a;
  padding: 10px;
`;

export const CartItemCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-grow: 1;
  h3 {
    font-size: 16px;
    font-weight: 700;
  }

  p {
    font-size: 12px;
    font-weight: 500;
  }
`;

export const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

export const CartItemCardHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
