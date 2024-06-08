import { Modal } from 'brgndyy-react-modal';
import CartModalContent from './CartModalContent';
import styles from './cartModal.module.css';

type Props = {
  modalOpen: boolean;
  handleModalClose: () => void;
};

export default function CartModal({ modalOpen, handleModalClose }: Props) {
  return (
    <Modal
      isOpen={modalOpen}
      onClose={handleModalClose}
      position="bottom"
      mountAnimation={styles.modal_enter}
      unMountAnimation={styles.modal_exit}
      animationTime={300}
    >
      <Modal.Portal id="modal">
        <Modal.Backdrop zIndex={1000} opacity={'rgba(0, 0, 0, 0.35)'}>
          <Modal.Container>
            <CartModalContent handleModalClose={handleModalClose} />
          </Modal.Container>
        </Modal.Backdrop>
      </Modal.Portal>
    </Modal>
  );
}
