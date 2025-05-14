import ProductList from "../ProductList/ProductList";
import Filter from "../Filter/Filter";

import { Product as ProductType } from "../../types/Product";

import * as Styled from "./Main.styled";

interface MainProps {
  productList: readonly ProductType[];
}

function Main({ productList }: MainProps) {
  return (
    <Styled.Container>
      <Styled.ProductListTitle>bpple 상품 목록</Styled.ProductListTitle>
      <Filter />
      <ProductList productList={productList} />
    </Styled.Container>
  );
}

export default Main;
