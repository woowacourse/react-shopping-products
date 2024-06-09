import "soosoo-react-modal-component/dist/style.css";
import { Modal } from "soosoo-react-modal-component";

import { CartContainer, CartList } from "./CartModal.styled";
import { CartItem } from "./CartItem";
import { CartTotalPrice } from "./CartTotalPrice";
import useCartItems from "../../hooks/useCartItems";

interface CartModalProps {
  isOpen: boolean;
  handleModalOpen: () => void;
}

export const CartModal = ({ isOpen, handleModalOpen }: CartModalProps) => {
  const { cartItems } = useCartItems();

  const modalFooterButtons = [
    {
      content: `닫기`,
      onClick: handleModalOpen,
      className: "confirmButton",
    },
  ];

  return (
    <Modal
      position="bottom"
      size="small"
      title={{ position: "left", content: "장바구니" }}
      isOpen={isOpen}
      onClose={handleModalOpen}
      closeButton={{ onClose: handleModalOpen }}
      footerButtons={modalFooterButtons}
    >
      <CartContainer>
        <CartList>
          {cartItems.map((cartItem: Cart) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
          <CartTotalPrice cartItems={cartItems} />
        </CartList>
      </CartContainer>
    </Modal>
  );
};
