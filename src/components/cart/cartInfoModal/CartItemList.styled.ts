import styled from '@emotion/styled';

export const CartItemListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Divider = styled.div`
  border: 0.5px solid ${(props) => props.theme.color.borderGray};
`;

export const TotalPriceBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TotalPriceLabel = styled.p`
  font-size: 1rem;
  font-weight: 700;
`;

export const TotalPrice = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`;
