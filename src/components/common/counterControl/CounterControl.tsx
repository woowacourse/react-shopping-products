import styled from '@emotion/styled';

interface CounterControlProps {
  count: number;
  handlePlusCount: () => void;
  handleMinusCount: () => void;
}

const CounterControl = ({ count, handlePlusCount, handleMinusCount }: CounterControlProps) => {
  return (
    <CountButtonContainer>
      <CounterButton onClick={handleMinusCount}>-</CounterButton>
      <CountNumber>{count}</CountNumber>
      <CounterButton onClick={handlePlusCount}>+</CounterButton>
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
`;

const CountNumber = styled.span`
  font-size: var(--font-size-body);
`;

export default CounterControl;
