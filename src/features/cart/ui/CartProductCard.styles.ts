import styled from '@emotion/styled';

export const CartProductCardContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const CartProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

export const CartProductDetails = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

export const CartProductName = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #000000;
`;

export const CartProductPrice = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #000000;
`;

export const CartQuantitySelectorContainer = styled.div`
  display: flex;
  margin-right: auto;
  justify-content: start;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
`;

export const DeleteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DeleteButton = styled.button`
  width: 40px;
  height: 24px;
  border: 1px solid #333333;
  font-size: 14px;
  border-radius: 4px;
  color: #000000;
  cursor: pointer;
`;
