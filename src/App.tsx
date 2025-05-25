import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import ErrorToast from "./components/ErrorToast/ErrorToast";
import ProductsListTitle from "./components/ProductsListTitle/ProductsListTitle";
import ProductSorter from "./components/ProductSorter/ProductSorter";
import ShopHeader from "./components/ShopHeader/ShopHeader";
import * as S from "./styles/Layout.styles";
import useProducts from "./hooks/useProducts";
import useCartItems from "./hooks/useCartItems";
import ProductList from "./components/ProductList/ProductList";
import { ProductFilterProvider } from "./contexts/ProductFilterContext";
import { useState } from "react";
import CartModal from "./components/CartModal/CartModal";

const AppContent = () => {
  const {
    products,
    isLoading,
    errorMessage: productError,
    setErrorMessage: setProductError,
  } = useProducts();

  const {
    cartItemInfo,
    errorMessage: cartError,
    setErrorMessage: setCartError,
    handleAddToCart,
    handleQuantityIncrease,
    handleQuantityDecrease,
    handleRemoveFromCart,
  } = useCartItems({ products });

  const errorMessage = productError || cartError;
  const setErrorMessage = productError ? setProductError : setCartError;
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
          {!!errorMessage && (
            <ErrorToast
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
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
    <ProductFilterProvider>
      <AppContent />
    </ProductFilterProvider>
  );
}

export default App;
