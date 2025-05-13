import * as S from "./Select.styled";

interface SelectProps {
  options: Record<string, string>;
}

function Select({ options }: SelectProps) {
  return (
    <S.Select>
      {Object.keys(options).map((option) => (
        <option value={options[option]}>{option}</option>
      ))}
    </S.Select>
  );
}

export default Select;
