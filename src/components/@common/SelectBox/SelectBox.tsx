import * as S from "./SelectBox.styles";

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface SelectBoxProps<T extends string> {
  testIdPrefix: string;
  value: T;
  onChange: React.Dispatch<React.SetStateAction<T>>;
  options: SelectOption<T>[];
}

const SelectBox = <T extends string>({
  testIdPrefix,
  value,
  onChange,
  options,
}: SelectBoxProps<T>) => {
  return (
    <S.Select
      data-testid={`${testIdPrefix}-select`}
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </S.Select>
  );
};

export default SelectBox;
