import { ComponentProps } from "react";
import { StyledSelect } from "./SelectBox.styles";

type Options = {
  name: string;
};

interface SelectBoxProps {
  options: Options[];
}

export default function SelectBox({
  options,
  ...props
}: SelectBoxProps & ComponentProps<"select">) {
  return (
    <StyledSelect {...props}>
      {options.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </StyledSelect>
  );
}
