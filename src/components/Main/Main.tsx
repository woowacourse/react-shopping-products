import { useEffect, useState } from "react";
import ProductList from "../ProductList/ProductList";
import Filter from "../Filter/Filter";
import Spinner from "../common/Spinner/Spinner";

import * as Styled from "./Main.styled";

import { ProductCategory } from "../../types/ProductCategory";
import { Sort } from "../../types/Sort";

import fetchProductList from "../../apis/product/fetchProductList";

interface MainProps {
  selectedProductIdList: string[];
  handleAddProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemoveProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const isProductCategory = (value: string): value is ProductCategory => {
  return ["전체", "식료품", "패션잡화"].includes(value);
};

const isProductSort = (value: string): value is Sort => {
  return ["price,desc", "price,asc", "id,desc", "id,asc"].includes(value);
};

function Main({
  selectedProductIdList,
  handleAddProduct,
  handleRemoveProduct,
}: MainProps) {
  const [productList, setProductList] = useState(null);
  const [category, setCategory] = useState<ProductCategory>("전체");
  const [sort, setSort] = useState<Sort>("price,asc");

  //TODO: 상품 목록 가져올 때 로딩중
  useEffect(() => {
    (async () => {
      try {
        const { content } = await fetchProductList({
          params: {
            category,
            sort,
            page: "0",
            size: "20",
          },
        });
        setProductList(content);
      } catch (error) {
        // error 상태
        console.log(error);
      }
    })();
  }, [category, sort]);

  const handleCategory = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isProductCategory(value)) {
      return;
    }

    setCategory(value);
  };

  const handleSort = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isProductSort(value)) {
      return;
    }

    setSort(value);
  };

  return (
    <Styled.Container>
      <Styled.ProductListTitle>bpple 상품 목록</Styled.ProductListTitle>
      <Filter handleCategory={handleCategory} handleSort={handleSort} />
      {productList === null ? (
        <Spinner />
      ) : (
        <ProductList
          selectedProductIdList={selectedProductIdList}
          productList={productList}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
        />
      )}
    </Styled.Container>
  );
}

export default Main;
