import useProducts from "../hooks/useProducts";
import useCartItem from "../hooks/useCartItem";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

import NavigationBar from "../components/NavigationBar/NavigationBar";
import SelectBox from "../components/SelectBox/SelectBox";
import ProductItemContainer from "../components/ProductItemContainer/ProductItemContainer";
import APIErrorToast from "../components/APIErrorToast/APIErrorToast";

import * as Styled from "./ProductPage.style";

import {
  CategoryKeys,
  SortOptionsKeys,
  PRODUCT_CATEGORIES,
  PRODUCT_SORT_OPTIONS,
} from "../constants/products";

export default function ProductPage() {
  const {
    products,
    error: productError,
    isLoading: isProductLoading,
    fetchNextPage,
    handleChangeCategory,
    handleChangeSortOption,
  } = useProducts();

  const {
    error: cartItemError,
    handleAddCartItem,
    handleRemoveCartItem,
    selectedCartItemsLength,
    checkIsInCart,
  } = useCartItem();

  const observerRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: fetchNextPage,
    options: { threshold: 0.7 },
  });

  const handleSelectCategory = (value: CategoryKeys) => {
    handleChangeCategory(PRODUCT_CATEGORIES[value]);
  };

  const handleSelectSortOption = (value: SortOptionsKeys) => {
    handleChangeSortOption(PRODUCT_SORT_OPTIONS[value]);
  };

  return (
    <>
      <NavigationBar>
        <Styled.ShopHeader>
          SHOP
          <Styled.CartButton />
          {selectedCartItemsLength !== 0 && (
            <Styled.CartItemsNumber>{selectedCartItemsLength}</Styled.CartItemsNumber>
          )}
        </Styled.ShopHeader>
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
        <ProductItemContainer
          products={products}
          onAddCartItem={handleAddCartItem}
          onRemoveCartItem={handleRemoveCartItem}
          checkIsInCart={checkIsInCart}
        />
      </Styled.ShopContent>

      <Styled.ObserverTarget
        ref={observerRef}
        $isEnabled={!isProductLoading && !productError}
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
