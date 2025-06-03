import { CartResponse } from '../../../types/product';
import { CartCloseButton, Title, TotalContainer, TotalPrice } from './Cart.styles';

interface CartProps {
  cart: CartResponse;
  onClose?: () => void;
}

function CartTotal({ cart, onClose }: CartProps) {
  if (!cart || !cart.content) {
    return null;
  }

  const totalPrice = cart.content.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <>
      <TotalContainer>
        <Title>총 결제 금액</Title>
        <TotalPrice>{totalPrice.toLocaleString()}원</TotalPrice>
      </TotalContainer>
      <CartCloseButton onClick={onClose}>닫기</CartCloseButton>
    </>
  );
}

export default CartTotal;
