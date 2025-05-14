import { DropDownStyles } from "./DropDown.emotion";

type SortingDropDownProps = {
  options: string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SortingDropDown = ({ options, handleChange }: SortingDropDownProps) => {
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

export default SortingDropDown;
