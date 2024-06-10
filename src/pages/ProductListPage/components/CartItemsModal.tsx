import { Modal } from '@roqkftjs/react-payments-module';
import { CartItemCardList } from './CartItemCardList';
import { CartItemType } from '../../../types';
import { CartItemsTotalSummary } from './CartItemsTotalSummary';

export interface CartItemsModal {
  isOpen: boolean;
  cartItemsModalClose: () => void;
  cartItems: CartItemType[];
}

export const CartItemsModal: React.FC<CartItemsModal> = ({
  isOpen,
  cartItemsModalClose,
  cartItems,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      position="bottom"
      onClose={cartItemsModalClose}
      style={{ width: 429, height: 444 }}
    >
      <Modal.Header>
        <Modal.Title>장바구니</Modal.Title>
      </Modal.Header>
      <Modal.Content style={{ overflowY: 'scroll' }}>
        <CartItemCardList cartItems={cartItems} />
        <CartItemsTotalSummary cartItems={cartItems} />
      </Modal.Content>
      <Modal.Footer>
        <Modal.TextButton style={{ fontWeight: 700 }} onClick={() => cartItemsModalClose()}>
          닫기
        </Modal.TextButton>
      </Modal.Footer>
    </Modal>
  );
};
