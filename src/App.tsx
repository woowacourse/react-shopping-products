import Header from "./components/product/Header/Header";
import ProductListContainer from "./components/product/ProductListContainer/ProductListContainer";
import Spinner from "./components/common/Spinner/Spinner";
import ErrorMessage from "./components/product/ErrorMessage/ErrorMessage";

import styled from "@emotion/styled";

import useShoppingCart from "./hooks/useShoppingCart";

function App() {
  const {
    selectedProductIdList,
    loading,
    errorMessage,
    handleAddProduct,
    handleRemoveProduct,
    handleIncreaseCartItemQuantity,
  } = useShoppingCart();

  if (loading) {
    return (
      <Container>
        <Wrapper>
          <Spinner />
        </Wrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Wrapper>
        <Header selectedProductIdList={selectedProductIdList}></Header>
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        <ProductListContainer
          selectedProductIdList={selectedProductIdList}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
          handleIncreaseCartItemQuantity={handleIncreaseCartItemQuantity}
        />
      </Wrapper>
    </Container>
  );
}

export default App;

const Container = styled.main`
  display: flex;
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
