import { DropDownStyles } from "./DropDown.emotion";

type FilterDropDownProps = {
  options: string[];
};

const FilterDropDown = ({ options }: FilterDropDownProps) => {
  return (
    <select className={DropDownStyles}>
      <option>전체</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default FilterDropDown;
