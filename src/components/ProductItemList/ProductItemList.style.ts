import styled from "styled-components";

export const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const ProductList = styled.div`
  display: grid;

  flex-direction: column;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 16px;
  column-gap: 20px;
  grid-template-rows: auto;
`;
