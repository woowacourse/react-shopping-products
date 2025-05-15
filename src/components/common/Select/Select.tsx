import * as S from './Select.styled';

interface SelectProps {
  options: Record<string, string>;
  onChange?: (value: string) => void;
}

function Select({ options, onChange }: SelectProps) {
  return (
    <S.Select onChange={(e) => onChange?.(e.target.value)}>
      {Object.keys(options).map((option) => (
        <option value={options[option]} key={options[option]}>
          {option}
        </option>
      ))}
    </S.Select>
  );
}

export default Select;
