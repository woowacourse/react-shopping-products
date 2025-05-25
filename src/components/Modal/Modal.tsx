import ItemModalCard from '../ItemModalCard/ItemModalCard';
import S from './Modal.module.css';

interface ModalProps {
  handleClose: () => void;
}

const Modal = ({ handleClose }: ModalProps) => {
  return (
    <div className={S.container}>
      <div data-testid="modal-overlay" className={S.overlay} onClick={handleClose} />
      <div className={S.content}>
        <p className={S.title}>장바구니</p>
        <div className={S.cartItemContainer}>
          <ItemModalCard />
          <ItemModalCard />
        </div>
        <div className={S.totalPriceContainer}>
          <p>총 결제 금액</p>
          <p className={S.price}>95,000원</p>
        </div>
        <button className={S.closeButton} onClick={handleClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
