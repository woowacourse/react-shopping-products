import * as S from "./SelectBox.styles";

interface SelectBoxProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
}

const SelectBox = ({ state, setState, options }: SelectBoxProps) => {
  return (
    <S.Select value={state} onChange={(e) => setState(e.target.value)}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </S.Select>
  );
};

export default SelectBox;
