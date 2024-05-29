import {  useState } from "react";
import useProductList from "../../hooks/useProductList";
import DropdownContainer from "../DropdownContainer/DropdownContainer";
import ProductItem from "../ProductItem/ProductItem";
import * as S from "./ProductItemList.style";
import { Category, Product } from "../../interfaces/Product";
import { Sorting } from "../../interfaces/Sorting";
import { SortOption, SortProperty } from "../../apis/products";

interface ProductItemListProp {
  category: Category;
  sortingOption: Sorting;
}

function ProductItemList({category, sortingOption}:ProductItemListProp) {
  console.log('rendered')
  const { productList } = useProductList(category, [[sortingOption.split(",")[0], sortingOption.split(",")[1] as SortProperty] as SortOption]);
  // prodoct fetch 확인용

  return (
    <S.ProductList>
      {productList.map((product, idx) => {
        return <ProductItem key={idx} product={product} />;
      })}
      {/* <>여기는 그냥 warning때문에 key를 product.id에서 idx로 바꿔줬어</> */}
    </S.ProductList>
  );
}

export default ProductItemList;
