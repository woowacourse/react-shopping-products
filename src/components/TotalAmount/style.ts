import styled from "styled-components";

export const Wrapper = styled.div`
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Text = styled.p`
  ${({ theme }) => theme.TEXT.small};
`;

export const AmountPrice = styled.p`
  ${({ theme }) => theme.TEXT.xLarge};
`;
