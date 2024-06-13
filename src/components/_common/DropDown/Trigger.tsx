import useDropDown from "../../../hooks/useDropDown";

import * as Styled from "./DropDown.style";

interface TriggerProps {
  value: string;
}

export default function Trigger({ value }: TriggerProps) {
  const { isOpen, toggleDropDown } = useDropDown();

  return (
    <Styled.DropDownTrigger
      $isOpened={isOpen}
      $isSelected={!!value}
      onClick={toggleDropDown}
    >
      {value}
    </Styled.DropDownTrigger>
  );
}
