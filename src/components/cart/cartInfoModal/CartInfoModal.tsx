import { Modal } from 'hash-modal';
import React from 'react';

interface CartModalInfo {
  closeModal: () => void;
  children: React.ReactNode;
}
const CartModalInfo = ({ closeModal, children }: CartModalInfo) => {
  return (
    <>
      <Modal setModalClose={closeModal} position="bottom">
        <Modal.Header title="장바구니" setModalClose={closeModal} />
        <Modal.Content>{children}</Modal.Content>
        <Modal.Button onClick={closeModal} content="닫기" buttonSize="MAX" />
      </Modal>
    </>
  );
};

export default CartModalInfo;
