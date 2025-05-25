import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const soldOutText = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const buttonWrapper = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;
