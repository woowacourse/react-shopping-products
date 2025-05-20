import { ComponentProps, PropsWithChildren } from 'react';
import styled from '@emotion/styled';

export default function Body({
  children,
  ...props
}: PropsWithChildren<ComponentProps<'body'>>) {
  return <StyledBody {...props}>{children}</StyledBody>;
}

const StyledBody = styled.body`
  padding: 36px 24px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: calc(100vh - 64px);
  box-sizing: border-box;
  overflow-y: auto;
`;
