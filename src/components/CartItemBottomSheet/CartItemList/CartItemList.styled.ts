import styled from "@emotion/styled";

export const CartItemList = styled.ul`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  max-height: 35.625rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const EmptyCartItemList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: rgb(80, 80, 80);
  font-weight: 600;
  font-size: 1.25rem;
`;

export const EmptyCartItemImage = styled.img`
  width: 10rem;
  height: 10rem;
`;
