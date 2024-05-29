import styled from '@emotion/styled';
import { COLOR } from '@styles/style.constant';

export const ProductPageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${COLOR.black};
`;

export const ProductDropdownWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 24px 0px;
`;

export const ProductPageListWrapper = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  min-height: 100vh;
`;
