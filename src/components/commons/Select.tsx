import { SelectStyle } from "./Select.css";

interface SelectProps<T extends string> {
  options: { value: string; text: string }[];
  onChange: (category: T) => void;
  value: T;
}

function Select<T extends string>({
  onChange,
  value,
  options,
}: SelectProps<T>) {
  return (
    <select
      css={SelectStyle}
      onChange={(e) => onChange(e.target.value as T)}
      value={value}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
}

export default Select;
