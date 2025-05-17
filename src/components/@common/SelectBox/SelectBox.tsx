import * as S from "./SelectBox.styles";

interface SelectBoxProps<T extends string> {
  testIdPrefix: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<T>>;
  options: string[];
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
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </S.Select>
  );
};

export default SelectBox;
