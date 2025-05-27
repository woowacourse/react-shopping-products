import styled from '@emotion/styled';

export const CartQuantityContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  color: #000;
  gap: 12px;
`;

export const CartQuantitySelectorButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.2s;
  :hover {
    background-color: #f0f0f0;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const CartQuantityNumber = styled.div`
  font-size: 12px;
  font-weight: 500;
`;
