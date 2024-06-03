import chevronDown from "../../../assets/images/chevronDown.svg";
import * as S from "./Dropdown.style";

interface DropdownProps {
  optionList: { key: string; value: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  type: "category" | "sort";
}

const Dropdown = ({ optionList, value, onChange, type }: DropdownProps) => {
  const labeling = (key: string) => {
    switch (key) {
      case "PRICE_ASC":
        return "가격 낮은 순";
      case "PRICE_DESC":
        return "가격 높은 순";
      default:
        return key;
    }
  };
  return (
    <S.DropdownLabel htmlFor={type}>
      <S.Dropdown>
        <S.Select id={type} name={type} value={value} onChange={onChange}>
          {optionList.map(({ key, value }) => (
            <S.Option key={value} value={value}>
              {type === "sort" ? labeling(key) : key}
            </S.Option>
          ))}
        </S.Select>
        <S.ChevronDownIcon src={chevronDown} />
      </S.Dropdown>
    </S.DropdownLabel>
  );
};

export default Dropdown;
