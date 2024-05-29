import { useState } from "react";

import chevronDown from "../../../assets/images/chevronDown.svg";
import * as S from "./Dropdown.style";

interface DropdownProps {
  optionList: string[];
  type: "category" | "sort";
}

const Dropdown = ({ optionList = [], type }: DropdownProps) => {
  const [value, setValue] = useState(optionList[0]);
  return (
    <S.DropdownLabel htmlFor={type}>
      <S.Dropdown>
        <S.Select id={type} name={type}>
          {optionList.map((option) => {
            return (
              <S.Option key={option} value={option}>
                {option}
              </S.Option>
            );
          })}
        </S.Select>
        <S.ChevronDownIcon src={chevronDown} />
      </S.Dropdown>
    </S.DropdownLabel>
  );
};

export default Dropdown;
