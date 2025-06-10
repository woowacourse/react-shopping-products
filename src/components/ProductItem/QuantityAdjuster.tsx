import styled from "@emotion/styled";

const QuantityAdjuster = ({
  count,
  onIncreaseClick,
  onDecreaseClick,
  testId,
}: {
  count: number;
  onIncreaseClick: () => void;
  onDecreaseClick: () => void;
  testId: number;
}) => {
  return (
    <QuantityAdjusterContainer>
      <QuantityAdjustButton
        onClick={() => onDecreaseClick()}
        data-testid={`minus-button${testId}`}
      >
        -
      </QuantityAdjustButton>
      <p data-testid={`count${testId}`}>{count}</p>
      <QuantityAdjustButton
        onClick={() => onIncreaseClick()}
        data-testid={`plus-button${testId}`}
      >
        +
      </QuantityAdjustButton>
    </QuantityAdjusterContainer>
  );
};

export default QuantityAdjuster;

const QuantityAdjusterContainer = styled.div`
  width: 80px;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuantityAdjustButton = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border: solid 1px #0000001a;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
`;
