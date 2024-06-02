import ChevronDown from "../../icons/ChevronDown";
import ChevronUp from "../../icons/ChevronUp";
import { useState } from "react";
import S from "./styledComponent";

interface DropdownProps<T extends string> {
  options: Record<T, string>;
  handleChange: (option: T) => void;
}

function Dropdown<T extends string>({ options, handleChange }: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const optionsKeys = Object.keys(options) as T[];
  const defaultKey = optionsKeys[0];

  const [selectedOptionKey, setSelectedOptionKey] = useState<T>(defaultKey);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (optionKey: T) => {
    setSelectedOptionKey(optionKey);
    setIsOpen(false);
    handleChange(optionKey);
  };

  return (
    <S.DropdownContainer onClick={toggleDropdown}>
      <S.DropdownLabel>
        {options[selectedOptionKey]}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </S.DropdownLabel>
      {isOpen && (
        <S.DropdownList>
          {optionsKeys.map((optionkey: T) => (
            <S.DropdownOption key={`dropdown-${optionkey}`} onClick={() => handleSelect(optionkey)}>
              {options[optionkey]}
            </S.DropdownOption>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
}

export default Dropdown;
