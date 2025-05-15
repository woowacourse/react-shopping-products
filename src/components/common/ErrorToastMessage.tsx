import styled from '@emotion/styled';
import Flex from './Flex';
import { useCallback, useEffect, useState } from 'react';
import { useShopErrorContext } from '../../pages/shop/context/useShopErrorContext';

function ErrorToastMessage() {
  const [toast, setToast] = useState(true);
  const { handleErrorFalse } = useShopErrorContext();

  useEffect(() => {
    setTimeout(() => {
      setToast(false);
      handleErrorFalse();
    }, 3000);
  }, []);

  const showErrorToast = useCallback(
    () => (
      <Container>
        <ErrorText>오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</ErrorText>
      </Container>
    ),
    []
  );

  const hideErrorToast = useCallback(() => null, []);

  return toast ? showErrorToast() : hideErrorToast();
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
