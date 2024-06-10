import { useEffect, useRef, useState } from 'react';

import { ChevronDown, ChevronUp } from '../../../assets';
import useDropdown from '../../../hooks/useDropdown';

import * as S from './Dropdown.style';
import DropdownOptions from './DropdownOptions';

interface DropdownProps<T> {
  optionList: [T, string][];
  onChange: (value: T) => void;
}

function Dropdown<T extends string>({
  optionList,
  onChange,
}: DropdownProps<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isOpened, preview, handleChangeOption, handleToggleDropdown } =
    useDropdown({ optionList, onChange, dropdownRef });

  return (
    <S.Dropdown ref={dropdownRef} onClick={handleToggleDropdown}>
      <S.Preview isOpened={isOpened}>
        <S.PreviewText>{preview}</S.PreviewText>
        {isOpened ? <ChevronUp /> : <ChevronDown />}
      </S.Preview>
      {!isOpened || (
        <DropdownOptions
          optionList={optionList}
          changeOption={handleChangeOption}
          handleToggleDropdown={handleToggleDropdown}
        />
      )}
    </S.Dropdown>
  );
}

export default Dropdown;
