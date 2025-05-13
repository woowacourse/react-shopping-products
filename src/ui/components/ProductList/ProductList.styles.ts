import styled from '@emotion/styled';

export const List = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  padding: 0;
  margin: 0;
  justify-items: center;
  list-style: none;
`;
