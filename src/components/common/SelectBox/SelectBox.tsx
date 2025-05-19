import { selectBoxContainer } from './SelectBox.style';

type SelectBoxProps = {
  placeHolder: string;
  options: string[];
} & React.SelectHTMLAttributes<HTMLElement>;

function SelectBox({ placeHolder, options, ...props }: SelectBoxProps) {
  return (
    <select className={selectBoxContainer} {...props}>
      <option hidden>{placeHolder}</option>
      {options.length > 0 &&
        options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
    </select>
  );
}

export default SelectBox;
