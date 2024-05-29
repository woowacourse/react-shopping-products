import React from 'react';
import { LogoIcon } from '../../assets';
import * as S from './Header.styled';

function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderIcon src={LogoIcon} />
    </S.HeaderContainer>
  );
}

export default Header;
