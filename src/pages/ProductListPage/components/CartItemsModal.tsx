import { Modal } from '@roqkftjs/react-payments-module';

export interface CartItemsModal {
  isOpen: boolean;
  cartItemsModalClose: () => void;
}

export const CartItemsModal: React.FC<CartItemsModal> = ({ isOpen, cartItemsModalClose }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} position="bottom" onClose={cartItemsModalClose} style={{ width: 429 }}>
      <Modal.Header>
        <Modal.Title>장바구니</Modal.Title>
      </Modal.Header>
      <Modal.Content></Modal.Content>
      <Modal.Footer>
        <Modal.TextButton style={{ fontWeight: 700 }} onClick={() => cartItemsModalClose()}>
          닫기
        </Modal.TextButton>
      </Modal.Footer>
    </Modal>
  );
};
