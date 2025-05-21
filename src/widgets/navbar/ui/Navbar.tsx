import ErrorToast from '../../../shared/ui/ErrorToast';
import * as S from './Navbar.styles';
import {useErrorToast} from '../../../shared/provider/errorProvider';
import {useState} from 'react';
import Modal from '../../../shared/ui/Modal';

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
          <S.CartQuantity>{cartQuantity}</S.CartQuantity>
          <S.CartIcon src="./cartIcon.svg" />
        </S.CartIconContainer>
      </S.NavbarContainer>
      {error && <ErrorToast errorMessage={error} />}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="bottom"
        title={{text: '장바구니', size: 20}}
      />
    </S.NavbarWrapper>
  );
}
