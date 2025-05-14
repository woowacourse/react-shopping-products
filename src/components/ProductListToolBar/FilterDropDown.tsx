import { DropDownStyles } from "./DropDown.emotion";

type FilterDropDownProps = {
  options: string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const FilterDropDown = ({ options, handleChange }: FilterDropDownProps) => {
  return (
    <select className={DropDownStyles} onChange={handleChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default FilterDropDown;
