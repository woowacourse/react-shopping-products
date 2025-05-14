import ProductList from "../ProductList/ProductList";
import Filter from "../Filter/Filter";

import { Product as ProductType } from "../../types/Product";

import styled from "@emotion/styled";

interface MainProps {
  productList: readonly ProductType[];
}

function Main({ productList }: MainProps) {
  return (
    <Container>
      <ProductListTitle>bpple 상품 목록</ProductListTitle>
      <Filter />
      <ProductList productList={productList} />
    </Container>
  );
}

export default Main;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
`;

const ProductListTitle = styled.h1`
  font-weight: 700;
  font-size: 24px;
`;
