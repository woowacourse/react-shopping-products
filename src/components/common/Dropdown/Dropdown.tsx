import { useState } from 'react';

import { ChevronDown } from '../../../assets';

import * as S from './Dropdown.style';
import DropdownOptions from './DropdownOptions';

interface DropdownProps<T> {
  optionList: [T, string][];
  onChange: (value: T) => void;
}

// TODO: dropdown 외부 영역 클릭 시 setIsOpened(false)

function Dropdown<T extends string>({
  optionList,
  onChange,
}: DropdownProps<T>) {
  const [isOpened, setIsOpened] = useState(false);
  const [preview, setPreview] = useState(optionList[0][1]);

  const handleIsOpened = () => {
    setIsOpened(!isOpened);
  };

  const handleChangeOption = ([key, value]: [T, string]) => {
    onChange(key);
    setPreview(value);
  };

  return (
    <S.Dropdown>
      <S.Preview isOpened={isOpened} onClick={handleIsOpened}>
        <S.PreviewText>{preview}</S.PreviewText>
        {isOpened ? <ChevronDown /> : <ChevronDown />}
      </S.Preview>
      {!isOpened || (
        <DropdownOptions
          optionList={optionList}
          changeOption={handleChangeOption}
          handleIsOpened={handleIsOpened}
        />
      )}
    </S.Dropdown>
  );
}

export default Dropdown;
