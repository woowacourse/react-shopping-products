import styled from "styled-components";

export const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 0 0 10px;
`;

export const ItemInfoSection = styled.div`
  display: flex;
  gap: 16px;
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
`;

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ItemName = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

export const ItemPrice = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: rgba(10, 13, 19, 1);
`;

export const RemoveButton = styled.button`
  width: 40px;
  height: 24px;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  color: rgba(10, 13, 19, 1);
`;
