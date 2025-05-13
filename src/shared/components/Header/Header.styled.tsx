import styled from '@emotion/styled';

import { HeaderProps } from '.';

export const StyledHeader = styled.header<Pick<HeaderProps, 'right'>>`
  position: absolute;
  top: 0;
  display: flex;
  min-height: 64px;
  width: 100%;
  padding: 16px;
  background-color: black;
  align-items: center;
  justify-content: ${({ right }) => (right ? 'space-between' : 'flex-start')};
`;
