import {useEffect, useState} from 'react';
import ErrorToast from '../../../shared/ui/ErrorToast';
import * as S from './Navbar.styles';

interface NavbarProps {
  cartQuantity: number;
  errorMessage: string;
}

export default function Navbar({cartQuantity, errorMessage}: NavbarProps) {
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

  return (
    <S.NavbarWrapper>
      <S.NavbarContainer>
        <S.Logo>SHOP</S.Logo>
        <S.CartIconContainer>
          <S.CartQuantity>{cartQuantity}</S.CartQuantity>
          <S.CartIcon src="./cartIcon.svg" />
        </S.CartIconContainer>
      </S.NavbarContainer>
      {visibleError && <ErrorToast errorMessage={visibleError} />}
    </S.NavbarWrapper>
  );
}
