import ProductList from "../ProductList/ProductList";
import Filter from "../Filter/Filter";

import { Product as ProductType } from "../../types/Product";

import * as Styled from "./Main.styled";

interface MainProps {
  productList: readonly ProductType[];
  handleCategory: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Main({ productList, handleCategory }: MainProps) {
  return (
    <Styled.Container>
      <Styled.ProductListTitle>bpple 상품 목록</Styled.ProductListTitle>
      <Filter handleCategory={handleCategory} />
      <ProductList productList={productList} />
    </Styled.Container>
  );
}

export default Main;
