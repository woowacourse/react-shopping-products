import useClickOutsideRef from "@/hooks/useClickOutsideRef";
import { useState } from "react";
import * as S from "./Dropdown.styled";
import ArrowIcon from "@components/ArrowIcon";
import useDropdownFocus from "./useDropdownFocus";

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

  const handleOptionSelect = (option: T) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  const { focusedIndex, handleDropdownKeyDown } = useDropdownFocus({
    optionList,
    selectOption: handleOptionSelect,
    closeDropdown: () => setIsOpen(false),
  });

  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <S.Container
      ref={dropdownRef}
      onKeyDown={handleDropdownKeyDown}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      tabIndex={0}
    >
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
          {optionList.map((option, idx) => (
            <S.OptionItem key={option.label} isFocused={focusedIndex === idx}>
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
