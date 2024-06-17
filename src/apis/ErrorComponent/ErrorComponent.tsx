import Text from '@/components/common/Text/Text';
import ErrorWithHeader from '@/errors/ErrorWithHeader';
import styled from 'styled-components';

const ErrorAreaContainer = styled.div`
  height: 100%;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  row-gap: 14px;
`;

const ErrorComponent = ({ error }: { error: ErrorWithHeader }) => {
  return (
    <ErrorAreaContainer>
      <Text size="l" weight="l">
        {error.header}
      </Text>
      <Text size="m" weight="l">
        {error.message}
      </Text>
    </ErrorAreaContainer>
  );
};

export default ErrorComponent;
