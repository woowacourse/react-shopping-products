import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import ErrorToast from "./components/ErrorToast/ErrorToast";
import ProductsListTitle from "./components/ProductsListTitle/ProductsListTitle";
import ProductSorter from "./components/ProductSorter/ProductSorter";
import ShopHeader from "./components/ShopHeader/ShopHeader";
import * as S from "./styles/Layout.styles";
import useProducts from "./hooks/useProducts";
import useCartItems from "./hooks/useCartItems";
import useErrorManager from "./hooks/useErrorManager";
import ProductList from "./components/ProductList/ProductList";
import { ProductFilterProvider } from "./contexts/ProductFilterContext";
import { DataProvider } from "./contexts/DataContext";
import { useState } from "react";
import CartModal from "./components/CartModal/CartModal";
import useCartHandlers from "./hooks/useCartHandlers";

const AppContent = () => {
  const {
    products,
    isLoading,
    errorMessage: productError,
    setErrorMessage: setProductError,
  } = useProducts();

  const {
    cartItemInfo,
    fetchError: cartFetchError,
    refreshCartItems,
  } = useCartItems();

  const { cartHandlerError, displayError } = useErrorManager({
    productError,
    setProductError,
    cartFetchError,
    refreshCartItems,
  });

  const {
    handleAddToCart,
    handleQuantityIncrease,
    handleQuantityDecrease,
    handleRemoveFromCart,
  } = useCartHandlers({
    products,
    cartItemInfo,
    onError: cartHandlerError,
    onRefresh: refreshCartItems,
  });

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const openCartModal = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);

  return (
    <S.LayoutContainer>
      <S.LayoutWrapper>
        <ShopHeader
          cartItemCount={cartItemInfo.length ?? 0}
          onCartClick={openCartModal}
        />
        <S.Wrapper>
          <ProductsListTitle />
          <S.ProductControlPanel>
            <CategoryFilter />
            <ProductSorter />
          </S.ProductControlPanel>
          <ProductList
            products={products}
            isLoading={isLoading}
            cartItemInfo={cartItemInfo}
            onAddToCart={handleAddToCart}
            onQuantityIncrease={handleQuantityIncrease}
            onQuantityDecrease={handleQuantityDecrease}
          />
          {displayError && (
            <ErrorToast
              errorMessage={displayError.message}
              setErrorMessage={displayError.clear}
            />
          )}
        </S.Wrapper>
        {isCartModalOpen && (
          <CartModal
            cartItemInfo={cartItemInfo}
            products={products}
            onClose={closeCartModal}
            onQuantityIncrease={handleQuantityIncrease}
            onQuantityDecrease={handleQuantityDecrease}
            onRemove={handleRemoveFromCart}
          />
        )}
      </S.LayoutWrapper>
    </S.LayoutContainer>
  );
};

function App() {
  return (
    <DataProvider>
      <ProductFilterProvider>
        <AppContent />
      </ProductFilterProvider>
    </DataProvider>
  );
}

export default App;
