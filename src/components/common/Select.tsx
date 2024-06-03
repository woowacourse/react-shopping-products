import styled from "styled-components";

interface Option extends React.InputHTMLAttributes<HTMLSelectElement> {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  options: Option[];
}

const Select = ({ placeholder, options, ...rest }: SelectProps) => {
  return (
    <S.Select {...rest}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map(({ value, label }, index) => {
        return (
          <option key={`${value}-${index}`} value={value}>
            {label}
          </option>
        );
      })}
    </S.Select>
  );
};

export default Select;

const S = {
  Select: styled.select<React.SelectHTMLAttributes<HTMLSelectElement>>`
    width: 30%;

    padding: 8px 4px;
    border: 0.1rem solid #acacac;
    border-radius: 0.8rem;
    color: #000000;
    font-size: 1.4rem;
    font-weight: 400;

    cursor: pointer;
  `,
};
