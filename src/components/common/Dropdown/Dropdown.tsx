/**
 * 리스트
 * value,
 * onChange
 */
type DropdownProps = {
  optionList: string[];
  onChange: () => void;
};

export default function Dropdown({ optionList, onChange }: DropdownProps) {
  return (
    <select onChange={onChange}>
      {optionList.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
