import * as S from "./SelectBox.styles";

interface Props<T extends string> {
  id: string;
  value: T;
  onChange: React.Dispatch<React.SetStateAction<T>>;
  options: readonly T[] | T[];
}

const SelectBox = <T extends string>({
  id,
  value,
  onChange,
  options,
}: Props<T>) => {
  return (
    <S.Select
      data-testid={`${id}-select`}
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
