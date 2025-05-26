import ErrorToast from '../../../shared/ui/ErrorToast';
import * as S from './Navbar.styles';
import {useErrorToast} from '../../../shared/provider/errorProvider';
import {useState} from 'react';
import Modal from '../../../shared/ui/Modal';
import CartCard from '../../../features/products/ui/CartCard';
import {useApi} from '../../../features/products/provider/apiProvider';
import {getCartProduct} from '../../../features/cart/api/getCartProduct';
import CustomButton from '../../../shared/ui/CustomButton';
import {css} from '@emotion/react';
import {formatPrice} from '../../../shared/utils/formatPrice';

interface NavbarProps {
  cartQuantity: number;
}

export default function Navbar({cartQuantity}: NavbarProps) {
  const error = useErrorToast();
  const [isOpen, setIsOpen] = useState(false);

  const {data: cartItems} = useApi(getCartProduct, 'cartItems');
  const totalPrice =
    cartItems?.content.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ) || 0;

  return (
    <S.NavbarWrapper>
      <S.NavbarContainer>
        <S.Logo>SHOP</S.Logo>
        <S.CartIconContainer onClick={() => setIsOpen(true)}>
          <S.CartQuantity data-testid="cart-quantity">
            {cartQuantity}
          </S.CartQuantity>
          <S.CartIcon src="./cartIcon.svg" />
        </S.CartIconContainer>
      </S.NavbarContainer>
      {error && <ErrorToast errorMessage={error} />}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="bottom"
        title={{text: '장바구니', size: 20}}
      >
        {cartItems?.content.map((item) => (
          <CartCard
            key={item.id}
            cartId={item.id}
            product={item.product}
            quantity={item.quantity}
          />
        ))}
        <S.TotalPriceSection>
          <S.Description>총 결제 금액</S.Description>
          <S.TotalPrice>{formatPrice(totalPrice)}원</S.TotalPrice>
        </S.TotalPriceSection>
        <CustomButton
          title="닫기"
          onClick={() => setIsOpen(false)}
          css={css`
            padding: 10px;
          `}
        />
      </Modal>
    </S.NavbarWrapper>
  );
}
