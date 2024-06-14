import { IMAGES } from "@/assets/images";
import styled from "styled-components";

interface StepperProps {
  count: number;
  plusAction: () => void;
  minusAction: () => void;
}

const Stepper = ({ count, plusAction, minusAction }: StepperProps) => {
  return (
    <Container>
      <ActionButton onClick={minusAction}>
        <Img src={IMAGES.minus} />
      </ActionButton>
      {count}
      <ActionButton onClick={plusAction}>
        <Img src={IMAGES.plus} />
      </ActionButton>
    </Container>
  );
};

export default Stepper;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80px;
  height: 24px;
  align-items: center;
`;

const ActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.COLOR["grey2"]};
  border-radius: 8px;

  cursor: pointer;
`;

const Img = styled.img``;
