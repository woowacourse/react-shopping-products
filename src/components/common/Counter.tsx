import styled from '@emotion/styled';

interface CounterProps {
  canBeZero?: boolean;
  count: number;
  onMinusClick: () => void;
  onPlusClick: () => void;
}

function Counter({
  canBeZero = false,
  count,
  onMinusClick,
  onPlusClick,
  ...props
}: CounterProps) {
  const TrashIcon = (
    <span role="img" aria-label="delete">
      🗑️
    </span>
  );

  const showTrash = canBeZero === true && count === 1;

  return (
    <QuantityControls {...props}>
      <QuantityButton
        onClick={onMinusClick}
        disabled={!canBeZero && count <= 1}
        aria-label={showTrash ? '삭제' : '수량 감소'}
      >
        {showTrash ? TrashIcon : '−'}
      </QuantityButton>
      <QuantityDisplay>{count}</QuantityDisplay>
      <QuantityButton
        onClick={onPlusClick}
        aria-label={showTrash ? '삭제' : '수량 감소'}
      >
        +
      </QuantityButton>
    </QuantityControls>
  );
}
const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #666;

  &:hover {
    background-color: #f5f5f5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  font-size: 16px;
  font-weight: 500;
  min-width: 20px;
  text-align: center;
  color: #000;
`;

export default Counter;
