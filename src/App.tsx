import Header from './Component/Layout/Header';
import ProductListContainer from './Component/Product/ProductListContainer';
import Body from './Component/Layout/Body';
import { useCallback, useState } from 'react';
import ErrorBox from './Component/Common/ErrorBox';
import styled from '@emotion/styled';

function App() {
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const updateErrorMessage = useCallback((errorMessage: string) => {
    setErrorMessage((prev) => [...prev, errorMessage]);
  }, []);

  return (
    <>
      <Header updateErrorMessage={updateErrorMessage} />
      <Body>
        <ProductListContainer updateErrorMessage={updateErrorMessage} />
      </Body>
      <StyledDiv>
        {errorMessage
          ? errorMessage.map((message) => <ErrorBox>{message}</ErrorBox>)
          : null}
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
