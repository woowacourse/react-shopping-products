import { useState } from 'react';
import {
  SelectDropdownWrapper,
  DropdownWrapper,
  DropdownTitleWrapper,
  DropdownUlWrapper,
  DropdownLiWrapper,
} from '../../styles/SelectDropdown';
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
