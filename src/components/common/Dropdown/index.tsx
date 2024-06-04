import * as S from './style';

import { useState } from 'react';

import { DOWN_ARROW, UP_ARROW } from '../../../assets/images';

interface DropdownProps {
  optionArray: string[];
  selectedOption: string;
  optionChange: (option: string) => void;
}

const Dropdown = ({ optionArray, selectedOption, optionChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const DROPDOWN_ICON = isOpen ? UP_ARROW : DOWN_ARROW;

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionOnClick = (option: string) => {
    optionChange(option);
    setIsOpen(false);
  };

  const options = optionArray.map((option) => (
    <S.Option key={option} onClick={() => handleOptionOnClick(option)}>
      {option}
    </S.Option>
  ));

  return (
    <S.Dropdown $isOpen={isOpen}>
      <S.Select onClick={handleToggleDropdown}>
        <span>{selectedOption}</span>
        <S.ArrowImage src={DROPDOWN_ICON} alt="열고 닫기 화살표" />
      </S.Select>
      {isOpen && <S.Options>{options}</S.Options>}
    </S.Dropdown>
  );
};

export default Dropdown;
