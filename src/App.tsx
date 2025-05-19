import { useErrorMessageContext } from "./context/ErrorMessageContext";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import styled from "@emotion/styled";

import useCartItems from "./hooks/useCartItems";

function App() {
  const { errorMessage, handleErrorMessage } = useErrorMessageContext();
  const { state, cartItems, addCartItem, removeCartItem } = useCartItems({
    handleErrorMessage,
  });
  const selectedItemProductId = cartItems.map((items) => items.productId);

  const handleAddProduct = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const $product = event.currentTarget.closest("li");
    $product && addCartItem($product.id);
  };

  const handleRemoveProduct = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const $product = event.currentTarget.closest("li");
    $product && removeCartItem($product.id);
  };

  return (
    <Container>
      <Wrapper>
        <Header cartItems={selectedItemProductId}></Header>
        {errorMessage && <ErrorMessage />}
        {/* {state.isLoading && <Spinner />} */}
        {/* {state.isSuccess && ( */}
        <Main
          cartItems={selectedItemProductId}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
        />
        {/* )} */}
      </Wrapper>
    </Container>
  );
}

export default App;

const Container = styled.main`
  display: flex;
  max-width: 430px;
  min-height: 100vh;
  margin: auto;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
