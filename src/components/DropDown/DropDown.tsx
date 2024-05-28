import { StyledOption, StyledSelect } from "./DropDown.styled";

interface DropDownProps {
  onClick: () => void;
  options: string[];
}

export const DropDown = ({ onClick, options }: DropDownProps) => {
  return (
    <StyledSelect onClick={onClick} name="category" id="category">
      {options.map((opt) => (
        <StyledOption key={opt} value={opt}>
          {opt}
        </StyledOption>
      ))}
    </StyledSelect>
  );
};
