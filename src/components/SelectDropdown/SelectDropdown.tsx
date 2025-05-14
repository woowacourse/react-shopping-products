import { useState } from "react";
import {
  SelectDropdownWrapper,
  DropdownWrapper,
  DropdownTitleWrapper,
  DropdownUlWrapper,
  DropdownLiWrapper,
} from "../../styles/SelectDropdown";
import { IMAGE_PATH } from "../../constants/imagePath";

type SelectDropdown = {
  options: string[];
  onSelect: (value: string) => void;
};

const SelectDropdown = ({ options, onSelect }: SelectDropdown) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(options[0]);

  const toggleSelectDropdown = () => {
    setOpen(!open);
  };

  const handleDropDown = (value: string) => {
    onSelect(value);
    setTitle(value);
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
            <DropdownLiWrapper
              key={option}
              onClick={() => handleDropDown(option)}
            >
              {option}
            </DropdownLiWrapper>
          ))}
        </DropdownUlWrapper>
      )}
    </SelectDropdownWrapper>
  );
};

export default SelectDropdown;
