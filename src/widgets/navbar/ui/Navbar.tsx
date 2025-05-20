import ErrorToast from '../../../shared/ui/ErrorToast';
import * as S from './Navbar.styles';
import {useErrorToast} from '../../../shared/provider/errorProvider';

interface NavbarProps {
  cartQuantity: number;
}

export default function Navbar({cartQuantity}: NavbarProps) {
  const error = useErrorToast();
  return (
    <S.NavbarWrapper>
      <S.NavbarContainer>
        <S.Logo>SHOP</S.Logo>
        <S.CartIconContainer>
          <S.CartQuantity>{cartQuantity}</S.CartQuantity>
          <S.CartIcon src="./cartIcon.svg" />
        </S.CartIconContainer>
      </S.NavbarContainer>
      {error && <ErrorToast errorMessage={error} />}
    </S.NavbarWrapper>
  );
}
