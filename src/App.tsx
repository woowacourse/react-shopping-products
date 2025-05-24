import * as S from "./app/styles/Layout.styles";
import useCartItems from "./entities/cartItem/model/useCartItems";
import useProducts from "./entities/product/model/useProducts";
import ProductCatalog from "./widgets/ProductCatalog/ProductCatalog";
import ShopHeader from "./widgets/ShopHeader/ShopHeader";

function App() {
  const {
    products,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    selectedSortOption,
    setSelectedSortOption,
  } = useProducts();

  const {
    cartItems,
    cartItemsCount,
    quantityByProductId,
    decreaseItemQuantity,
    increaseItemQuantity,
    addProductInCart,
    deleteProductInCart,
    totalPriceInCart,
  } = useCartItems();

  return (
    <S.LayoutContainer>
      <S.LayoutWrapper id="custom-root">
        <ShopHeader
          cartItems={cartItems}
          cartItemsCount={cartItemsCount}
          quantityByProductId={quantityByProductId}
          increaseItemQuantity={increaseItemQuantity}
          decreaseItemQuantity={decreaseItemQuantity}
          deleteProductInCart={deleteProductInCart}
          totalPriceInCart={totalPriceInCart}
        />
        <ProductCatalog
          products={products}
          isLoading={isLoading}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSortOption={selectedSortOption}
          setSelectedSortOption={setSelectedSortOption}
          quantityByProductId={quantityByProductId}
          increaseItemQuantity={increaseItemQuantity}
          decreaseItemQuantity={decreaseItemQuantity}
          addProductInCart={addProductInCart}
        />
      </S.LayoutWrapper>
    </S.LayoutContainer>
  );
}

export default App;
