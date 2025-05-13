import styled from '@emotion/styled';
import { ReactNode } from 'react';
import Flex from './Flex';

interface HeaderProps {
  title: string;
  right?: ReactNode;
}
function Header({ title, right }: HeaderProps) {
  return (
    <HeaderContainer>
      <Logo>{title}</Logo>
      <div style={{ width: '48px' }}>
        <Flex gap="xs">{right}</Flex>
      </div>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: black;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: white;
`;

export default Header;
