import { SelectStyle } from "./Select.css";
import { SelectProps } from "./Select.types";

function Select({ options }: SelectProps) {
  return (
    <select css={SelectStyle}>
      {options.map((option) => (
        <option value={option.value}>{option.text}</option>
      ))}
    </select>
  );
}

export default Select;
