import { useErrorToast } from '@/hooks/useErrorToast';
import styled from '@emotion/styled';
import Flex from './Flex';

function ErrorToastMessage() {
  const message = useErrorToast();

  if (!message) return null;

  return (
    <Container>
      <ErrorText>{message}</ErrorText>
    </Container>
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
