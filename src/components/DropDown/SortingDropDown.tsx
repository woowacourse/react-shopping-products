import { DropDownStyles } from "./DropDown.emotion";

type SortingDropDownProps = {
  options: string[];
};

const SortingDropDown = ({ options }: SortingDropDownProps) => {
  return (
    <select className={DropDownStyles}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SortingDropDown;
