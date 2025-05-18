import * as S from "./SelectBox.styles";

interface SelectBoxProps<T extends string> {
  id: string;
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  options: readonly T[] | T[];
}

const SelectBox = <T extends string>({
  id,
  state,
  setState,
  options,
}: SelectBoxProps<T>) => {
  return (
    <S.Select
      data-testid={`${id}-select`}
      value={state}
      onChange={(e) => setState(e.target.value as T)}
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
