import chevronDown from "../../../assets/images/chevronDown.svg";
import * as S from "./Dropdown.style";

interface DropdownProps {
  optionList: string[][];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  type: "category" | "sort";
}

const Dropdown = ({ optionList, value, onChange, type }: DropdownProps) => {
  return (
    <S.DropdownLabel htmlFor={type}>
      <S.Dropdown>
        <S.Select id={type} name={type} value={value} onChange={onChange}>
          {optionList.map((option) => {
            return (
              <S.Option key={option[0]} value={option[0]}>
                {option[1]}
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
