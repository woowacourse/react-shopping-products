import Styled from "@emotion/styled";

export const ErrorBoxContainer = Styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  font-size: 12px;
  display: flex;
  justify-content: center;
  padding: 12px 0;
  position: absolute;
  top: 64px;
  z-index: 999;
  width: 100%;
`;


