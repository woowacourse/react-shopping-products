import styled, { css } from "styled-components";

// 각 스타일을 별도의 styled-component로 정의
const WhiteButton = css`
  background-color: white;
  color: black;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const BlackButton = css`
  background-color: black;
  color: white;
`;

export const Wrapper = styled.button<{ theme: "black" | "white" }>`
  display: flex;
  border-radius: 5px;
  border: none;
  justify-content: center;
  align-items: center;
  ${({ theme }) => (theme === "black" ? BlackButton : WhiteButton)}
`;
