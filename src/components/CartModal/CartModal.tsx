import { Modal } from "pongju-modal-component";
import CartModalItem from "./CartModalItem";
import CartTotalPrice from "./CartTotalPrice";

interface CartModalProps {
  isOpen: boolean;
  onModalClose: () => void;
}

const CartModal = ({ isOpen, onModalClose }: CartModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onModalClose} position="bottom">
      <Modal.Backdrop>
        <Modal.Frame styled={{ width: "429px" }} autoModalFocus={false}>
          <Modal.Title title={"장바구니"} />
          <Modal.Body>
            <CartModalItem
              name="테스트"
              imgUrl={"./sample.png"}
              quantity={1}
              price={5000}
            />
            <CartTotalPrice totalPrice={5000} />
          </Modal.Body>
          <Modal.Button
            title={"닫기"}
            onClick={onModalClose}
            size="large"
            styled={{ height: "44px" }}
          />
        </Modal.Frame>
      </Modal.Backdrop>
    </Modal>
  );
};

export default CartModal;
