import { useState } from 'react';

import BaseButton from '../button/BaseButton';

import DropDownIcon from '@/assets/dropdown.svg?react';

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
    <>
      <BaseButton onClick={() => setShowOptions((prev) => !prev)}>
        <S.SelectedOption>
          {selectedValue}
          <DropDownIcon />
        </S.SelectedOption>
      </BaseButton>
      {showOptions && (
        <S.OptionList>
          {options.map((option, index) => (
            <S.OptionItem key={index} onClick={() => handleOptionClick(option)}>
              {option.value}
            </S.OptionItem>
          ))}
        </S.OptionList>
      )}
    </>
  );
};

export default BaseDropDown;

const S = {
  SelectedOption: styled.label`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 125px;
    height: 36px;
    padding: 0 8px;
    border: 1px solid ${theme.color.blackWithOpacity};
    box-sizing: border-box;
    border-radius: 4px;
  `,
  OptionList: styled.ul`
    position: absolute;
    ${FlexColumn}
    width: 125px;
    max-height: 180px;
    margin-top: 36px;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 ${theme.color.blackWithOpacity};
    border-radius: 8px;
    background-color: ${theme.color.white};
    font-size: ${theme.fontSize.small};
    font-weight: ${theme.fontWeight.normal};
    overflow-y: auto;
    cursor: pointer;
  `,
  OptionItem: styled.li`
    ${FlexRow}
    align-items: center;
    width: 90%;
    margin: 5px 5%;
    padding: 5px 10px;
    box-sizing: border-box;
    border-radius: 4px;

    &:hover,
    &:active {
      background-color: ${theme.color.blackWithOpacity};
    }
  `,
};
