import { ChevronDown } from "../../../assets/";

import * as S from "./Dropdown.style";

interface DropdownProps {
  optionList: string[][];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  type: "category" | "sort";
}

function Dropdown({ optionList, value, onChange, type }: DropdownProps) {
  return (
    <S.DropdownLabel htmlFor={type}>
      <S.Dropdown>
        <S.Select id={type} name={type} value={value} onChange={onChange}>
          {optionList.map((option) => (
            <S.Option key={option[0]} value={option[0]}>
              {option[1]}
            </S.Option>
          ))}
        </S.Select>
        <ChevronDown />
      </S.Dropdown>
    </S.DropdownLabel>
  );
}

export default Dropdown;
