import { ComponentProps } from "react";
import { StyledSelect } from "../../styles/Common/SelectBox.styles";

export type Option = {
  label: string;
  value: string;
};

interface SelectBoxProps {
  options: Option[];
}

export default function SelectBox({
  options,
  ...props
}: SelectBoxProps & ComponentProps<"select">) {
  return (
    <StyledSelect {...props}>
      {options.map(({ label, value }) => (
        <option key={label} value={value}>
          {label}
        </option>
      ))}
    </StyledSelect>
  );
}
