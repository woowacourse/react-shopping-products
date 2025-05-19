import { ComponentProps } from "react";
import styled from "@emotion/styled";

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

const StyledSelect = styled.select`
  width: 125px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #0000001a;
  padding: 8px;
`;
