import { useState } from "react";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import ErrorToast from "./components/ErrorToast/ErrorToast";
import ProductItem from "./components/ProductItem/ProductItem";
import ProductsListTitle from "./components/ProductsListTitle/ProductsListTitle";
import ProductSorter from "./components/ProductSorter/ProductSorter";
import ShopHeader from "./components/ShopHeader/ShopHeader";
import * as S from "./styles/Layout.styles";
import ProductItemSkeleton from "./components/ProductItem/components/ProductItemSkeleton/ProductItemSkeleton";
import useProducts from "./hooks/useProducts";
import useCartItems from "./hooks/useCartItems";

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

  const { cartItemsCount, isProductInCart, handleCartItemToggle } =
    useCartItems(setErrorMessage);

  return (
    <S.LayoutContainer>
      <S.LayoutWrapper>
        <ShopHeader cartItemCount={cartItemsCount} />
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
            {!isLoading ? (
              products?.content.map(({ id, imageUrl, name, price }) => (
                <ProductItem
                  key={id}
                  imageUrl={imageUrl}
                  name={name}
                  price={price}
                  isAdded={isProductInCart(id)}
                  handleCartItemToggle={() => handleCartItemToggle(id)}
                />
              ))
            ) : (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProductItemSkeleton key={index} />
                ))}
              </>
            )}
          </S.ProductGrid>
          {!!errorMessage && (
            <ErrorToast
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
        </S.Wrapper>
      </S.LayoutWrapper>
    </S.LayoutContainer>
  );
}

export default App;
