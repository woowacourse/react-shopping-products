import { PropsWithChildren } from "react";
import { StyledDiv, StyledSpan } from "../../styles/Common/ErrorBox.styles";

type ErrorBoxProps = PropsWithChildren<object>;

export default function ErrorBox({ children }: ErrorBoxProps) {
  return (
    <StyledDiv>
      <StyledSpan>{children}</StyledSpan>
    </StyledDiv>
  );
}
