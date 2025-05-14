import useClickOutsideRef from "@/hooks/useClickOutsideRef";
import { useState } from "react";
import * as S from "./Dropdown.styled";
import ArrowIcon from "@components/ArrowIcon";

interface DropdownProps<T extends string> {
  optionList: readonly T[];
  onClick: (option: T) => void;
  defaultOption?: string;
  selectedOption: T | null;
}

function Dropdown<T extends string>({
  optionList,
  onClick,
  selectedOption,
  defaultOption,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useClickOutsideRef<HTMLDivElement>(() =>
    setIsOpen(false)
  );

  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDropdownOptionClick = (option: T) => {
    onClick(option);
    setIsOpen(false);
  };

  return (
    <S.Container ref={dropdownRef}>
      <S.DropdownTrigger type="button" onClick={handleDropdownToggle}>
        {selectedOption ?? defaultOption}
        <ArrowIcon direction={isOpen ? "down" : "up"} />
      </S.DropdownTrigger>
      {isOpen && (
        <S.OptionList>
          {optionList.map((option) => (
            <S.OptionItem key={option}>
              <S.OptionItemButton
                type="button"
                onClick={() => handleDropdownOptionClick(option)}
              >
                {option}
              </S.OptionItemButton>
            </S.OptionItem>
          ))}
        </S.OptionList>
      )}
    </S.Container>
  );
}

export default Dropdown;
