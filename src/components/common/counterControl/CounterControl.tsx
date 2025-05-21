import styled from '@emotion/styled';

interface CounterControlProps {
  count: number;
  maxCount: number;
  // TODO : handle을 on으로 시작하는 함수명으로 변경
  handlePlusCount: () => void;
  handleMinusCount: () => void;
}

const CounterControl = (props: CounterControlProps) => {
  const { count, maxCount, handlePlusCount, handleMinusCount } = props;

  return (
    <CountButtonContainer>
      <CounterButton onClick={handleMinusCount}>-</CounterButton>
      <CountNumber>{count}</CountNumber>
      <CounterButton onClick={handlePlusCount} disabled={count >= maxCount}>
        +
      </CounterButton>
    </CountButtonContainer>
  );
};

const CountButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const CounterButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid var(--color-light-grey);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-light-grey);
    color: var(--color-white);
  }
`;

const CountNumber = styled.span`
  font-size: var(--font-size-body);
`;

export default CounterControl;
