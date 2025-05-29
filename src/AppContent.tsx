import Header from "./Component/Layout/Header";
import Body from "./Component/Layout/Body";
import ProductListContainer from "./Component/Product/ProductListContainer";
import ErrorBox from "./Component/Common/ErrorBox";
import useCartContext from "./contexts/CartContext";
import styled from "@emotion/styled";

export default function AppContent() {
  const { cartItems, status, errorMessage } = useCartContext();

  return (
    <>
      <Header status={status} cartItemCount={cartItems.length} />
      <Body>
        <ProductListContainer />
      </Body>
      <StyledDiv>
        {errorMessage.map((msg, index) => (
          <ErrorBox key={index}>{msg}</ErrorBox>
        ))}
      </StyledDiv>
    </>
  );
}

const StyledDiv = styled.div`
  position: absolute;
  width: 100%;
  top: 64px;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
