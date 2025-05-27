import ErrorToast from '../../../shared/ui/ErrorToast';
import * as S from './Navbar.styles';
import {useErrorToast} from '../../../shared/provider/errorProvider';
import {useState} from 'react';
import CartModal from '../../../features/cart/ui/CartModal';

interface NavbarProps {
  cartQuantity: number;
}

export default function Navbar({cartQuantity}: NavbarProps) {
  const error = useErrorToast();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.NavbarWrapper>
      <S.NavbarContainer>
        <S.Logo>SHOP</S.Logo>
        <S.CartIconContainer onClick={() => setIsOpen(true)}>
          <S.CartQuantity data-testid="cart-quantity">
            {cartQuantity}
          </S.CartQuantity>
          <S.CartIcon src="./cartIcon.svg" alt="icon" />
        </S.CartIconContainer>
      </S.NavbarContainer>
      {error && <ErrorToast errorMessage={error} />}
      <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </S.NavbarWrapper>
  );
}
