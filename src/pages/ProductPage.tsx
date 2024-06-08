import { Suspense } from "react";

import useProductsOption from "../hooks/products/useProductsOption";
import useModal from "../hooks/useModal";

import ProductOptionSelector from "../components/ProductOptionSelector/ProductOptionSelector";
import ProductItemSkeletonList from "../components/ProductItem/skeleton/ProductItemSkeletonList";
import ProductItemContainer from "../components/ProductItemContainer/ProductItemContainer";
import CartItemModal from "../components/CartItemModal/CartItemModal";
import ShopHeader from "./components/ShopHeader";

import {
  CategoryKeys,
  SortOptionsKeys,
  PRODUCT_CATEGORIES,
  PRODUCT_SORT_OPTIONS,
  PRODUCTS_SIZE,
} from "../constants/products";

import * as Styled from "./ProductPage.style";

export default function ProductPage() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { options, handleChangeProductsOption } = useProductsOption();

  return (
    <>
      <CartItemModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
      <ShopHeader openModal={openModal} />

      <Styled.ShopContent>
        <Styled.ShopTitle>해르 상품 목록</Styled.ShopTitle>
        <Styled.SelectBoxContainer>
          <ProductOptionSelector<CategoryKeys>
            type="category"
            options={PRODUCT_CATEGORIES}
            currentOption={options["category"]}
            onChange={handleChangeProductsOption}
          />
          <ProductOptionSelector<SortOptionsKeys>
            type="sort"
            options={PRODUCT_SORT_OPTIONS}
            currentOption={options["sort"]}
            onChange={handleChangeProductsOption}
          />
        </Styled.SelectBoxContainer>
        <Suspense fallback={<ProductItemSkeletonList length={PRODUCTS_SIZE.initial} />}>
          <ProductItemContainer options={options} />
        </Suspense>
      </Styled.ShopContent>
    </>
  );
}
