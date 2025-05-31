import { useMemo } from 'react';
import {
  CART_MODAL_CLOSE_BUTTON_TEXT,
  CART_MODAL_TITLE,
  TOTAL_PRICE_TEXT,
} from '../../../constants/shopInfoConfig';
import {
  Button,
  ModalAction,
  ModalHeader,
  ModalTitle,
  PriceContainer,
  ProductContainer,
  TotalPrice,
  TotalPriceText,
} from './CartModal.styles';
import CartItemRow from '../CartItemRow/CartItemRow';
import { useAPI } from '../../../hooks/useAPI';
import { CartItem } from '../../../types/type';
import { fetchCartItem } from '../../../utils/getCartItem';

interface CartModalProps {
  onClose: () => void;
}

function CartModal({ onClose }: CartModalProps) {
  const { data: cartList } = useAPI<CartItem[]>({
    fetcher: fetchCartItem,
    name: 'cartItems',
  });

  const totalPrice = useMemo(() => {
    return cartList?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [cartList]);

  return (
    <>
      <ModalHeader>
        <ModalTitle>{CART_MODAL_TITLE}</ModalTitle>
      </ModalHeader>
      <ProductContainer>
        {cartList?.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </ProductContainer>
      <PriceContainer>
        <TotalPriceText>{TOTAL_PRICE_TEXT}</TotalPriceText>
        <TotalPrice>{totalPrice?.toLocaleString()}원</TotalPrice>
      </PriceContainer>
      <ModalAction>
        <Button onClick={onClose}>{CART_MODAL_CLOSE_BUTTON_TEXT}</Button>
      </ModalAction>
    </>
  );
}

export default CartModal;
