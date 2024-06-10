import { useEffect, useRef, useState } from 'react';

import { ChevronDown, ChevronUp } from '../../../assets';

import * as S from './Dropdown.style';
import DropdownOptions from './DropdownOptions';

interface DropdownProps<T> {
  optionList: [T, string][];
  onChange: (value: T) => void;
}

// TODO: dropdown 관련 로직 hook으로 분리

function Dropdown<T extends string>({
  optionList,
  onChange,
}: DropdownProps<T>) {
  const [isOpened, setIsOpened] = useState(false);
  const [preview, setPreview] = useState(optionList[0][1]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpened(!isOpened);
  };

  const handleChangeOption = ([key, value]: [T, string]) => {
    onChange(key);
    setPreview(value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <S.Dropdown ref={dropdownRef}>
      <S.Preview isOpened={isOpened} onClick={handleToggleDropdown}>
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
