import useClickOutsideRef from "@/hooks/useClickOutsideRef";
import { useState } from "react";
import * as S from "./Dropdown.styled";
import ArrowIcon from "@components/ArrowIcon";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps<T extends Option> {
  optionList: readonly T[];
  onOptionSelect: (option: T) => void;
  defaultOption?: string;
  selectedOption: T | null;
}

function Dropdown<T extends Option>({
  optionList,
  onOptionSelect,
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

  const handleOptionSelect = (option: T) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <S.Container ref={dropdownRef}>
      <S.DropdownTrigger
        data-testid="dropdown-trigger"
        type="button"
        onClick={handleDropdownToggle}
      >
        {selectedOption?.label ?? defaultOption}
        <ArrowIcon direction={isOpen ? "down" : "up"} />
      </S.DropdownTrigger>
      {isOpen && (
        <S.OptionList>
          {optionList.map((option) => (
            <S.OptionItem key={option.label}>
              <S.OptionItemButton
                type="button"
                data-testid={`dropdown-option-${option.label}`}
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </S.OptionItemButton>
            </S.OptionItem>
          ))}
        </S.OptionList>
      )}
    </S.Container>
  );
}

export default Dropdown;
