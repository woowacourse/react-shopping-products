import styled from 'styled-components';

export const ProductCardContainer = styled.div`
  border-radius: 0.8rem;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const ProductName = styled.p`
  font-family: Inter;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 2rem;
  color: var(--black-color-2);
`;

export const ProductPrice = styled.p`
  color: var(--black-color-2);
`;
