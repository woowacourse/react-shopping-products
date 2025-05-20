import { useState } from "react";
import ProductList from "../ProductList/ProductList";
import Filter from "../Filter/Filter";
import Spinner from "../common/Spinner/Spinner";

import * as Styled from "./Main.styled";

import { ProductCategory } from "../../types/ProductCategory";
import { Sort } from "../../types/Sort";

import useProductList from "../../hooks/useProductList";

interface MainProps {
  cartItems: string[];
  handleAddProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemoveProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const isProductCategory = (value: string): value is ProductCategory => {
  return ["전체", "식료품", "패션잡화"].includes(value);
};

const isProductSort = (value: string): value is Sort => {
  return ["price,desc", "price,asc", "id,desc", "id,asc"].includes(value);
};

function Main({ cartItems, handleAddProduct, handleRemoveProduct }: MainProps) {
  const [category, setCategory] = useState<ProductCategory>("전체");
  const [sort, setSort] = useState<Sort>("price,asc");
  const { state, productList } = useProductList({
    category,
    sort,
  });

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
      {state.isLoading && <Spinner />}
      {state.isSuccess && (
        <ProductList
          cartItems={cartItems}
          productList={productList}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
        />
      )}
    </Styled.Container>
  );
}

export default Main;
