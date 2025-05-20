import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useShopErrorContext } from '../../shop/context/useShopErrorContext';
import Flex from './Flex';

function ErrorToastMessage() {
  const [toast, setToast] = useState(true);
  const { errorMessage, hideErrorMessage } = useShopErrorContext();

  useEffect(() => {
    setTimeout(() => {
      setToast(false);
      hideErrorMessage();
    }, 3000);
  }, [hideErrorMessage]);

  return (
    toast && (
      <Container>
        <ErrorText>{errorMessage}</ErrorText>
      </Container>
    )
  );
}

const Container = styled(Flex)`
  height: 40px;
  position: absolute;
  top: 0;
  background-color: #ffc9c9;
`;

const ErrorText = styled.p`
  ${({ theme }) => theme.body2}
`;

export default ErrorToastMessage;
