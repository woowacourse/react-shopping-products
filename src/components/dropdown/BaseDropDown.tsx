import { useState } from 'react';
import BaseButton from '@/components/button/BaseButton';

import DropDownIcon from '@/assets/dropdown.svg?react';

import { STYLE_THEME } from '@/styles/constants/theme';
import styled from '@emotion/styled';

interface Option {
  [key: string]: string;
}

interface Props {
  initialValue: string;
  options: Option[];
  onChangeSelect: (value: string) => void;
}

const BaseDropDown = ({ initialValue, options, onChangeSelect }: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleOptionClick = (option: Option) => {
    setSelectedValue(option.value);
    setShowOptions(false);
    onChangeSelect(option.key);
  };

  return (
    <DropDownContainer>
      <BaseButton onClick={() => setShowOptions((prev) => !prev)}>
        <SelectedOption>
          {selectedValue}
          <DropDownIcon />
        </SelectedOption>
      </BaseButton>
      {showOptions && (
        <OptionList>
          {options.map((option, index) => (
            <OptionItem key={index} onClick={() => handleOptionClick(option)}>
              {option.value}
            </OptionItem>
          ))}
        </OptionList>
      )}
    </DropDownContainer>
  );
};

export default BaseDropDown;

const DropDownContainer = styled.div`
  position: relative;
`;

const SelectedOption = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 125px;
  height: 36px;
  padding: 0 8px;
  border: 1px solid ${STYLE_THEME.color.blackWithOpacity};
  box-sizing: border-box;
  border-radius: 4px;
`;

const OptionList = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 125px;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 ${STYLE_THEME.color.blackWithOpacity};
  border-radius: 8px;
  background-color: ${STYLE_THEME.color.white};
  font-size: ${STYLE_THEME.fontSize.small};
  font-weight: ${STYLE_THEME.fontWeight.normal};
  overflow-y: auto;
  cursor: pointer;
`;

const OptionItem = styled.li`
  display: flex;
  width: 100%;
  padding: 10px 10px;
  box-sizing: border-box;
  border-radius: 4px;

  &:hover,
  &:active {
    background-color: ${STYLE_THEME.color.blackWithOpacity};
  }
`;
