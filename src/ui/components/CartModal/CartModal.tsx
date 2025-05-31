import { SHOP_INFO } from '../../../constants/shopInfoConfig';
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
import { API_CONFIG } from '../../../constants/APIConfig';

interface CartModalProps {
  onClose: () => void;
}

function CartModal({ onClose }: CartModalProps) {
  const { data: cartList } = useAPI<CartItem[]>({
    fetcher: fetchCartItem,
    name: API_CONFIG.CART_NAME,
  });

  const totalPrice = cartList?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <ModalHeader>
        <ModalTitle>{SHOP_INFO.CART_MODAL_TITLE}</ModalTitle>
      </ModalHeader>
      <ProductContainer>
        {cartList?.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </ProductContainer>
      <PriceContainer>
        <TotalPriceText>{SHOP_INFO.TOTAL_PRICE_TEXT}</TotalPriceText>
        <TotalPrice>{totalPrice?.toLocaleString()}원</TotalPrice>
      </PriceContainer>
      <ModalAction>
        <Button onClick={onClose}>
          {SHOP_INFO.CART_MODAL_CLOSE_BUTTON_TEXT}
        </Button>
      </ModalAction>
    </>
  );
}

export default CartModal;
