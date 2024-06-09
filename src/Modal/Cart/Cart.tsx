import { Modal } from "paran-simple-modal";
import * as S from "./Cart.style";
import CartItemList from "../../components/CartItemList/CartItemList";

interface CartProps {
  setIsCartModalOpen: (isCartModalOpen: boolean) => void;
}

function Cart({ setIsCartModalOpen }: CartProps) {
  return (
    <S.Container>
      <Modal
        position="bottom"
        onBackdropClick={() => setIsCartModalOpen(false)}
        style={{ maxHeight: "90vh" }}
      >
        <Modal.Title title="장바구니" />
        <CartItemList style={{ overflowY: "auto" }} />
        <Modal.ConfirmButton
          content="닫기"
          onClick={() => setIsCartModalOpen(false)}
          style={{ position: "absolute", margin: "12px", height: "44px" }}
        />
      </Modal>
    </S.Container>
  );
}

export default Cart;
