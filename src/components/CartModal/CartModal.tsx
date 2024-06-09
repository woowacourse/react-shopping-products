import { Modal } from 'woowacourse-react-modal-component';

import { CartModalDetail, TotalAmount } from '../index';
import { Carts } from '../../types/fetch';

import * as S from './CartModal.styled';

interface CartModalProps {
  cartItems: Carts[];
  isDetailModalOpen: boolean;
  toggleDetailModal: () => void;
}

function CartModal({
  cartItems,
  isDetailModalOpen,
  toggleDetailModal,
}: CartModalProps) {
  return (
    <Modal
      toggleModal={toggleDetailModal}
      isOpen={isDetailModalOpen}
      position="bottom"
      size="small"
    >
      <Modal.Header
        title="장바구니"
        closeOption="button"
        handleCloseButton={toggleDetailModal}
      />
      <CartModalDetail cartItems={cartItems} />
      <TotalAmount cartItems={cartItems} />
      <S.CartModalButton onClick={toggleDetailModal}>닫기</S.CartModalButton>
    </Modal>
  );
}

export default CartModal;
