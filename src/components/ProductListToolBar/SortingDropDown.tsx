import { DropDownStyles } from "./DropDown.emotion";

type SortingDropDownProps = {
  options: readonly string[];
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SortingDropDown = ({
  options,
  value,
  handleChange,
}: SortingDropDownProps) => {
  return (
    <select
      aria-label="sorting"
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

export default SortingDropDown;
