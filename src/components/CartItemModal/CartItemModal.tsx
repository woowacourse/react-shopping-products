import { Modal } from 'chico-custom-modal';
import { CartItemModalProps } from './CartItemModal.type';
import { useCart } from '../../context/CartContext';
import CartItemList from '../CartItemList/CartItemList';

const CartItemModal = ({ setIsOpenModal }: CartItemModalProps) => {
  const { cartItem } = useCart();

  const handleClose = () => {
    setIsOpenModal(false);
  };
  const handleConfirm = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <Modal position="bottom" size="large" onDimmedClick={handleClose}>
        <Modal.Header>
          <Modal.Title title="장바구니" />
          <Modal.XButton onClick={handleClose}></Modal.XButton>
        </Modal.Header>
        <Modal.Body>
          <CartItemList items={cartItem} />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button
            disabled={cartItem.length === 0}
            onClick={handleConfirm}
            width="stretch"
          >
            닫기
          </Modal.Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartItemModal;
