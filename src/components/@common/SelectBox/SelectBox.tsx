import * as S from "./SelectBox.styles";

const SelectBox = ({ options }: { options: string[] }) => {
  return (
    <S.Select>
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </S.Select>
  );
};

export default SelectBox;
