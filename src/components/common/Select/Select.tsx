import * as S from "./Select.styled";
import { ChangeEvent } from "react";

interface SelectProps {
  options: Record<string, string>;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function Select({ options, onChange }: SelectProps) {
  return (
    <S.Select onChange={onChange}>
      {Object.keys(options).map((option) => (
        <option value={options[option]} key={options[option]}>
          {option}
        </option>
      ))}
    </S.Select>
  );
}

export default Select;
