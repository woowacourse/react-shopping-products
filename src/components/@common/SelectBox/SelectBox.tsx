import * as S from "./SelectBox.styles";

interface SelectBoxProps<T extends string> {
  id: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<T>>;
  options: string[];
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
