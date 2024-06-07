import styled from '@emotion/styled';

export const CartItemsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  max-height: 25rem;
`;

export const CartItemContainer = styled.li`
  display: flex;
  gap: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid ${(props) => props.theme.color.borderGray};
`;

export const CartItemInfoContainer = styled.div`
  flex: 1;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;

export const CartItemInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CartItemTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ProductName = styled.span`
  ${(props) => props.theme.typography.cartItem.name}
`;

export const Price = styled.span`
  ${(props) => props.theme.typography.cartItem.price}
`;

export const CartItemImage = styled.img`
  width: 5rem;
  height: 5rem;

  border-radius: 8px;
`;

export const DeleteButton = styled.button`
  ${(props) => props.theme.typography.cartItem.deleteButton}
  display: flex;
  padding: 0.25rem 0.5rem;

  width: 40px;
  height: 24px;

  background-color: ${(props) => props.theme.color.white};

  border-radius: 0.25rem;
  border: 1px solid ${(props) => props.theme.color.borderGray};

  &:hover {
    opacity: 0.7;
  }
`;
