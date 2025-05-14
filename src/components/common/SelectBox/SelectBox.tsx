import { css } from '@emotion/css';

type SelectBoxProps = {
  placeHolder: string;
  options: string[];
} & React.SelectHTMLAttributes<HTMLElement>;

const selectBoxContainer = css`
  width: 100%;
  height: 36px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

function SelectBox({ placeHolder, options, ...props }: SelectBoxProps) {
  return (
    <>
      <select className={selectBoxContainer} {...props}>
        <option hidden>{placeHolder}</option>
        {options.length > 0 &&
          options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
      </select>
    </>
  );
}

export default SelectBox;
