import styled from '@emotion/styled';

type QuantityStepperProps = {
  quantity: number;
  onClickIncrementButton: () => void;
  onClickDecrementButton: () => void;
};

const QuantityStepper = ({
  quantity,
  onClickDecrementButton,
  onClickIncrementButton,
}: QuantityStepperProps) => {
  return (
    <QuantityStepperContainer>
      <QuantityStepperButton onClick={onClickDecrementButton}>
        -
      </QuantityStepperButton>
      <QuantityDisplay>{quantity}</QuantityDisplay>
      <QuantityStepperButton onClick={onClickIncrementButton}>
        +
      </QuantityStepperButton>
    </QuantityStepperContainer>
  );
};

export default QuantityStepper;

const QuantityStepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 24px;
`;

const QuantityStepperButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 24px;
  border: 1px solid rgb(221, 221, 221);
  background-color: white;
  border-radius: 12px;
  cursor: pointer;
`;

const QuantityDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  font-size: 14px;
`;
