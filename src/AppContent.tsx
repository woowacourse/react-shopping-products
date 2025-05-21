import Header from "./Component/Layout/Header/Header";
import Body from "./Component/Layout/Body/Body";
import ProductListContainer from "./Component/Product/ProductListContainer/ProductListContainer";
import ErrorBox from "./Component/Common/ErrorBox/ErrorBox";
import useCartContext from "./contexts/useCartContext";
import styled from "@emotion/styled";

export default function AppContent() {
  const { errorMessage } = useCartContext();

  return (
    <>
      <Header />
      <Body>
        <ProductListContainer />
      </Body>
      {errorMessage.map((msg, index) => (
        <StyledDiv>
          <ErrorBox key={index}>{msg}</ErrorBox>
        </StyledDiv>
      ))}
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
