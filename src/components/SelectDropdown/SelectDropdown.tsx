import { useState } from 'react';
import * as S from './SelectDropdown.styled';
import { IMAGE_PATH } from '../../constants/imagePath';

type SelectDropdownProps = {
  title: string;
  options: readonly string[];
  onSelect: (value: string) => void;
};

const SelectDropdown = ({ title, options, onSelect }: SelectDropdownProps) => {
  const [open, setOpen] = useState(false);

  const toggleSelectDropdown = () => {
    setOpen(!open);
  };

  const handleDropDown = (value: string) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <S.SelectDropdownWrapper>
      <S.DropdownWrapper onClick={toggleSelectDropdown}>
        <S.DropdownTitleWrapper>{title}</S.DropdownTitleWrapper>
        {open ? (
          <img src={IMAGE_PATH.CHEVRON_UP} alt="chevron-up" />
        ) : (
          <img src={IMAGE_PATH.CHEVRON_DOWN} alt="chevron-down" />
        )}
      </S.DropdownWrapper>
      {open && (
        <S.DropdownUlWrapper>
          {options.map((option) => (
            <S.DropdownLiWrapper key={option} onClick={() => handleDropDown(option)}>
              {option}
            </S.DropdownLiWrapper>
          ))}
        </S.DropdownUlWrapper>
      )}
    </S.SelectDropdownWrapper>
  );
};

export default SelectDropdown;
