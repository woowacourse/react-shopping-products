import { PositionType, TextType } from "@/components/_common/TextBox";
import styled from "styled-components";

export const CaptionText = styled.span<{ disabled: boolean; type: TextType; position: PositionType }>`
  display: flex;
  align-items: center;
  gap: 5px;
  ${({ theme, type }) => theme.TEXT[type]};
  color: ${({ theme, disabled }) => disabled && theme.COLOR["grey-2"]};
  white-space: pre-line;
  justify-content: ${({ position }) => position === "center" && "center"};
  line-height: 1.5;
  text-align: center;
`;
