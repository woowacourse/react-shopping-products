import * as S from "./SelectBox.styles";

const SelectBox = ({ options }: { options: string[] }) => {
  return (
    <S.Select>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </S.Select>
  );
};

export default SelectBox;
