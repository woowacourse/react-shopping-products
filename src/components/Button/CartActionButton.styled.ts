import styled from "styled-components";
import { CartActionButtonType } from "./CartActionButton";

export const StyledContainer = styled.div<CartActionButtonType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 59px;
  height: 24px;
  border-radius: 4px;

  background-color: ${(props) =>
    props.actionType === "add" ? "rgba(0, 0, 0, 1)" : "rgba(234, 234, 234, 1)"};

  position: absolute;
  bottom: 0;
  right: 0;
`;

export const StyledActionImg = styled.img`
  width: 15px;
  height: 15px;
  padding: auto;
  margin-right: 4px;
`;

export const StyledActionTitle = styled.span<CartActionButtonType>`
  font-size: 12px;
  font-weight: 600;

  color: ${(props) => (props.actionType === "add" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)")};
`;
