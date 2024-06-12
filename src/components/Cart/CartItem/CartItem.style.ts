import styled from "styled-components";

export const CartItemContainer = styled.div`
  border-top: 1px solid #e5e5e5;
  padding-top: 8px;
`;

export const CartItemContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const ProductImageBox = styled.img`
  width: 80px;
  height: 80px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
`;

export const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  max-width: 246px;

  margin-top: 9px;
  text-overflow: ellipsis;
`;

export const ProductName = styled.p`
  color: #000000;
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 4px 2px;
`;

export const ProductPrice = styled.p`
  color: #0a0d13;
  font-size: 12px;
  font-weight: 500;
  margin: 0 0 8px 2px;
`;

export const ProductDeleteButtonBox = styled.div`
  margin-top: 1.5px;
`;
