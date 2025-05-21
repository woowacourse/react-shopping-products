import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import { useErrorMessageContext } from "./context/ErrorMessageContext";

import styled from "@emotion/styled";

function App() {
  const { errorMessage } = useErrorMessageContext();

  return (
    <Container>
      <Wrapper>
        <Header></Header>
        {errorMessage && <ErrorMessage />}
        <Main />
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
