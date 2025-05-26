import styled from "@emotion/styled";

export const ProductCatalog = styled.div`
  height: 100%;
  background-color: #fff;
  padding: 36px 25px 25px;
  overflow-y: scroll;
  position: relative;
`;

export const ProductCatalogTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

export const ProductControlPanel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;
