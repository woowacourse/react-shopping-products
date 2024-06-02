import { FlexColumn, FlexRow } from '@/style/common.style';

import DropDownIcon from '@/assets/dropdown.svg?react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import { useState } from 'react';

interface Option {
  [key: string]: string;
}

interface Props {
  initialValue: string;
  options: Option[];
  onChangeSelect: (value: string) => void;
}

const BaseDropDown = ({ initialValue, options, onChangeSelect }: Props) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (option: Option) => {
    setSelectedValue(option.value);
    setShowOptions(false);
    onChangeSelect(option.key);
  };

  return (
    <div>
      <S.DropDownHeader onClick={() => setShowOptions((prev) => !prev)}>
        <S.SelectedOption>
          {selectedValue}
          <DropDownIcon />
        </S.SelectedOption>
      </S.DropDownHeader>
      {showOptions && (
        <S.OptionList>
          {options.map((option, index) => (
            <S.OptionItem key={index} onClick={() => handleOptionClick(option)}>
              {option.value}
            </S.OptionItem>
          ))}
        </S.OptionList>
      )}
    </div>
  );
};

export default BaseDropDown;

const S = {
  DropDownHeader: styled.div`
    cursor: pointer;
  `,
  SelectedOption: styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 125px;
    height: 30px;
    padding: 0 10px;
    border: 1px solid ${theme.color.blackWithOpacity};
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
  `,
  OptionList: styled.ul`
    position: absolute;
    ${FlexColumn}
    width: 125px;
    max-height: 260px;
    margin-top: 4px;
    overflow-y: auto;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 ${theme.color.blackWithOpacity};
    border-radius: 8px;
    background-color: ${theme.color.white};
  `,
  OptionItem: styled.li`
    ${FlexRow}
    align-items: center;
    width: 90%;
    margin: 5px 5%;
    padding: 5px 10px;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;

    &:hover,
    &:active {
      background-color: ${theme.color.blackWithOpacity};
    }
  `,
};
