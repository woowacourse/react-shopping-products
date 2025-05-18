import { css } from "@emotion/react";
import Header from "./components/Header";
import Select from "./components/common/Select";
import Text from "./components/common/Text";
import Spinner from "./components/common/Spinner";
import ErrorPopup from "./components/ErrorPopup";
import useProducts from "./hooks/useProducts";
import useCartItems from "./hooks/useCartItems";
import ProductList from "./components/Product/ProductList";

function App() {
  const {
    products,
    filter,
    setFilter,
    sort,
    setSort,
    isProductsLoading,
    productsErrorMessage,
    setProductsErrorMessage,
  } = useProducts();

  const {
    cartItems,
    isCartItemsLoading,
    cartItemsErrorMessage,
    setCartItemsErrorMessage,
    handleCartItem,
    cartItemIds,
  } = useCartItems();

  if (isProductsLoading || isCartItemsLoading) return <Spinner />;
  return (
    <div css={appStyle}>
      {productsErrorMessage && (
        <ErrorPopup errorMessage={productsErrorMessage} setErrorMessage={setProductsErrorMessage} />
      )}
      {cartItemsErrorMessage && (
        <ErrorPopup errorMessage={cartItemsErrorMessage} setErrorMessage={setCartItemsErrorMessage} />
      )}

      <Header shoppingCount={cartItems?.content?.length} />
      <div css={containerStyle}>
        <Text variant="title-1">bpple 상품 목록</Text>

        <div css={selectBoxStyle}>
          <Select options={["전체", "식료품", "패션잡화"]} selectedItem={filter} setSelectedItem={setFilter} />
          <Select options={["높은 가격순", "낮은 가격순"]} selectedItem={sort} setSelectedItem={setSort} />
        </div>
        <ProductList productsData={products} cartItemIds={cartItemIds} handleCartItem={handleCartItem} />
      </div>
    </div>
  );
}

export default App;

const appStyle = css`
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  background-color: #fff;
`;

const containerStyle = css`
  padding: 36px 24px;
  display: flex;
  height: calc(100% - 64px);
  flex-direction: column;
  gap: 28px;
`;

const selectBoxStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 132px;
`;
