import { useEffect, useState } from "react";
import ProductList from "../ProductList/ProductList";
import Filter from "../Filter/Filter";
import Spinner from "../../common/Spinner/Spinner";

import * as Styled from "./ProductListContainer.styled";

import { ProductCategory } from "../../../types/ProductCategory";
import { PriceSort } from "../../../types/Sort";
import { Product } from "../../../types/Product";

import fetchProductList from "../../../apis/product/fetchProductList";
import {
  ALL_CATEGORY,
  CATEGORIES,
  LOW_PRICE_SORT_KEY,
  PRICE_SORTS_KEYS,
} from "../../../constants/filterOptions";

interface ProductListContainerProps {
  selectedProductIdList: string[];
  handleAddProduct: (productId: string) => void;
  handleRemoveProduct: (productId: string) => void;
}

const contains = <T extends string>(
  value: string,
  list: ReadonlyArray<T>
): value is T => {
  return list.some((item) => item === value);
};

const isProductCategory = (value: string) => {
  return contains<ProductCategory>(value, CATEGORIES);
};

const isProductPriceSort = (value: string): value is PriceSort => {
  return contains<PriceSort>(value, PRICE_SORTS_KEYS);
};

function ProductListContainer({
  selectedProductIdList,
  handleAddProduct,
  handleRemoveProduct,
}: ProductListContainerProps) {
  const [productList, setProductList] = useState<Product[] | null>(null);
  const [category, setCategory] = useState<ProductCategory>(ALL_CATEGORY);
  const [sort, setSort] = useState<PriceSort>(LOW_PRICE_SORT_KEY);

  //TODO: 상품 목록 가져올 때 로딩중
  useEffect(() => {
    const loadProductList = async () => {
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
    };

    loadProductList();
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
    if (!isProductPriceSort(value)) {
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

export default ProductListContainer;
