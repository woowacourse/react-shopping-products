import Header from "./Component/Layout/Header";
import ProductListContainer from "./Component/Product/ProductListContainer";
import Body from "./Component/Layout/Body";
import ErrorBox from "./Component/Common/ErrorBox";
import styled from "@emotion/styled";
import useShoppingCart from "./hooks/useShoppingCart";

function App() {
  const {
    cartItems,
    status,
    errorMessage,
    updateErrorMessage,
    updateCartItems,
    getMatchCartItem,
    checkMax,
  } = useShoppingCart();

  return (
    <>
      <Header status={status} cartItemCount={cartItems.length} />
      <Body>
        <ProductListContainer
          cartItems={cartItems}
          updateCartItems={updateCartItems}
          getMatchCartItem={getMatchCartItem}
          updateErrorMessage={updateErrorMessage}
          checkMax={checkMax}
        />
      </Body>
      <StyledDiv>
        {errorMessage.map((message, index) => (
          <ErrorBox key={index}>{message}</ErrorBox>
        ))}
      </StyledDiv>
    </>
  );
}

export default App;

const StyledDiv = styled.div`
  position: absolute;
  width: 100%;
  top: 64px;
  left: 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
