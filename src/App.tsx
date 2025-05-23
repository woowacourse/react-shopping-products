import { useState } from "react";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import ErrorToast from "./components/ErrorToast/ErrorToast";
import ProductItemSkeleton from "./components/ProductItem/components/ProductItemSkeleton/ProductItemSkeleton";
import ProductItem from "./components/ProductItem/ProductItem";
import ProductsListTitle from "./components/ProductsListTitle/ProductsListTitle";
import ProductSorter from "./components/ProductSorter/ProductSorter";
import ShopHeader from "./components/ShopHeader/ShopHeader";
import useCartItems from "./hooks/useCartItems";
import useProducts from "./hooks/useProducts";
import * as S from "./styles/Layout.styles";

const ProductsSkeleton = Array.from({ length: 6 }).map((_, index) => (
  <ProductItemSkeleton key={index} />
));

function App() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    products,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    selectedSortOption,
    setSelectedSortOption,
  } = useProducts(setErrorMessage);

  const {
    cartItemsCount,
    quantityByProductId,
    decreaseItemQuantity,
    increaseItemQuantity,
    addProductInCart,
    deleteProductInCart,
    totalPriceInCart,
    productIdsInCart,
  } = useCartItems(setErrorMessage);

  return (
    <S.LayoutContainer>
      <S.LayoutWrapper id="custom-root">
        <ShopHeader
          cartItemCount={cartItemsCount}
          products={products}
          quantityByProductId={quantityByProductId}
          increaseItemQuantity={increaseItemQuantity}
          decreaseItemQuantity={decreaseItemQuantity}
          deleteProductInCart={deleteProductInCart}
          totalPriceInCart={totalPriceInCart}
          productIdsInCart={productIdsInCart}
        />
        <S.Wrapper>
          <ProductsListTitle />
          <S.ProductControlPanel>
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <ProductSorter
              selectedSortOption={selectedSortOption}
              setSelectedSortOption={setSelectedSortOption}
            />
          </S.ProductControlPanel>
          <S.ProductGrid>
            {!isLoading
              ? products?.content.map(({ id, imageUrl, name, price }) => (
                  <ProductItem
                    key={id}
                    imageUrl={imageUrl}
                    name={name}
                    price={price}
                    quantity={quantityByProductId(id)}
                    increaseItemQuantity={() => increaseItemQuantity(id)}
                    decreaseItemQuantity={() => decreaseItemQuantity(id)}
                    addProductInCart={() => addProductInCart(id)}
                  />
                ))
              : ProductsSkeleton}
          </S.ProductGrid>
          {!!errorMessage && (
            <ErrorToast
              message={errorMessage}
              onClose={() => setErrorMessage("")}
            />
          )}
        </S.Wrapper>
      </S.LayoutWrapper>
    </S.LayoutContainer>
  );
}

export default App;
