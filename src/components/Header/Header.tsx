import React from 'react';
import { CartIcon, LogoIcon } from '../../assets';
import * as S from './Header.styled';

interface HeaderProps {
  badgeCount: number;
}

function Header({ badgeCount }: HeaderProps) {
  return (
    <S.HeaderContainer>
      <S.LogoIcon src={LogoIcon} />
      <S.CartIcon src={CartIcon} />
      {badgeCount}
    </S.HeaderContainer>
  );
}

export default Header;
