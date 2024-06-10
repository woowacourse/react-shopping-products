import { MinusIcon, PlusIcon } from "../../assets";
import { COUNTER_BUTTON_TYPES } from "../../constants";
import { BaseButton } from "./BaseButton";
import { StyledCounterButtonImg } from "./CounterButton.styled";

interface CounterButtonProps {
  type: (typeof COUNTER_BUTTON_TYPES)[keyof typeof COUNTER_BUTTON_TYPES];
  onClick?: () => void;
}

export const CounterButton = ({ type, onClick }: CounterButtonProps) => {
  const src = type === COUNTER_BUTTON_TYPES.INCREMENT ? PlusIcon : MinusIcon;

  return (
    <BaseButton onClick={onClick}>
      <StyledCounterButtonImg src={src} alt="" />
    </BaseButton>
  );
};
