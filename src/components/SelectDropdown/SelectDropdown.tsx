import { useState } from 'react';
import {
  SelectDropdownWrapper,
  DropdownWrapper,
  DropdownTitleWrapper,
  DropdownUlWrapper,
  DropdownLiWrapper,
} from '../../styles/SelectDropdown';
import { IMAGE_PATH } from '../../constants/imagePath';
import { CATEGORY, SORT } from '../../constants/selectOption';

type OptionType = (typeof CATEGORY)[number] | (typeof SORT)[number];

type SelectDropdownProps<T extends OptionType> = {
  title: T;
  options: readonly T[];
  onSelect: (value: T) => void;
};

const SelectDropdown = <T extends OptionType>({
  title,
  options,
  onSelect,
}: SelectDropdownProps<T>) => {
  const [open, setOpen] = useState(false);

  const toggleSelectDropdown = () => {
    setOpen(!open);
  };

  const handleDropDown = (value: T) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <SelectDropdownWrapper>
      <DropdownWrapper onClick={toggleSelectDropdown}>
        <DropdownTitleWrapper>{title}</DropdownTitleWrapper>
        {open ? (
          <img src={IMAGE_PATH.CHEVRON_UP} alt="chevron-up" />
        ) : (
          <img src={IMAGE_PATH.CHEVRON_DOWN} alt="chevron-down" />
        )}
      </DropdownWrapper>
      {open && (
        <DropdownUlWrapper>
          {options.map((option) => (
            <DropdownLiWrapper key={option} onClick={() => handleDropDown(option)}>
              {option}
            </DropdownLiWrapper>
          ))}
        </DropdownUlWrapper>
      )}
    </SelectDropdownWrapper>
  );
};

export default SelectDropdown;
