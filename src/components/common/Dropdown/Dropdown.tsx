import * as S from "./Dropdown.style";

interface DropdownProps {
  optionList: string[];
}

const Dropdown = ({ optionList = [] }: DropdownProps) => {
  return (
    <S.Select name="category">
      {optionList.map((option) => (
        <S.Option value={option}>option</S.Option>
      ))}
    </S.Select>
  );
};

export default Dropdown;
