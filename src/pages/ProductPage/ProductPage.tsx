import { useState } from "react";

import { useCartItems, useProducts, useIntersectionObserver } from "../../hooks";
import {
  NavigationBar,
  SelectBox,
  ProductItemContainer,
  APIErrorToast,
  ProductPageHeader,
  CartModal,
} from "../../components";

import {
  CategoryKeys,
  SortOptionsKeys,
  PRODUCT_CATEGORIES,
  PRODUCT_SORT_OPTIONS,
} from "../../constants";

import * as Styled from "./ProductPage.style";

export default function ProductPage() {
  const [isCartModalOpened, setIsCartModalOpened] = useState(false);

  const {
    products,
    error: productError,
    isLoading: isProductLoading,
    fetchNextPage,
    handleChangeCategory,
    handleChangeSortOption,
  } = useProducts();

  const { error: cartItemError } = useCartItems();

  const observerRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: fetchNextPage,
    options: { threshold: 0.7 },
  });

  const handleOpenCartModal = () => {
    setIsCartModalOpened(true);
  };

  const handleCloseCartModal = () => {
    setIsCartModalOpened(false);
  };

  const handleSelectCategory = (value: CategoryKeys) => {
    handleChangeCategory(PRODUCT_CATEGORIES[value]);
  };

  const handleSelectSortOption = (value: SortOptionsKeys) => {
    handleChangeSortOption(PRODUCT_SORT_OPTIONS[value]);
  };

  return (
    <>
      <NavigationBar>
        <ProductPageHeader onClickCartButton={handleOpenCartModal} />
      </NavigationBar>

      <Styled.ShopContent>
        <Styled.ShopTitle>bpple 상품 목록</Styled.ShopTitle>

        <Styled.SelectBoxContainer>
          <SelectBox<CategoryKeys>
            optionValues={Object.keys(PRODUCT_CATEGORIES)}
            onChange={handleSelectCategory}
            placeholder="전체"
          />
          <SelectBox<SortOptionsKeys>
            optionValues={Object.keys(PRODUCT_SORT_OPTIONS)}
            onChange={handleSelectSortOption}
            placeholder="낮은 가격순"
          />
        </Styled.SelectBoxContainer>

        <ProductItemContainer products={products} />

        <Styled.ObserverTarget
          ref={observerRef}
          $isEnabled={!isProductLoading && !productError}
        />
      </Styled.ShopContent>

      <CartModal
        isOpen={isCartModalOpened}
        onClose={handleCloseCartModal}
      />

      {productError && productError instanceof Error && (
        <APIErrorToast message={productError.message} />
      )}
      {cartItemError && cartItemError instanceof Error && (
        <APIErrorToast message={cartItemError.message} />
      )}
    </>
  );
}
