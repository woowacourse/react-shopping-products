import styled from '@emotion/styled';

export const FallbackImageContainer = styled.div`
  background-color: #ededed;
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) =>
    `${theme.borderRadius.medium} ${theme.borderRadius.medium} 0 0`};
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 40px;
  }
`;
