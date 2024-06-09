import BorderButton from "./BorderButton";
import Minus from "../icons/Minus";
import Plus from "../icons/Plus";

interface Props {
  onClick: () => void;
}

export const PlusButton = ({ onClick }: Props) => {
  return (
    <BorderButton onClick={onClick}>
      <Plus />
    </BorderButton>
  );
};

export const MinusButton = ({ onClick }: Props) => {
  return (
    <BorderButton onClick={onClick}>
      <Minus />
    </BorderButton>
  );
};
