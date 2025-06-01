import styled from "@emotion/styled";

export const CartItem = styled.li`
  padding: 1rem 0;
  border-top: 1px solid #0000001a;
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  &:last-of-type {
    border-bottom: 1px solid #0000001a;
  }
`;

export const CartItemImage = styled.img`
  width: 5rem;
  height: 5rem;
  aspect-ratio: 1/1;
  border-radius: 8px;
`;

export const CartItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  position: relative;
`;

export const CartItemInfo = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const CartItemName = styled.p`
  color: #000;
  font-size: 1rem;
  font-weight: 700;
`;

export const CartItemPrice = styled.p`
  color: #0a0d13;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const RemoveCartItemButton = styled.button`
  position: absolute;
  padding: 0.25rem 0.75rem;
  color: #0a0d13;
  font-size: 0.875rem;
  font-weight: 500;
  top: 0;
  right: 0;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;

  &:hover {
    background: #f0f0f0;
    transition: 0.5s;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
    pointer-events: none;
  }
`;
