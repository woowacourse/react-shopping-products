import * as S from "./App.styled";
import Header from "./components/Header/Header";
import ProductControl from "./components/ProductControl/ProductControl";
import ProductList from "./components/ProductList/ProductList";
import ErrorBox from "./components/common/ErrorBox/ErrorBox";
import LoadingIcon from "./components/Icon/LoadingIcon";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./context/CartContext";
import { DataProvider } from "./context/DataContext";
import { CartProvider } from "./context/CartContext";

function AppContent() {
  const {
    productList,
    productListLoading,
    productListErrorMessage,
    setCategory,
    setSort,
  } = useProducts();

  const {
    cartItemListLoading,
    cartItemListErrorMessage,
    cartActionErrorMessage,
  } = useCart();

  const isLoading = productListLoading || cartItemListLoading;

  return (
    <S.AppContainer>
      <S.Wrap>
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            <Header />
            <S.MiddleContainer>
              <ProductControl setCategory={setCategory} setSort={setSort} />
              <ProductList productList={productList} />
            </S.MiddleContainer>
          </>
        )}
        <ErrorBox text={productListErrorMessage} backgroundColor="#FFC9C9" />
        <ErrorBox text={cartItemListErrorMessage} backgroundColor="#FFC9C9" />
        <ErrorBox text={cartActionErrorMessage} backgroundColor="#FFC9C9" />
      </S.Wrap>
    </S.AppContainer>
  );
}

function App() {
  return (
    <DataProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </DataProvider>
  );
}

export default App;
