import ChevronDown from "./icons/ChevronDown";
import ChevronUp from "./icons/ChevronUp";
import styled from "@emotion/styled";
import { useState } from "react";

const S = {
  DropdownContainer: styled.div`
    width: 125px;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fff;
    cursor: pointer;
    overflow: visible;
  `,

  DropdownLabel: styled.div`
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  DropdownList: styled.ul`
    position: absolute;
    top: 100%;
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    max-height: 200px;
    overflow: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  `,

  DropdownOption: styled.li`
    padding: 8px 12px;
    &:hover {
      background-color: #f0f0f0;
    }
  `,
};

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
