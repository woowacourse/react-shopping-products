import { Badge, CartIcon, LogoIcon } from '../../assets';
import * as S from './Header.styled';

interface HeaderProps {
  badgeCount: number;
  onToggleDetailModal: () => void;
}

function Header({ badgeCount, onToggleDetailModal }: HeaderProps) {
  return (
    <S.HeaderContainer>
      <S.LogoIcon src={LogoIcon} alt="로고" />
      <S.CartIconContainer onClick={onToggleDetailModal}>
        <S.CartIcon src={CartIcon} alt="쇼핑 카트" />
        <S.BadgeIconContainer>
          <S.BadgeIcon src={Badge} alt="쇼핑 카트 수량" />
          <S.BadgeIconCount>{badgeCount}</S.BadgeIconCount>
        </S.BadgeIconContainer>
      </S.CartIconContainer>
    </S.HeaderContainer>
  );
}

export default Header;
