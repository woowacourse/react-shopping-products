import { Modal } from "pongju-modal-component";
import CartModalItem from "./CartModalItem";
import CartTotalPrice from "./CartTotalPrice";
import { CartItem } from "../../types/product.type";

interface CartModalProps {
  isOpen: boolean;
  onModalClose: () => void;
  cartItems: CartItem[];
}

const CartModal = ({ isOpen, onModalClose, cartItems }: CartModalProps) => {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <Modal isOpen={isOpen} onClose={onModalClose} position="bottom">
      <Modal.Backdrop>
        <Modal.Frame styled={{ width: "429px" }} autoModalFocus={false}>
          <Modal.Title title={"장바구니"} />
          <Modal.Body>
            {cartItems.map((item) => (
              <CartModalItem
                cartItemId={item.id}
                key={item.product.id}
                name={item.product.name}
                imgUrl={item.product.imageUrl}
                quantity={item.quantity}
                price={item.product.price}
              />
            ))}
            <CartTotalPrice totalPrice={totalPrice} />
          </Modal.Body>
          <Modal.Button
            title={"닫기"}
            onClick={onModalClose}
            size="large"
            styled={{ height: "80px" }}
          />
        </Modal.Frame>
      </Modal.Backdrop>
    </Modal>
  );
};

export default CartModal;
