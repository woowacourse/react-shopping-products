import styled from "@emotion/styled";

export const ProductList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 16px;
  margin-bottom: 20px;
`;

export const EmptyProductList = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  height: 200px;
`;
