import styled, { css } from 'styled-components';

const WhiteButton = css`
  background-color: white;
  color: black;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const BlackButton = css`
  background-color: black;
  color: white;
`;

export const Wrapper = styled.button<{ theme: 'black' | 'white'; }>`
  display: flex;
  border-radius: 5px;
  border: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${({ theme }) => (theme === 'black' ? BlackButton : WhiteButton)}
`;
