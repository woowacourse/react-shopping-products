import { useEffect, useState } from 'react';
import ErrorToast from '../../../shared/ui/ErrorToast';
import * as S from './Navbar.styles';

interface NavbarProps {
  cartTypeQuantity: number;
  errorMessage: string;
}

export default function Navbar({ cartTypeQuantity, errorMessage }: NavbarProps) {
  const [visibleError, setVisibleError] = useState(errorMessage);

  useEffect(() => {
    if (errorMessage) {
      setVisibleError(errorMessage);
      const timer = setTimeout(() => {
        setVisibleError('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleLogoClick = () => {};

  return (
    <S.NavbarWrapper>
      <S.NavbarContainer>
        <S.Logo onClick={handleLogoClick}>SHOP</S.Logo>
        <S.CartIconContainer>
          <S.CartQuantity>{cartTypeQuantity}</S.CartQuantity>
          <S.CartIcon src='./cartIcon.svg' alt='cart icon' />
        </S.CartIconContainer>
      </S.NavbarContainer>
      {visibleError && <ErrorToast errorMessage={visibleError} />}
    </S.NavbarWrapper>
  );
}
