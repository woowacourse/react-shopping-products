import styled from '@emotion/styled';

export const ItemImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 8px;
`;

export const Divider = styled.div`
  border: 0.5px solid ${(props) => props.theme.color.borderGray};
`;

export const DeleteButton = styled.button`
  width: 2.5rem;
  height: 1.5rem;
  border: 1px solid ${(props) => props.theme.color.borderGray};
  border-radius: 0.25rem;

  cursor: pointer;
  background-color: white;
`;

export const ProductName = styled.p`
  font-size: 1rem;
  font-weight: 700;
`;

export const ProductPrice = styled.p`
  font-size: 0.75rem;
`;

export const ProductItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const CartItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const ProductItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

export const CartItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CartButtonBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
