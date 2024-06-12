import * as S from "./DropDown.styled";

interface DropDownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export const DropDown = ({ value, onChange, options }: DropDownProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <S.StyledSelect value={value} onChange={handleChange} aria-label="옵션 선택">
      {options.map((opt) => (
        <S.StyledOption key={opt} value={opt}>
          {opt}
        </S.StyledOption>
      ))}
    </S.StyledSelect>
  );
};
