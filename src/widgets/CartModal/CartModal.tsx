import { useCart } from "../../features/cart/hooks/useCart";
import useModal from "../../shared/hooks/useModal";
import CartItem from "./CartItem/CartItem";
import * as S from "./CartModal.styles";

const CartModal = () => {
  const { closeModal } = useModal();
  const { cart } = useCart();

  return (
    <S.CartModal>
      <S.Title>장바구니</S.Title>
      <S.ScrollContainer>
        {cart.items?.map((productInfo) => {
          return <CartItem key={productInfo.id} {...productInfo} />;
        })}
      </S.ScrollContainer>
      <S.TotalPriceContainer>
        <S.TotalPriceLabel>총 결제 금액</S.TotalPriceLabel>
        <S.TotalPriceValue>
          {cart.totalPrice.toLocaleString()}원
        </S.TotalPriceValue>
      </S.TotalPriceContainer>
      <S.CloseButton onClick={closeModal}>닫기</S.CloseButton>
    </S.CartModal>
  );
};

export default CartModal;
