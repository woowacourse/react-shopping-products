import styled from '@emotion/styled';

export const ItemListContainer = styled.ul`
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;
