import { DropDownStyles } from "./DropDown.emotion";

type SortingDropDownProps = {
  options: readonly string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SortingDropDown = ({ options, handleChange }: SortingDropDownProps) => {
  return (
    <select
      aria-label="sorting"
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

export default SortingDropDown;
