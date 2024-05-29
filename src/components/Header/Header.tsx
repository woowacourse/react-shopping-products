import React from 'react';
import { CartIcon, LogoIcon } from '../../assets';
import * as S from './Header.styled';

function Header() {
  return (
    <S.HeaderContainer>
      <S.LogoIcon src={LogoIcon} />
      <S.CartIcon src={CartIcon} />
    </S.HeaderContainer>
  );
}

export default Header;
