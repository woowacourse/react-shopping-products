import { Modal, useModalAction } from "easy-payments-ui";
import CartItem from "../CartItem";

import S from "./styledComponent";

const CartItemsModal = () => {
  const items = [
    { id: 1, name: "상품 이름", price: 35000, quantity: 2 },
    { id: 2, name: "상품 이름", price: 25000, quantity: 1 },
  ];

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const { handleClose } = useModalAction();

  return (
    <Modal title="장바구니" position="bottom" theme="light" confirmMessage="닫기" onConfirm={handleClose}>
      <S.Container>
        {items.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
        <S.Total>
          <S.TotalLabel>총 결제 금액</S.TotalLabel>
          <S.TotalPrice>{total.toLocaleString()}원</S.TotalPrice>
        </S.Total>
      </S.Container>
    </Modal>
  );
};

export default CartItemsModal;
