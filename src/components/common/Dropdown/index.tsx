import * as S from './style';

import { useState } from 'react';

import { DOWN_ARROW, UP_ARROW } from '../../../assets/images';

export interface Option<T> {
  value: T;
  label: string;
}

interface DropdownProps<T> {
  options: Option<T>[];
  selectedOption: string;
  optionChange: (option: T) => void;
}

const Dropdown = <T,>({ options, selectedOption, optionChange }: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const DROPDOWN_ICON = isOpen ? UP_ARROW : DOWN_ARROW;

  const handleToggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionOnClick = (option: T) => {
    optionChange(option);
    setIsOpen(false);
  };

  return (
    <S.Dropdown $isOpen={isOpen}>
      <S.Select onClick={handleToggleDropdown}>
        <p>{selectedOption as string}</p>
        <S.ArrowImage src={DROPDOWN_ICON} alt="열고 닫기 화살표" />
      </S.Select>
      {isOpen && (
        <S.Options>
          {options.map(({ value, label }) => (
            <S.Option key={value as string} onClick={() => handleOptionOnClick(value)}>
              {label}
            </S.Option>
          ))}
        </S.Options>
      )}
    </S.Dropdown>
  );
};

export default Dropdown;
