import { useState } from "react";
import {
  SelectDropdownWrapper,
  DropdownWrapper,
  DropdownTitleWrapper,
  DropdownUlWrapper,
  DropdownLiWrapper,
} from "./SelectDropdown.styled";
import { IMAGE_PATH } from "../../constants/imagePath";

type SelectDropdownProps<T extends string> = {
  title: string;
  options: readonly T[];
  labelMap: Record<T, string>;
  onSelect: (value: T) => void;
};

const SelectDropdown = <T extends string>({
  title,
  options,
  labelMap,
  onSelect,
}: SelectDropdownProps<T>) => {
  const [open, setOpen] = useState(false);

  const toggleSelectDropdown = () => {
    setOpen((prev) => !prev);
  };

  const handleDropDown = (value: T) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <SelectDropdownWrapper>
      <DropdownWrapper onClick={toggleSelectDropdown}>
        <DropdownTitleWrapper>{title}</DropdownTitleWrapper>
        <img
          src={open ? IMAGE_PATH.CHEVRON_UP : IMAGE_PATH.CHEVRON_DOWN}
          alt="chevron-icon"
        />
      </DropdownWrapper>
      {open && (
        <DropdownUlWrapper>
          {options.map((option) => (
            <DropdownLiWrapper
              key={option}
              onClick={() => handleDropDown(option)}
            >
              {labelMap[option]}
            </DropdownLiWrapper>
          ))}
        </DropdownUlWrapper>
      )}
    </SelectDropdownWrapper>
  );
};

export default SelectDropdown;
