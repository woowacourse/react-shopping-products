import { useContext } from 'react';

import { Modal } from 'simodal';
import ShoppingCartItems from '../ShoppingCartItems';
import { UseCartItemsContext } from '../../App';
import ShoppingCartItem from '../ShoppingCartItem';
import TotalPaymentAmount from '../TotalPaymentAmount';

interface CartModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const CartModal = ({ isModalOpen, closeModal }: CartModalProps) => {
  const { getCartItems } = useContext(UseCartItemsContext);

  return (
    <Modal isOpen={isModalOpen}>
      <>
        <Modal.BackDrop onClose={closeModal} />
        <Modal.Container size="small" position="bottom">
          <>
            <Modal.Header>
              <Modal.Title text="장바구니" />
            </Modal.Header>
            <ShoppingCartItems>
              {getCartItems.data &&
                getCartItems.data.map((cartItem) => (
                  <ShoppingCartItem key={cartItem.id} cartItem={cartItem} />
                ))}
            </ShoppingCartItems>
            <TotalPaymentAmount />
            <Modal.ButtonContainer direction="row" position="center">
              <Modal.Button color="dark" size="large" onClick={closeModal}>
                <span>닫기</span>
              </Modal.Button>
            </Modal.ButtonContainer>
          </>
        </Modal.Container>
      </>
    </Modal>
  );
};

export default CartModal;
