import { useCartItems } from "../../entities/cartItem/useCartItems";
import useModal from "../../shared/hooks/useModal";
import CartItem from "./CartItem/CartItem";
import * as S from "./CartModal.styles";

const CartModal = () => {
  const { closeModal } = useModal();
  const { cartItems, totalPriceInCart } = useCartItems();

  return (
    <S.CartModal>
      <S.Title>장바구니</S.Title>
      <S.ScrollContainer>
        {cartItems?.content.map((productInfo) => {
          return <CartItem key={productInfo.id} {...productInfo} />;
        })}
      </S.ScrollContainer>
      <S.TotalPriceContainer>
        <S.TotalPriceLabel>총 결제 금액</S.TotalPriceLabel>
        <S.TotalPriceValue>
          {totalPriceInCart.toLocaleString()}원
        </S.TotalPriceValue>
      </S.TotalPriceContainer>
      <S.CloseButton onClick={closeModal}>닫기</S.CloseButton>
    </S.CartModal>
  );
};

export default CartModal;
