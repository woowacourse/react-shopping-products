import Header from "./components/product/Header/Header";
import ProductListContainer from "./components/product/ProductListContainer/ProductListContainer";

import styled from "@emotion/styled";

import { ApiProvider } from "./context/ApiContext/ApiContext";

function App() {
  return (
    <ApiProvider>
      <Container>
        <Wrapper>
          <Header />
          <ProductListContainer />
        </Wrapper>
      </Container>
    </ApiProvider>
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
