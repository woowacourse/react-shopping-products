import * as S from "./App.styled";
import Header from "./components/Header/Header";
import ProductControl from "./components/ProductControl/ProductControl";
import ProductList from "./components/ProductList/ProductList";
import ErrorBox from "./components/common/ErrorBox/ErrorBox";
import LoadingIcon from "./components/Icon/LoadingIcon";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./hooks/useCart";

function App() {
  const {
    productList,
    productListLoading,
    productListErrorMessage,
    setCategory,
    setSort,
    setErrorMessage: setProductErrorMessage,
  } = useProducts();

  const {
    cartItemList,
    cartItemListLoading,
    cartItemListErrorMessage,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleAddToCart,
    handleRemoveFromCart,
    getCartQuantityForProduct,
  } = useCart(productList);

  const isLoading = productListLoading || cartItemListLoading;

  return (
    <S.AppContainer>
      <S.Wrap>
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            <Header cartItemList={cartItemList} />
            <S.MiddleContainer>
              <ProductControl setCategory={setCategory} setSort={setSort} />
              <ProductList
                productList={productList}
                cartItemList={cartItemList}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
                getCartQuantityForProduct={getCartQuantityForProduct}
                setErrorMessage={setProductErrorMessage}
              />
            </S.MiddleContainer>
          </>
        )}
        <ErrorBox text={productListErrorMessage} backgroundColor="#FFC9C9" />
        <ErrorBox text={cartItemListErrorMessage} backgroundColor="#FFC9C9" />
      </S.Wrap>
    </S.AppContainer>
  );
}

export default App;
