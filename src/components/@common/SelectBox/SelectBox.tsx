import * as S from "./SelectBox.styles";

const SelectBox = ({ options }: { options: string[] }) => {
  return (
    <S.SelectBoxContainer>
      <select>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </S.SelectBoxContainer>
  );
};

export default SelectBox;
