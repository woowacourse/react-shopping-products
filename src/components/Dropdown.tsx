import styled from "@emotion/styled";
import { useState } from "react";

import ChevronDown from "./icons/ChevronDown";
import ChevronUp from "./icons/ChevronUp";

const S = {
  DropdownContainer: styled.div`
    width: 150px;
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

interface DropdownProps {
  options: string[];
}

function Dropdown({ options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(options[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    setSelectedLabel(option);
    setIsOpen(false);
  };

  return (
    <S.DropdownContainer onClick={toggleDropdown}>
      <S.DropdownLabel>
        {selectedLabel}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </S.DropdownLabel>
      {isOpen && (
        <S.DropdownList>
          {options.map((option) => (
            <S.DropdownOption key={`dropdown-${option}`} onClick={() => handleSelect(option)}>
              {option}
            </S.DropdownOption>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
}

export default Dropdown;
