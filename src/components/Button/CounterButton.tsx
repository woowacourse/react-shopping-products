import { MinusIcon, PlusIcon } from "../../assets";
import { COUNTER_BUTTON_TYPES } from "../../constants";
import { BaseButton } from "./BaseButton";
import * as S from "./CounterButton.styled";

interface CounterButtonProp {
  type: (typeof COUNTER_BUTTON_TYPES)[keyof typeof COUNTER_BUTTON_TYPES];
  onClick?: () => void;
}

export const CounterButton = ({ type, onClick }: CounterButtonProp) => {
  const src = type === COUNTER_BUTTON_TYPES.INCREMENT ? PlusIcon : MinusIcon;
  const ariaLabel = type === COUNTER_BUTTON_TYPES.INCREMENT ? "증가 버튼" : "감소 버튼";

  return (
    <BaseButton onClick={onClick} ariaLabel={ariaLabel}>
      <S.StyledCounterButtonImg src={src} alt="" />
    </BaseButton>
  );
};
