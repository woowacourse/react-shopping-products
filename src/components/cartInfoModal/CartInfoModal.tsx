import { Modal } from 'hash-modal';
import CartItemList from './CartItemList';

interface CartModalInfo {
  closeModal: () => void;
}
const CartModalInfo = ({ closeModal }: CartModalInfo) => {
  return (
    <>
      <Modal setModalClose={closeModal} position="bottom">
        <Modal.Header title="장바구니" setModalClose={closeModal} />
        <Modal.Content>
          <CartItemList />
        </Modal.Content>
        <Modal.Button onClick={closeModal} content="닫기" buttonSize="MAX" />
      </Modal>
    </>
  );
};

export default CartModalInfo;
