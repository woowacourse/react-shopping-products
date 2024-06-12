import { useState } from "react";

import { useProducts, useIntersectionObserver, useErrorToast } from "../../hooks";
import {
  NavigationBar,
  SelectBox,
  ProductItemContainer,
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

  const { renderErrorToast } = useErrorToast();

  const {
    products,
    isLoading: isProductLoading,
    error: productError,
    fetchNextPage,
    handleChangeCategory,
    handleChangeSortOption,
  } = useProducts();

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

      {renderErrorToast()}

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

        {isProductLoading && products.length === 0 && (
          <Styled.EmptyProductsContainer>
            <Styled.LoadingSpinner />
          </Styled.EmptyProductsContainer>
        )}

        {!isProductLoading && products.length === 0 && (
          <Styled.EmptyProductsContainer>
            현재 조회 가능한 상품이 없습니다.
          </Styled.EmptyProductsContainer>
        )}

        {products.length > 0 && (
          <ProductItemContainer products={products}>
            <Styled.ObserverTarget
              ref={observerRef}
              $isEnabled={!isProductLoading && !productError}
            />
          </ProductItemContainer>
        )}
      </Styled.ShopContent>

      <CartModal
        isOpen={isCartModalOpened}
        onClose={handleCloseCartModal}
      />
    </>
  );
}
