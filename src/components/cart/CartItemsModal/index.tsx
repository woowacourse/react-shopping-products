import { Modal, useModalAction } from "easy-payments-ui";
import CartItem from "../CartItem";

import S from "./styledComponent";
import useCartItemQuantity from "../../../hooks/useCartItemQuantity";
import LoadingDots from "../../common/LoadingDots";

const CartItemsModal = () => {
  const { cartItems, isLoading } = useCartItemQuantity();
  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const { handleClose } = useModalAction();

  return (
    <Modal title="장바구니" position="bottom" theme="light" confirmMessage="닫기" onConfirm={handleClose}>
      <S.Container>
        {isLoading ? (
          <LoadingDots />
        ) : (
          <S.CartItemsContainer>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </S.CartItemsContainer>
        )}
        <S.Total>
          <S.TotalLabel>총 결제 금액</S.TotalLabel>
          <S.TotalPrice>{total.toLocaleString()}원</S.TotalPrice>
        </S.Total>
      </S.Container>
    </Modal>
  );
};

export default CartItemsModal;
