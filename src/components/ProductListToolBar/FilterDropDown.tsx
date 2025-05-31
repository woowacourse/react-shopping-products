import { DropDownStyles } from "./DropDown.emotion";

type FilterDropDownProps = {
  options: readonly string[];
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const FilterDropDown = ({
  options,
  value,
  handleChange,
}: FilterDropDownProps) => {
  return (
    <select
      aria-label="filter"
      className={DropDownStyles}
      onChange={handleChange}
      value={value}
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
