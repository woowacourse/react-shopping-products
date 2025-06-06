import { useState } from "react";

import ProductList from "../ProductList/ProductList";
import Filter from "../Filter/Filter";

import * as Styled from "./Main.styled";

import { ProductCategory } from "../../types/ProductCategory";
import { Sort } from "../../types/Sort";

const isProductCategory = (value: string): value is ProductCategory => {
  return ["전체", "식료품", "패션잡화"].includes(value);
};

const isProductSort = (value: string): value is Sort => {
  return ["price,desc", "price,asc", "id,desc", "id,asc"].includes(value);
};

function Main() {
  const [category, setCategory] = useState<ProductCategory>("전체");
  const [sort, setSort] = useState<Sort>("price,asc");

  const handleCategory = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (isProductCategory(value) === false) {
      return;
    }

    setCategory(value);
  };

  const handleSort = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (isProductSort(value) === false) {
      return;
    }

    setSort(value);
  };

  return (
    <Styled.Container>
      <Styled.ProductListTitle>bpple 상품 목록</Styled.ProductListTitle>
      <Filter handleCategory={handleCategory} handleSort={handleSort} />
      <ProductList category={category} sort={sort} />
    </Styled.Container>
  );
}

export default Main;
