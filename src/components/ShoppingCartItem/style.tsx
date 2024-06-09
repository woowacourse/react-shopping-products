import styled from '@emotion/styled';

export const ShoppingCartItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ItemInfoContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ItemImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 8px;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  width: 100%;
`;

export const ItemDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ItemName = styled.span`
  ${(props) => props.theme.typography.cartItem.name};
  color: ${(props) => props.theme.color.black};
`;

export const ItemPrice = styled.span`
  ${(props) => props.theme.typography.cartItem.price};
  color: ${(props) => props.theme.color.darkBlack};
`;
