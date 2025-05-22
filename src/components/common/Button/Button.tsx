import { ButtonProps } from "./Button.types";

import StyledButton from "./Button.styled";

function Button({ children, ...rest }: ButtonProps) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default Button;
