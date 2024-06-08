import { Modal } from 'chico-custom-modal';
import { CartItemModalProps } from './CartItemModal.type';
import { useCart } from '../../context/CartContext';
import CartItemList from '../CartItemList/CartItemList';
import { BUTTON_MESSAGE } from '../../constants/button';
import CartTotalAmount from '../CartTotalAmount/CartTotalAmount';
import { CartItems } from '../../type/CartItem';

const CartItemModal = ({ setIsOpenModal }: CartItemModalProps) => {
  const { cartItem } = useCart();

  const handleClose = () => {
    setIsOpenModal(false);
  };
  const handleConfirm = () => {
    setIsOpenModal(false);
  };
  const calculateTotalAmount = (cartItem: CartItems[]) => {
    return cartItem.reduce(
      (prevTotalAmount: number, currentItem: CartItems) => {
        return (
          prevTotalAmount + currentItem.quantity * currentItem.product.price
        );
      },
      0,
    );
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
          <CartTotalAmount
            totalCartItemAmount={calculateTotalAmount(cartItem)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button
            disabled={cartItem.length === 0}
            onClick={handleConfirm}
            width="stretch"
          >
            {BUTTON_MESSAGE.CLOSE}
          </Modal.Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartItemModal;
