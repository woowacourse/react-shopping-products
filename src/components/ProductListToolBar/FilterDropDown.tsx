import { DropDownStyles } from "./DropDown.emotion";

type FilterDropDownProps = {
  options: readonly string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const FilterDropDown = ({ options, handleChange }: FilterDropDownProps) => {
  return (
    <select
      aria-label="filter"
      className={DropDownStyles}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default FilterDropDown;
