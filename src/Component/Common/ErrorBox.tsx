import { PropsWithChildren } from "react";
import styled from "@emotion/styled";

type ErrorBoxProps = PropsWithChildren<object>;

export default function ErrorBox({ children }: ErrorBoxProps) {
  return (
    <StyledDiv>
      <StyledSpan>{children}</StyledSpan>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #ffc9c9;
`;

const StyledSpan = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: #0a0d13;
`;
